import { AddLecturerDTO } from "../../../../common/dto/addlecturer.dto"
import { Prisma } from "../../../../database/node_modules/prisma/prisma-client"
import prisma from "../../database";
import { adminApp as firebaseAdmin } from "./firebase.service"
import { LecturerDTO } from "../../../../common/dto/lecturer.dto";
import { RabbitSender } from "../../rabbitmq-client/rabbit.sender";
import { parseGender } from "../utils/gender-parser";


export class LecturerService {
    private rabbitSender = new RabbitSender();

    public async getAllLecturers() {
        const foundLecturers = await prisma.lecturer.findMany( {
            include: {
                department: true
            }
        } );

        return foundLecturers;
    }

    public async getLecturerById( id: string ) {
        const foundLecturer = await prisma.lecturer.findFirst( {
            where: {
                id: id
            }, include: {
                department: true
            }
        } );

        return foundLecturer;
    }

    public async addLecturer( lecturerData: AddLecturerDTO ) {

        const fbUser = await firebaseAdmin.auth().createUser( {
            email: lecturerData.mail,
            password: "123456",
            displayName: lecturerData.firstname + " " + lecturerData.lastname
        } );

        const { gender, ...rest } = lecturerData;
        const user: Prisma.LecturerCreateInput = {
            active: rest.active,
            birthdate: rest.birthdate,
            firstname: rest.firstname,
            gender: parseGender( gender ),
            id: fbUser.uid,
            lastname: rest.lastname,
            mail: rest.mail,
            department: {
                connect: {
                    id: rest.department.id
                }
            }

        }

        const newLecturer = await prisma.lecturer.create( { data: user } );

        this.rabbitSender.send( "users-lecturers-add", JSON.stringify( newLecturer ) );
        return newLecturer;
    }

    public async deleteLecturerById( lecturerId: string ) {

        const deleteArgs: Prisma.LecturerDeleteArgs = {
            where: {
                id: lecturerId.toString()
            }
        };
        await prisma.lecturer.delete( deleteArgs );
        await firebaseAdmin.auth().deleteUser( lecturerId );
        this.rabbitSender.send( "users-lecturers-delete", JSON.stringify( lecturerId ) );
        return;
    }

    public async updateLecturer( lecturerId: string, lecturerData: LecturerDTO ) {
        const { gender, id, department, ...rest } = lecturerData;
        const updateArgs: Prisma.LecturerUpdateArgs = {
            where: {
                id: lecturerId
            },
            data: {
                gender: parseGender( gender ),
                ...rest,
                departmentId: department?.id
            }
        }

        const updatedLecturer = await prisma.lecturer.update( updateArgs );
        const fbUser = await firebaseAdmin.auth().getUser( lecturerId );
        const oldMail = fbUser.email;
        if ( oldMail != lecturerData.mail ) {
            await firebaseAdmin.auth().updateUser( lecturerId, {
                email: lecturerData.mail
            } );
        }

        if ( oldMail != lecturerData.mail ) {
            await firebaseAdmin.auth().updateUser( lecturerId, {
                displayName: lecturerData.firstname + " " + lecturerData.lastname
            } );
        }
        this.rabbitSender.send( "users-lecturers-update", JSON.stringify( updatedLecturer ) );
        return updatedLecturer;
    }

}