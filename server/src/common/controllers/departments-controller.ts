import { NextFunction, Request, Response } from 'express';
import {DepartmentService }from '../services/departments.service';

export class DepartmentsController {
    private departmentService : DepartmentService;
    constructor(){
        this.departmentService = new DepartmentService();
    }

    public getAllDepartments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allItems = await this.departmentService.getAllDepartments();
            res.status(200).json(allItems);
        } catch (error) {
            next(error);
        }
    };
   
}