import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../common/exceptionTypes/httpException';
import StudentsService from '../services/students.service';
import { StudentPreviewDTO } from '../../common/models/DTOs/student-preview.dto';

class StudentsController {
    private studentsService : StudentsService;
    constructor(){
        this.studentsService = new StudentsService();
    }
    //Return all recipes of the database
    public getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allStudents: StudentPreviewDTO[] = await this.studentsService.getAllRecipes();
            res.status(200).json(allStudents);
        } catch (error) {
            next(error);
        }
    };

    
}

export default StudentsController;
