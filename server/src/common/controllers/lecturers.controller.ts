import { NextFunction, Request, Response } from 'express';
import { LecturerService } from '../services/lecturers.service';
import { AddLecturerDTO } from '../../../../common/dto/addlecturer.dto';

export class LecturerController {

    public lecturerService: LecturerService;

    constructor() {
        this.lecturerService = new LecturerService();
    }

    public getAllLecturers = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            let queryParam = "";
            if ( req.query["name"] ) {
                queryParam = req.query["name"].toString();
            }

            const allStudents = await this.lecturerService.getAllLecturers( queryParam );
            res.status( 200 ).json( allStudents );
        } catch ( error ) {
            next( error );
        }
    };



    public getLecturerById = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const id = req.params.id;
            const lecturer = await this.lecturerService.getLecturerById( id );
            res.status( 200 ).json( lecturer );
        } catch ( error ) {
            next( error );
        }
    };

    public addLecturer = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const newStudent: AddLecturerDTO = req.body;
            const createdStudent = await this.lecturerService.addLecturer( newStudent );
            res.status( 200 ).json( createdStudent );
        } catch ( error ) {
            next( error );
        }
    };

    public deleteLecturerById = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {

            const lecturerId = req.params?.id.toString();
            if ( lecturerId == null ) { throw new Error( "No Id provided" ) }
            await this.lecturerService.deleteLecturerById( lecturerId );
            res.status( 204 ).json( null );
        } catch ( error ) {
            next( error );
        }
    };

    public updateLecturer = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {

            const studentId = req.params?.id.toString();
            const studentData = req.body;
            if ( studentId == null ) { throw new Error( "No Id provided" ) }
            const updatedUser = await this.lecturerService.updateLecturer( studentId, studentData );
            res.status( 201 ).json( updatedUser );
        } catch ( error ) {
            next( error );
        }
    };

}