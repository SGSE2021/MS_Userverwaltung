import { NextFunction, Request, Response } from 'express';
import { AdministrativeService } from '../services/administratives.service';

export class AdministrativeController {

    private administrativeService: AdministrativeService;

    constructor() {
        this.administrativeService = new AdministrativeService();
    }

    public getAllAdministratives = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const allAdministratives = await this.administrativeService.getAllAdministratives();
            res.status( 200 ).json( allAdministratives );
        } catch ( error ) {
            next( error );
        }
    };

    public getAdministrativeById = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const id = req.params.id;
            const administrative = await this.administrativeService.getAdministrativeById( id );
            res.status( 200 ).json( administrative );
        } catch ( error ) {
            next( error );
        }
    };

}