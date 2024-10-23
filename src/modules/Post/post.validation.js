import Joi from "joi";

export const postValidationSchema = Joi.object({
  desc: Joi.string()
    .min(2)
    .max(10000)
    .required()
    .trim(),

  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) 
    .required(),

  media: Joi.array()
    .items(
      Joi.string().uri()
    )
    .optional(),

  likes: Joi.array()
    .items(
      Joi.string().pattern(/^[0-9a-fA-F]{24}$/) 
    )
    .optional(),
});

export default postValidationSchema;

