import express from "express";
import ctrl from "../../controllers/contacts.js";
import {validateBody} from "../../middlewares/validateBody.js";
import { validateField } from "../../middlewares/validateField.js";
import { isValidId } from "../../middlewares/isValidId.js";
import { schemas } from "../../models/contact.js";

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post(
	"/",
	validateField,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
	"/:id",
	isValidId,
	validateField,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
	"/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

export default router;