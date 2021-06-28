import { StudyCourseDTO } from "./study-course.dto";

export interface DepartmentPoolDTO{
    id:number,
    name:string,
    description:string | null,
    studyCourses: StudyCourseDTO[]
}