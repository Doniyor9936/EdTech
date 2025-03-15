import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connectDB";
import User from "./userModel";
class Course extends Model {
    public id!: number;
    public userId!: number;
    public courseName!: number;
    public object!: "matematika" | "fizika" | "ingliz tili"
}
Course.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        during: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject: {
            type: DataTypes.ENUM("matematika", "fizika", "ingliz tili"),
            allowNull: false,
            defaultValue: null
        },
    },
    {
        sequelize,
        tableName: "course",
        timestamps: true,
    },
)
Course.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Course, { foreignKey: "userId", as: "course" });

export default Course;
