import { Router } from 'express';
import { MaintenanceController } from '../../common/controllers/maintenance.controller';


export class MaintenanceRoute {
    public maintenanceController = new MaintenanceController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post( "/initDb", this.maintenanceController.dbInit );
        this.router.post( "/dbReset", this.maintenanceController.dbReset );
        this.router.post( "/ping", this.maintenanceController.ping );
    }
}