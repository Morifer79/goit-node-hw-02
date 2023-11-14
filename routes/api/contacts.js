import express from 'express';
import ctrl from '../../controllers/contacts.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { validateField } from '../../middlewares/validateField.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { schemas } from '../../models/contact.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/', authenticate, ctrl.getContactsByFavorite);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post(
  '/',
  authenticate,
  validateField,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateField,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

export default router;
