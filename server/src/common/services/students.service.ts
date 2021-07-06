//import { StudentPreviewMapper } from "@common/mapper/student-preview.mapper";
import { AddStudentDTO } from "../../../../common/dto/addstudent.dto"
import { HttpException } from "../../common/exceptionTypes/httpException";
import {Student,Prisma, Gender} from "../../../../database/node_modules/prisma/prisma-client"
import prisma from "../../database";
import { StudentMapper } from "../../common/mapper/student.mapper";

import {adminApp as firebaseAdmin,app as firebase} from "../../databaseInitiator"
import { StudentDTO } from "../../../../common/dto/student.dto";


export class StudentsService {
    private studentMapper = new StudentMapper();
    constructor(){

    }


    public async getAllStudents() {
        const foundStudents = await prisma.student.findMany({include:{
            course:{
                include:{
                    department:true
                }
            }
        }});
   
        const allStudents = [];
        for(const item of foundStudents){
            const result = this.studentMapper.toDTO(item);
            allStudents.push(result);
        }

        amqp.connect('amqp://user:5ux6mBcfMX@rabbitmq.support.svc.cluster.local:5672/', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });
    setTimeout(function(){
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);

    }, 1000); 


  });
});


         
        return allStudents;
    }

    public async getStudentById(id:string) {
        const foundStudent = await prisma.student.findFirst({where:{
            id:id
        },include:{
            course:{
                include:{
                    department:true
                }
            }
        }});
        console.log(foundStudent)
        if(foundStudent===null){
            throw new Error("No student found");
        }
        console.log(foundStudent)
        const result = this.studentMapper.toDTO(foundStudent);
         
        return result;
    }

    public async addStudent(userData: AddStudentDTO){

        const fbUser = await firebaseAdmin.auth().createUser({
            email:userData.mail,
            password:"123456",
            displayName:userData.firstname+ " " + userData.lastname
            });

        const {gender, ...rest} = userData;
        const user: Prisma.StudentCreateInput = {
            active:rest.active,
            birthdate:rest.birthdate,
            firstname:rest.firstname,
            gender:this.parseGender(gender),
            id:fbUser.uid,
            lastname:rest.lastname,
            mail:rest.mail,
            matriculationNumber:rest.matriculationNumber,
            semester:parseInt(rest.semester.toString()),
            course:{connect:{
                id:rest.course.id
            }}

        }

        const newUser = await prisma.student.create({data:user});

        

        return newUser;
    }

    public async deleteStudentById(studentId:string){
        
        const deleteArgs : Prisma.StudentDeleteArgs = {
            where:{
                id:studentId.toString()
            }
        };
        await prisma.student.delete(deleteArgs);
        await firebaseAdmin.auth().deleteUser(studentId);
        return;
    }

    public async updateStudent(studentId:string, studentData:StudentDTO){
        

        const {gender,course,id, ...rest} = studentData;

        const updateArgs : Prisma.StudentUpdateArgs={
            where:{
                id:studentId
            },
            data:{gender:this.parseGender(gender),
            courseId: studentData.course?.id,
            ...rest,
        }

        }

        const updatedStudent = await prisma.student.update(updateArgs);
        const fbUser = await firebaseAdmin.auth().getUser(studentId);
        const oldMail =fbUser.email;
        if(oldMail!=studentData.mail){
        await firebaseAdmin.auth().updateUser(studentId,{
            email:studentData.mail
        });
        }

        if(oldMail!=studentData.mail){
            await firebaseAdmin.auth().updateUser(studentId,{
                displayName:studentData.firstname+" "+studentData.lastname
                });
            }

        return updatedStudent;
    }



  

    private parseGender(gender:string) {
        if(gender ==="MALE"){return gender;}
        if(gender ==="FEMALE"){return gender;}
        if(gender ==="DIVERSE"){return gender;}
        throw new Error("Unknown Gender");
    }


   
}


import * as amqp from "amqplib/callback_api"



//Receiver

amqp.connect('amqp://user:5ux6mBcfMX@rabbitmq.support.svc.cluster.local:5672/', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg?.content.toString());
        }, {
            noAck: true
        });
    });
});

//Sender

