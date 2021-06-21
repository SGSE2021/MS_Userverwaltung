import { Router} from 'express';
import StudentsController from '../controllers/students-controller';

class StudentsRoute {
    public studentsController = new StudentsController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get     ("/students",       this.studentsController.getAllStudents);
        this.router.get     ("/students/:id",   this.studentsController.getAllStudents);
        this.router.post    ("/students",       this.studentsController.getAllStudents);
        this.router.delete  ("/students",       this.studentsController.getAllStudents);
        this.router.put     ("/students/:id",   this.studentsController.getAllStudents);
    }
}

export default StudentsRoute;
