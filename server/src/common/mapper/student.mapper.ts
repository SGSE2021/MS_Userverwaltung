import { Department, Student, StudyCourse } from "../../../../database/node_modules/@prisma/client";

export class StudentMapper {
    toDTO( item: ( Student & {
        course: ( StudyCourse & {
            department: Department;
        } ) | null;
    } ) | null ) {
        return {
            id: item?.id,
            active: item?.active,
            firstname: item?.firstname,
            lastname: item?.lastname,
            matriculationNumber: item?.matriculationNumber,
            course: item?.course,
            birthdate: item?.birthdate,
            gender: item?.gender,
            mail: item?.mail,
            title: item?.title,
            phone: item?.phone,
            semester: item?.semester
        }
    }
}