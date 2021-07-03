import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../common/exceptionTypes/httpException';
import { AuthService } from '../services/auth.service';
import {DepartmentService }from '../services/departments.service';

export class AuthController {
    private authService : AuthService;
    constructor(){
        this.authService = new AuthService();
    }

    public getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token:string = req.params.token; //Wegen Settings/Ganzen user zurückgeben? Lieber eigene Route bzw getStudentById
            const userInfo = await this.authService.getUserInfo(token);
            if(!userInfo){
                res.status(404);
            }
            res.status(200).json(userInfo);
        } catch (error) {
            next(error);
        }
    };
   
}