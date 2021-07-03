import { Router } from 'express';
import { AuthController } from '../../common/controllers/auth.controller';

export class AuthRoute {
    public authController = new AuthController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post( "/getUserInfo/:token", this.authController.getUserInfo );
    }
}