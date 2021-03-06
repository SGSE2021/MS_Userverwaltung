import {Gender} from "./gender.enum";
import {StudyCourseDTO} from "./study-course.dto"

export interface AddStudentDTO{ 
    id:string;
    title:string;
    firstname: string;
    lastname: string;
    gender:Gender,
    birthdate: Date,
    mail:string,
    phone:string|null
    active: boolean;
    matriculationNumber:string,
    semester:number
    course:StudyCourseDTO
}