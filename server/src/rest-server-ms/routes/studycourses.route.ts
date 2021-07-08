import { Router } from 'express';
import { StudycourseController } from '../../common/controllers/studycourse-controller';

export class StudycourseRoute {
    public studycourseController = new StudycourseController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get( "/studycourses", this.studycourseController.getAllStudycourses );
        this.router.get( "/studycourses/:id", this.studycourseController.getStudyCourseById );
    }
}