import Joi from "joi";

export const commentValidationSchema = Joi.object({
  text: Joi.string()
    .min(1)
    .max(500)
    .required()
    .trim(),
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),

  post: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export default commentValidationSchema;
