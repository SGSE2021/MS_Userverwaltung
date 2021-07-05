import { Router } from 'express';
import { AdministrativeController } from '../../common/controllers/administrative.controller';

export class AdministrativeRoute {
    public administrativeController = new AdministrativeController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get( "/administratives", this.administrativeController.getAllAdministratives );
        this.router.get( "/administratives/:id", this.administrativeController.getAdministrativeById );
    }
}