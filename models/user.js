import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const subscrptionOptions = ['starter', 'pro', 'business'];
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    subscription: {
      type: String,
      enum: subscrptionOptions,
      default: 'starter',
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscrptionOptions)
    .required()
    .messages({ 'any.required': 'missing field subscription' }),
});

export const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

export const User = model('user', userSchema);
