import { DepartmentDTO } from "./department.dto";
import { Gender } from "./gender.enum";


export interface AddLecturerDTO {
    id: string;
    title: string;
    firstname: string;
    lastname: string;
    gender: Gender,
    birthdate: Date,
    mail: string,
    phone: string | null
    active: boolean;
    department: DepartmentDTO
}