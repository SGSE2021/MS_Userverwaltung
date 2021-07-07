import { NextFunction, Request, Response } from 'express';
import MaintenanceService from '../services/maintenance.service';

export class MaintenanceController {
    private maintenanceService : MaintenanceService;
    constructor(){
        this.maintenanceService = new MaintenanceService();
    }

    public dbInit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{           
            this.maintenanceService.dbInit();
            res.status(200).json({ data: null, message: `Database initialized`})
        }
        catch(e)
        {
            next(e);
        }            
    }

    public dbReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{           
            this.maintenanceService.dbReset();
            res.status(200).json({ data: null, message: `Database reseted`})
        }
        catch(e)
        {
            next(e);
        } 
    }

    public ping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        return ;
    }
}