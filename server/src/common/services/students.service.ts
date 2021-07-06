import { AddStudentDTO } from "../../../../common/dto/addstudent.dto"
import { Prisma } from "../../../../database/node_modules/prisma/prisma-client"
import prisma from "../../database";
import { StudentMapper } from "../../common/mapper/student.mapper";

import { adminApp as firebaseAdmin } from "../../databaseInitiator"
import { StudentDTO } from "../../../../common/dto/student.dto";
import { RabbitSender } from "../../rabbitmq-client/rabbit.sender";
import { parseGender } from "../utils/gender-parser";


export class StudentsService {
    private studentMapper = new StudentMapper();
    private rabbitSender = new RabbitSender();

    public async getAllStudents() {
        const foundStudents = await prisma.student.findMany( {
            include: {
                course: {
                    include: {
                        department: true
                    }
                }
            }
        } );

        const allStudents = [];
        for ( const item of foundStudents ) {
            const result = this.studentMapper.toDTO( item );
            allStudents.push( result );
        }





        return allStudents;
    }

    public async getStudentById( id: string ) {
        const foundStudent = await prisma.student.findFirst( {
            where: {
                id: id
            }, include: {
                course: {
                    include: {
                        department: true
                    }
                }
            }
        } );
        console.log( foundStudent )
        if ( foundStudent === null ) {
            throw new Error( "No student found" );
        }
        console.log( foundStudent )
        const result = this.studentMapper.toDTO( foundStudent );
        return result;
    }

    public async addStudent( userData: AddStudentDTO ) {

        const fbUser = await firebaseAdmin.auth().createUser( {
            email: userData.mail,
            password: "123456",
            displayName: userData.firstname + " " + userData.lastname
        } );

        const { gender, ...rest } = userData;
        const user: Prisma.StudentCreateInput = {
            active: rest.active,
            birthdate: rest.birthdate,
            firstname: rest.firstname,
            gender: parseGender( gender ),
            id: fbUser.uid,
            lastname: rest.lastname,
            mail: rest.mail,
            matriculationNumber: rest.matriculationNumber,
            semester: parseInt( rest.semester.toString() ),
            course: {
                connect: {
                    id: rest.course.id
                }
            }

        }

        const newUser = await prisma.student.create( { data: user } );
        this.rabbitSender.send( "users-student-add", JSON.stringify( newUser ) );
        return newUser;
    }

    public async deleteStudentById( studentId: string ) {

        const deleteArgs: Prisma.StudentDeleteArgs = {
            where: {
                id: studentId.toString()
            }
        };
        await prisma.student.delete( deleteArgs );
        await firebaseAdmin.auth().deleteUser( studentId );
        this.rabbitSender.send( "users-students-delete", studentId );
        return;
    }

    public async updateStudent( studentId: string, studentData: StudentDTO ) {

        const { gender, course, id, ...rest } = studentData;
        const updateArgs: Prisma.StudentUpdateArgs = {
            where: {
                id: studentId
            },
            data: {
                gender: parseGender( gender ),
                courseId: studentData.course?.id,
                ...rest,
            }
        }

        const updatedStudent = await prisma.student.update( updateArgs );
        const fbUser = await firebaseAdmin.auth().getUser( studentId );
        const oldMail = fbUser.email;

        if ( oldMail != studentData.mail ) {
            await firebaseAdmin.auth().updateUser( studentId, {
                email: studentData.mail
            } );
        }

        await firebaseAdmin.auth().updateUser( studentId, {
            displayName: studentData.firstname + " " + studentData.lastname
        } );

        this.rabbitSender.send( "users-students-update", studentId );
        return updatedStudent;
    }

}