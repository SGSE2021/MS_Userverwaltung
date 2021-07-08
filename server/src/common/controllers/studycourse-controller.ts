import { NextFunction, Request, Response } from 'express';
import {StudycoursesService } from '../services/studycourses.service';

export class StudycourseController {
    private studycoursesService : StudycoursesService;
    constructor(){
        this.studycoursesService = new StudycoursesService();
    }

    public getAllStudycourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allItems = await this.studycoursesService.getAllStudycourses();
            res.status(200).json(allItems);
        } catch (error) {
            next(error);
        }
    };

    public getStudyCourseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId = Number(req.params.id);
            const allItems = await this.studycoursesService.getStudyCourseById(courseId);
            res.status(200).json(allItems);
        } catch (error) {
            next(error);
        }
    };
   
}