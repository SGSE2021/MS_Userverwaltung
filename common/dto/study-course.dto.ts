import {DepartmentDTO} from "../../common/dto/department.dto"
export interface StudyCourseDTO {
    id:number,
    name:string,
    degree:String
    department:DepartmentDTO
}