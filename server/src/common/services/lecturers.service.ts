//import { StudentPreviewMapper } from "@common/mapper/student-preview.mapper";
import { AddLecturerDTO } from "../../../../common/dto/addlecturer.dto"
import { HttpException } from "../../common/exceptionTypes/httpException";
import {Student,Prisma, Gender} from "../../../../database/node_modules/prisma/prisma-client"
import prisma from "../../database";
import { StudentMapper } from "../../common/mapper/student.mapper";

import {adminApp as firebaseAdmin,app as firebase} from "../../databaseInitiator"
import { LecturerDTO } from "../../../../common/dto/lecturer.dto";


export class LecturerService {
    constructor(){

    }


    public async getAllLecturers() {
        const foundLecturers = await prisma.lecturer.findMany({include:{
            department:true
        }});
   
        // const allStudents = [];
        // for(const item of foundLecturers){
        //     const result = this.studentMapper.toDTO(item);
        //     allStudents.push(result);
        // }
         
        return foundLecturers;
    }

    public async getLecturerById(id:string) {
        const foundLecturer = await prisma.lecturer.findFirst({where:{
            id:id
        },include:{
            department:true
        }});
    

        //const result = this.studentMapper.toDTO(foundStudent);
         
        return foundLecturer;
    }

    public async addLecturer(lecturerData: AddLecturerDTO){

        const fbUser = await firebaseAdmin.auth().createUser({
            email:lecturerData.mail,
            password:"123456",
            displayName:lecturerData.firstname+ " " + lecturerData.lastname
            });

        const {gender, ...rest} = lecturerData;
        const user: Prisma.LecturerCreateInput = {
            active:rest.active,
            birthdate:rest.birthdate,
            firstname:rest.firstname,
            gender:this.parseGender(gender),
            id:fbUser.uid,
            lastname:rest.lastname,
            mail:rest.mail,
            department:{connect:{
                id:rest.department.id
            }}

        }

        const newLecturer = await prisma.lecturer.create({data:user});
        return newLecturer;
    }

    public async deleteLecturerById(lecturerId:string){
        
        const deleteArgs : Prisma.LecturerDeleteArgs = {
            where:{
                id:lecturerId.toString()
            }
        };
        await prisma.lecturer.delete(deleteArgs);
        await firebaseAdmin.auth().deleteUser(lecturerId);
        return;
    }

    public async updateLecturer(lecturerId:string, lecturerData:LecturerDTO){
        

        const {gender,id, department,...rest} = lecturerData;

        const updateArgs : Prisma.LecturerUpdateArgs={
            where:{
                id:lecturerId
            },
            data:{gender:this.parseGender(gender),
            ...rest,
            departmentId:department?.id
        }

        }

        const updatedLecturer = await prisma.lecturer.update(updateArgs);
        const fbUser = await firebaseAdmin.auth().getUser(lecturerId);
        const oldMail =fbUser.email;
        if(oldMail!=lecturerData.mail){
        await firebaseAdmin.auth().updateUser(lecturerId,{
            email:lecturerData.mail
        });
        }

        if(oldMail!=lecturerData.mail){
            await firebaseAdmin.auth().updateUser(lecturerId,{
                displayName:lecturerData.firstname+" "+lecturerData.lastname
                });
            }

        return updatedLecturer;
    }



  

    private parseGender(gender:string) {
        if(gender ==="MALE"){return gender;}
        if(gender ==="FEMALE"){return gender;}
        if(gender ==="DIVERSE"){return gender;}
        throw new Error("Unknown Gender");
    }


   
}