import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../common/exceptionTypes/httpException';
import DepartmentService from '../services/departments.service';

class DepartmentsController {
    private departmentService : DepartmentService;
    constructor(){
        this.departmentService = new DepartmentService();
    }
    //Return all recipes of the database
    public getAllDepartments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allItems = await this.departmentService.getAllDepartments();
            res.status(200).json(allItems);
        } catch (error) {
            next(error);
        }
    };
   
}

export default DepartmentsController;
