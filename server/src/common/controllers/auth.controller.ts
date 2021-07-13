import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService : AuthService;
    constructor(){
        this.authService = new AuthService();
    }

    public getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token:string = req.params.token;
            console.log("AuthController:GetUserInfo: token from client",token);
            const userInfo = await this.authService.getUserInfo(token);
            if(!userInfo){
                console.log("AuthController:GetUserInfo: User info sent to client", userInfo);
                res.status(404);
            }
            console.log("AuthController:GetUserInfo: User info sent to client", userInfo);
            res.status(200).json(userInfo);
        } catch (error) {
            next(error);
        }
    };
}