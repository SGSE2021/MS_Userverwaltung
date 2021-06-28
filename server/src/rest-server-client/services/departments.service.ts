import { HttpException } from "../../common/exceptionTypes/httpException";
import prisma from "../../database";
import { DepartmentMapper } from "../../common/mapper/department-mapper";
import { DepartmentPoolDTO } from "@common/dto/department-pool.dto";


class DepartmentService {
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
export default DepartmentService;
