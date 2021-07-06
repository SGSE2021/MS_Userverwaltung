import prisma from "../../database";

export class AdministrativeService {
    public async getAllAdministratives() {
        const foundAdministratives = await prisma.administrative.findMany();
        return foundAdministratives;
    }

    public async getAdministrativeById( id: string ) {
        const foundAdministrative = await prisma.administrative.findFirst( {
            where: {
                id: id
            }
        } );
        return foundAdministrative;
    }
}