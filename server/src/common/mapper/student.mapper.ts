import { StudyCourseDTO } from "../../../../common/dto/study-course.dto";
import { Department, Student, StudyCourse } from "../../../../database/node_modules/@prisma/client";
import { StudentDTO } from "../../../../common/dto/student.dto";

export class StudentMapper{

    // toDTO2(item: Student & {
    //     course: (StudyCourse & {
    //         department: Department;
    //     }) | null;
    // }): StudentDTO | null {
    //     return {
    //             id:item.id,
    //             active:item.active,
    //             firstname:item.firstname,
    //             lastname:item.lastname,
    //             matriculationNumber:item.matriculationNumber,
    //             course:item.courseId,
    //             birthdate:item.birthdate,
    //             gender:item.gender,
    //             mail:item.mail,
    //             title:item.title,
    //             phone:item.phone,
    //             semester:item.semester
    //     }
    // }

    // toPreviewDTO(item: Student): StudentDTO | null {
    //     return {
    //             id:item.id,
    //             active:item.active,
    //             firstname:item.firstname,
    //             lastname:item.lastname,
    //             matriculationNumber:item.matriculationNumber,
    //             courseId:item.courseId,
    //             birthdate:item.birthdate,
    //             gender:item.gender,
    //             mail:item.mail,
    //             title:item.title,
    //             phone:item.phone,
    //             semester:item.semester
    //     }
    // }


    toDTO(item: (Student & {
        course: (StudyCourse & {
            department: Department;
        }) | null;
    }) | null) {
        return {
                id:item?.id,
                active:item?.active,
                firstname:item?.firstname,
                lastname:item?.lastname,
                matriculationNumber:item?.matriculationNumber,
                course:item?.course,
                birthdate:item?.birthdate,
                gender:item?.gender,
                mail:item?.mail,
                title:item?.title,
                phone:item?.phone,
                semester:item?.semester
        }
    }


    // private initCourse(course: (StudyCourse & {
    //     department: Department;
    // })):StudyCourseDTO{

    //     return {
    //         id:course.id,
    //         degree:course.degree,
    //         name:course.name,
    //         department:{
    //             description:course.department.description,
    //             id:course.department.id,
    //             name:course.department.name,
    //             studyCourses:[course]
    //         }
    //     }
    // }

}