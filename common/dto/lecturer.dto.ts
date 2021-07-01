import {DepartmentDTO} from "../../common/dto/department.dto"

export interface LecturerDTO{
    active:boolean
    birthdate:Date
    department: DepartmentDTO
    firstname:string
    gender:string
    id:string
    lastname:string
    mail:string
    phone:string
    title:string
}