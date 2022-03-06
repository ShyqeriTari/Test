import { body } from "express-validator";

export const proofValidation = [
    body("name").notEmpty().withMessage("Name is mandatory!")
]