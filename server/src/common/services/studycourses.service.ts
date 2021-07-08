import prisma from "../../database";

export class StudycoursesService {
    public async getAllStudycourses() {
        const foundItems = await prisma.studyCourse.findMany( { include: { department: true } } );
        return foundItems;
    }

    public async getStudyCourseById( id: number ) {
        const foundItems = await prisma.studyCourse.findFirst( { where: { id: id }, include: { department: true } } );
        return foundItems;
    }
}