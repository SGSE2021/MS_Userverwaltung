import { StudentDTO } from '../../../../common/dto/student.dto';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../common/exceptionTypes/httpException';
import StudentsService from '../services/students.service';

class StudentsController {
    private studentsService : StudentsService;
    constructor(){
        this.studentsService = new StudentsService();
    }
    //Return all recipes of the database
    public getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allStudents = await this.studentsService.getAllStudents();
            res.status(200).json(allStudents);
        } catch (error) {
            next(error);
        }
    };

    public addStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newStudent:StudentDTO = req.body
            const createdStudent = await this.studentsService.addStudent(newStudent);
            res.status(200).json(createdStudent);
        } catch (error) {
            next(error);
        }
    };

    
}

export default StudentsController;
