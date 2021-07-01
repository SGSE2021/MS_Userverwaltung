import { AddStudentDTO } from '../../../../common/dto/addstudent.dto';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../common/exceptionTypes/httpException';
import {LecturerService} from '../services/lecturers.service';
import {Student,Prisma, Gender} from "../../../../database/node_modules/prisma/prisma-client"

export class LecturerController {

    private lecturerService : LecturerService;

    constructor(){
        this.lecturerService = new LecturerService();
    }

    public getAllLecturers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allStudents = await this.lecturerService.getAllLecturers();
            res.status(200).json(allStudents);
        } catch (error) {
            next(error);
        }
    };

    public getLecturerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id =req.params.id;
            const lecturer = await this.lecturerService.getLecturerById(id);
            res.status(200).json(lecturer);
        } catch (error) {
            next(error);
        }
    };

    // public addStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const newStudent:AddStudentDTO = req.body;
    //         const createdStudent = await this.studentsService.addStudent(newStudent);
    //         res.status(200).json(createdStudent);
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    // public deleteStudentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
            
    //         const studentId= req.params?.id.toString();
    //         if(studentId== null){ throw new Error("No Id provided")}
    //         await this.studentsService.deleteStudentById(studentId);
    //         res.status(204).json(null);
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    // public updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
            
    //         const studentId= req.params?.id.toString();
    //         const studentData = req.body;
    //         if(studentId== null){ throw new Error("No Id provided")}
    //         const updatedUser = await this.studentsService.updateStudent(studentId,studentData);
    //         res.status(201).json(updatedUser);
    //     } catch (error) {
    //         next(error);
    //     }
    // };
    
}
