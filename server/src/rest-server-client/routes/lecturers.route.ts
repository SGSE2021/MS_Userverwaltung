import { Router } from 'express';
import { LecturerController } from '../../common/controllers/lecturers.controller';

export class LecturersRoute {
    public lecturerController = new LecturerController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get( "/lecturers", this.lecturerController.getAllLecturers );
        this.router.get( "/lecturers/:id", this.lecturerController.getLecturerById );
    //     this.router.post( "/students", this.lecturerController.addStudent );
    //     this.router.delete( "/students/:id", this.lecturerController.deleteStudentById );
    //     this.router.put( "/students/:id", this.studentsController.updateStudent );
     }
}