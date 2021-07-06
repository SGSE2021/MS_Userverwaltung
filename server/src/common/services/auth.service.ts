import prisma from "../../database";
import { RoleDTO } from "../../../../common/dto/role.enum"
import { UserInfoDTO } from "../../../../common/dto/userInfo.dto"



export class AuthService {

    public async getUserInfo( uuid: string ) {
        const { user, role } = await this.getRoleFromUUID( uuid );
        if ( !user || !role ) {
            return null;
        }

        const userInfo: UserInfoDTO = {
            uid: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            role: role,


        }

        return userInfo;

    }

    private async getRoleFromUUID( uuid: string ) {
        const foundStudent = await prisma.student.findFirst( { where: { id: uuid } } );
        if ( foundStudent != null ) { return { user: foundStudent, role: RoleDTO.STUDENT }; }

        const foundLecturer = await prisma.lecturer.findFirst( { where: { id: uuid } } );
        if ( foundLecturer != null ) { return { user: foundLecturer, role: RoleDTO.LECTURER }; }

        const foundAdministrative = await prisma.administrative.findFirst( { where: { id: uuid } } );
        if ( foundAdministrative != null ) { return { user: foundAdministrative, role: RoleDTO.ADMINSTRATIVE }; }

        return { user: null, role: null };
    }

}
