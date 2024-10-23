import { Router } from "express";
import * as A from "./controller/auth.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import validation from "../../middleware/validation.js";
import userValidationSchema from "./auth.validation.js";

const authRouter = Router()

authRouter.
post('/signUp',checkEmail,validation(userValidationSchema),A.signUp)
.post('/signIn',A.signIn)
.patch('/',A.changeUserPassword)

export default authRouter