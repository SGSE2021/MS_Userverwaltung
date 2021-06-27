import { Department, Student, StudyCourse } from "@prisma/client";
import { StudentDTO } from "@common/dto/student.dto";

export class StudentMapper{

    toDTO(item: Student & {
        course: (StudyCourse & {
            department: Department;
        }) | null;
    }): StudentDTO | null {
        return {
                id:item.id,
                active:item.active,
                firstname:item.firstname,
                lastname:item.lastname,
                matriculationNumber:item.matriculationNumber,
                courseId:item.courseId,
                birthdate:item.birthdate,
                gender:item.gender,
                mail:item.mail,
                title:item.title,
                phone:item.phone,
                semester:item.semester
        }
    }

    toPreviewDTO(item: Student): StudentDTO | null {
        return {
                id:item.id,
                active:item.active,
                firstname:item.firstname,
                lastname:item.lastname,
                matriculationNumber:item.matriculationNumber,
                courseId:item.courseId,
                birthdate:item.birthdate,
                gender:item.gender,
                mail:item.mail,
                title:item.title,
                phone:item.phone,
                semester:item.semester
        }
    }



}