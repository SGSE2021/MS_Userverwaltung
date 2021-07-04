import { RoleDTO } from "./role.enum";

export interface UserInfoDTO{
    uid:string,
    firstname:string
    lastname:string
    role:RoleDTO
}