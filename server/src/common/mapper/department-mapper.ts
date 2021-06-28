import { Department, StudyCourse} from "@prisma/client";
import { DepartmentDTO } from "../../../../common/dto/department.dto";
import { DepartmentPoolDTO } from "../../../../common/dto/department-pool.dto";
import prisma from "../../database";
export class DepartmentMapper{
    toDTO(item:(Department & {
        studyCourses: StudyCourse[];
    })): DepartmentDTO {
        return {
                id:item.id,
                description:item.description,
                name: item.name
        }
    }

    async toPoolDTO(item:(Department & {
        studyCourses: StudyCourse[];
    })): Promise<DepartmentPoolDTO> {
        return {
                id:item.id,
                description:item.description,
                name: item.name,
                studyCourses: await prisma.studyCourse.findMany({where:{departmentId:item.id},include:{department:true}})
        }
    }
}