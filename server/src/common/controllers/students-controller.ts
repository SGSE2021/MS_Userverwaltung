import { AddStudentDTO } from '../../../../common/dto/addstudent.dto';
import { NextFunction, Request, Response } from 'express';
import { StudentsService } from '../services/students.service';

class StudentsController {

    public studentsService: StudentsService;

    constructor() {
        this.studentsService = new StudentsService();
    }

    public getAllStudents = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            let queryParam = "";
            if ( req.query["name"] ) {
                queryParam = req.query["name"].toString();
            }
            const allStudents = await this.studentsService.getAllStudents(queryParam);
            res.status( 200 ).json( allStudents );
        } catch ( error ) {
            next( error );
        }
    };

    public getStudentById = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const studentId = req.params.id;
            const student = await this.studentsService.getStudentById( studentId );
            res.status( 200 ).json( student );
        } catch ( error ) {
            next( error );
        }
    };

    public addStudent = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const newStudent: AddStudentDTO = req.body;
            const createdStudent = await this.studentsService.addStudent( newStudent );
            res.status( 200 ).json( createdStudent );
        } catch ( error ) {
            next( error );
        }
    };

    public deleteStudentById = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {

            const studentId = req.params?.id.toString();
            if ( studentId == null ) { throw new Error( "No Id provided" ) }
            await this.studentsService.deleteStudentById( studentId );
            res.status( 204 ).json( null );
        } catch ( error ) {
            next( error );
        }
    };

    public updateStudent = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {

            const studentId = req.params?.id.toString();
            const studentData = req.body;
            if ( studentId == null ) { throw new Error( "No Id provided" ) }
            const updatedUser = await this.studentsService.updateStudent( studentId, studentData );
            res.status( 201 ).json( updatedUser );
        } catch ( error ) {
            next( error );
        }
    };

}

export default StudentsController;