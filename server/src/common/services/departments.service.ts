import { HttpException } from "../exceptionTypes/httpException";
import prisma from "../../database";
import { DepartmentMapper } from "../mapper/department-mapper";
import { DepartmentPoolDTO } from "../../../../common/dto/department-pool.dto";


export class DepartmentService {
    private departmentMapper = new DepartmentMapper();

    public async getAllDepartments() {
        const foundItems = await prisma.department.findMany({include:{studyCourses:true}});

    
        const response :DepartmentPoolDTO[]= [];
        for(const item of foundItems){
            const result = await this.departmentMapper.toPoolDTO(item);
            response.push(result);
        }
        return response;
    }
}
