
import { StudentPreviewMapper } from "../../common/mapper/recipe-preview.mapper";
import { StudentPreviewDTO } from "../../common/models/DTOs/student-preview.dto";
import { HttpException } from "../../common/exceptionTypes/httpException";
import { Student } from "@prisma/client";
import prisma from "../../database"
class StudentsService {

    private studentPreviewMapper = new StudentPreviewMapper();
    //private recipeMapper = new RecipeMapper();
    constructor(){

    }

    //Return all recipes of the database-
    public async getAllRecipes(): Promise<StudentPreviewDTO[]> {
        const foundStudents : Student[] = await prisma.student.findMany();
    
        const allStudents = [];
        for(const item of foundStudents){
            const result: StudentPreviewDTO = this.studentPreviewMapper.toDTO(item);
            allStudents.push(result);
        }
         
        return allStudents;
    }
  

   
}
export default StudentsService;
