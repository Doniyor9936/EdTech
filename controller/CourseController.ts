import { NextFunction, Request, Response } from "express";
import User from "../model/userModel";
import Payment from "../model/courseModel";
import { Op, where } from "sequelize";
import Course from "../model/courseModel";

export const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { userId, during, subject } = req.body
        const findUser = await User.findByPk(userId)
        if (!findUser) {
            return res.status(404).json({ message: "user not found" })
        }
        const course = await Course.create({ userId, during, subject })
        const user = await User.findByPk(userId)
        return res.status(200).json({ message: `The id:${userId} user has been registred for the a : ${subject} course`, course, user })

    } catch (error) {
        console.error("Error fetching user courses:", error);
        return res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
}


export const oneCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({ message: "id not found" })
        }
        const oneCourse = await Course.findByPk(id)
        if (!oneCourse) {
            return res.status(404).json({ message: "course not found" })
        }
        return res.status(200).json({ message: "oneCourse", oneCourse })
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
}
export const userCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const { userId } = req.params
        if (!userId) {
            return res.status(404).json({ message: "id not found" })
        }
        const userCourse = await Course.findAll({ where: { userId } })
        if (!userCourse) {
            return res.status(404).json({ message: `${userId} by user not found` })
        }
        return res.status(200).json({ message: userCourse, })
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
}
export const getAllCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const findCourse = await Course.findAll()
        if (!findCourse) {
            return res.status(404).json({ message: "course not found" })
        }
        return res.status(200).json({ message: findCourse })
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
}
export const updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({ message: "id not found" })
        }
        const { userId, during, subject } = req.body
        const findUser = await Course.findByPk(id)
        if (!findUser) {
            return res.status(404).json({ message: "course not found" })
        }
        const updateCourse = await Course.update({ userId, during, subject }, { where: { id } })
        return res.status(200).json({ message: "update succes", updateCourse })
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
}

export const deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({ message: "id is requered!" })
        }
        const findCourse = await Course.findByPk(id)
        if (!findCourse) {
            return res.status(404).json({ message: "course not found" })
        }
        await Course.destroy({ where: { id } })
        return res.status(200).json({ message: "delete succesfully" })
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
}