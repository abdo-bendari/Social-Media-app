import joi from 'joi';

const userValidationSchema = joi.object({
  name: joi.string().min(2).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .min(8)
    .required(),
  profilePic: joi.string(),
  coverPic: joi.string(),
  from: joi.string(),
  relationship: joi.number().valid(1, 2, 3),
  role: joi.string().valid('user', 'admin').default('user'),
});

export default userValidationSchema;
