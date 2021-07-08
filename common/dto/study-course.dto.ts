import {DepartmentDTO} from "../../common/dto/department.dto"
export interface StudyCourseDTO {
    id:number
    name:string
    code:string
    degree:String
    department:DepartmentDTO
}