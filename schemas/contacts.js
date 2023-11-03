const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().error(new Error("missing required 🚹 field")),
  email: Joi.string().required().error(new Error("missing required 📧 field")),
  phone: Joi.string().required().error(new Error("missing required 📞 field")),
});

module.exports = { addSchema };
