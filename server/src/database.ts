import { PrismaClient } from '@prisma/client';

export class Database{
    private prisma:PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }

    async main() {
        try {
            return await this.do();
        } 
        catch (error) {
            throw error;
        }
        finally{
            await this.prisma.$disconnect();
        }
      }

    private async do(){
        await this.prisma.student.create({
            data: {
                id:"test",
                firstname: 'Dennis',
                lastname:"Eller",
                birthdate:new Date(1996, 12, 24),
                gender: 'MALE',
                mail:"dennis-eller@gmx.net",
                active:true,
                title:"",
                phone:"",
                matriculationsNumber:"101",
                semester:1
               },
          })
        
        
          const allStudents = await this.prisma.student.findMany({
          })   
          console.dir(allStudents, { depth: null })

        //   const post = await this.prisma.post.update({
        //     where: { id: 1 },
        //     data: { published: true },
        //   })
          //console.log(post)

          return allStudents;
    }
}

const db = new Database();
db.main();

const prisma = new PrismaClient();
export default prisma;

