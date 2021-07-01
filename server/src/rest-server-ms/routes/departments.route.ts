import { Router} from 'express';
import {DepartmentsController } from '../../common/controllers/departments-controller';

export class DepartmentsRoute {
    public departmentControllers = new DepartmentsController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get     ("/departments",       this.departmentControllers.getAllDepartments);
    }
}