import { RequestHandler, Router } from "express";
import { createCourse, deleteCourse, getAllCourse, oneCourse, updateCourse, userCourse } from "../controller/CourseController";
import courseMiddleware from "../middleware/courseMiddleware";

export const courseRouter: Router = Router();

courseRouter.post("/addCourse", courseMiddleware as RequestHandler, createCourse as RequestHandler)
courseRouter.get("/getOneCourse/:id", oneCourse as RequestHandler)
courseRouter.get("/userCourse/:userId", userCourse as RequestHandler)
courseRouter.get("/courses", getAllCourse as RequestHandler)
courseRouter.put("/updateCourse/:id", courseMiddleware as RequestHandler, updateCourse as RequestHandler)
courseRouter.delete("/delete/:id", deleteCourse as RequestHandler)
