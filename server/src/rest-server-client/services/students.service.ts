//import { StudentPreviewMapper } from "@common/mapper/student-preview.mapper";
import { StudentDTO } from "../../../../common/dto/student.dto"
import { HttpException } from "../../common/exceptionTypes/httpException";
import {Student,Prisma, Gender} from "../../../../database/node_modules/prisma/prisma-client"
import prisma from "../../database";
import { StudentMapper } from "../../common/mapper/student.mapper";


class StudentsService {

   // private studentPreviewMapper = new StudentPreviewMapper();
    private studentMapper = new StudentMapper();
    //private prisma = new PrismaClient();
    //private recipeMapper = new RecipeMapper();
    constructor(){

    }

    //Return all recipes of the database-
    public async getAllStudents() {
        const foundStudents = await prisma.student.findMany({include:{
            course:{
                include:{
                    department:true
                }
            }
        }});

        const foundStudents2 :Student[] = await prisma.student.findMany();
    
        const allStudents = [];
        for(const item of foundStudents){
            const result = this.studentMapper.toDTO(item);
            allStudents.push(result);
        }
         
        return allStudents;
    }

    public async addStudent(userData: StudentDTO){

        // const {gender, ...rest} = userData;
        // const newUser = await prisma.student.create({data:{
        //     ...rest,gender:this.test(gender)
        // }})

        // const result = this.studentMapper.toPreviewDTO(newUser);
    }

    private test(gender:string) {
        if(gender ==="MALE"){return gender;}
        if(gender ==="FEMALE"){return gender;}
        if(gender ==="DIVERSE"){return gender;}
        throw new Error("Unknown Gender");
    }


   
}
export default StudentsService;
