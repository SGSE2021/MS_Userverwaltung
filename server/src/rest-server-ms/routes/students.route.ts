import { Router } from 'express';
import StudentsController from '../../common/controllers/students-controller';

export class StudentsRoute {
    public studentsController = new StudentsController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get( "/students", this.studentsController.getAllStudents );
        this.router.get( "/students/:id", this.studentsController.getStudentById );
    }
}