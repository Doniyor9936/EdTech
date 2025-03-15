import { NextFunction, Request, Response } from "express";
import courseValidation from "../validation/courseValidation"

const courseMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { error } = await courseValidation.validate(req.body, { abortEarly: true })
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'validate error',
            errors: error.details.map((err: { message: any; }) => err.message),
        });
    }
    next()
}
export default courseMiddleware