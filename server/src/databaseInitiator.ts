import { Student } from ".prisma/client";
import prisma from "./database";
/// <reference lib="dom" />
import * as firebaseAdmin  from "firebase-admin";
/// <reference lib="dom" />
import * as firebase from "firebase";
import { getRandomInt } from "./common/utils/getRandomInt";

const adminConfig = {
    type: "service_account",
    project_id: "ms-user-service",
    private_key_id: "51e5ad2d81ab6380b5ee5ddce926e16038eb4578",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC8cIkatNqNRZao\nwvLmsUqm8QGryvZE66HjiprDnFTFRujscKyhRFkfgFKtPW7BZHHUDTVyz/UAMZWW\nyCQX7lLtD3k/+CHjVlU5pQI7icZazFfSgMNA5MBo2shKtQIwyyViwzAn4tSw6VkH\nLYdwNYwrCmY/mEWk3bEoLvT1RTC7nuSgy+8zAwIMH8qesxiSeD5ncHB3Ra2/RRF9\n0VsD3YDQqRlN2nsvdnEAgEKOgXS5l+GBkCIjhaNMrxYO5ETuwb5lFcyB9hNzjISL\ngaS2X8raVZCt1gm02VYl0H6e5qVrszv5teTSQ1COi4eUm2kq0Aw9Pymlou13ZBvT\nfUf1mO3rAgMBAAECggEAF/MvocrRqjnpe5qHd8WZyN0Byt1ZbooKQdrIb8srRQWN\nrhtl/Xsr3qKXH3ia3o6PHxXssKJ4r6Udr5PRbo82T/XzAaveVsAOxexQe9O3d6vY\nD6OY7WMFh24jHceityPipQpM0Qz13mRSEeT5/Ut4/LFuLHAEjf81OHe7X38DQh0o\nYLrcYybV+5LpAdU75Cv+euHTpCYtmAigE0VbXAMIt0cPpVI9F3TLZQ2Rv8sHCdKt\nmYd5CXKpqQ6tPx0GyLfs3/x9d/FvB4TB4hbaMjpbc/LI/QiVrs0jOBOJLlqYJseL\n7OAiLX+2yy9A2GIdRZYksfb/46U6BEmtV4JbhC5KOQKBgQDpGKwQYCZeQnc06cDQ\nW2zKbNmvhzQNf5pdUlf30dKCuh9zOivJQ+RcOzh5j6M1NuEU9GoVhWzZBitzFdP5\n/Vl8YKHVHHO8QQ720b7+DkCR8onZvbLNxA2D5Te5b01zfXe5zhg13QKAbrAH+HS1\nYZzK1sjbD/xAL3A/LFBnHw2xKQKBgQDO9JAEAvgkiSqOlZsFXwScKuS9pmOpzO32\nTCl5hyI4dTyGFhVNuI4yph36OHSW3JLzNWKUAP4/dTwvjqtF1WbrBvJUyMSen/Tl\ntPF3N1N2+qDjdkZHn4KI/a5CyMy0jfeQesEqEy0aeTM6aGlYMSk6PGGQ36fDUSbI\nzvRbfzAk8wKBgDmJdoeARFhGDcjI3mhP+PWqkr1KIWYnlkHs3nv0lgLg0HyP4lkG\n4iqGD7Wp5/5tsneKsVjom2qipDz/KVju2ZTjAW9qW4MfiAMS2RM7D2M3PCG8OpOi\nDjf9b5jdSX/1e4Uowz8gc8qiB9+fy6cuFhbXl7LDKl/plcpyNNKPjsCpAoGAWUAB\nB6ncJ617y+fa5dMXYt3graUfH/A/w1MPI9jSOjTc+Bp373+i21bmYK2OIi1XtkkU\njS1seCNv5DaLyF8CtmLViRjYKmxjKdkBtV8HwKzPS6kLIAI7QibcyvJbzZXX6Nf3\ni9SfQ+Z24D59B8qTtAisLtU1PTc3GayelwLf2V8CgYBh5p/vlXsXRpoG05RCiD5x\ntJA9EHJbBzbAfL0oWWffS+E/qDTiOHwErI4SFWggRSo9edY/EhQG6ksOMLbo5y41\nybkP6QATHe0KUtppSoAIrybKlbWxK8fiu0YbD05X/8TRAd10UkqyuetDfm7Mhkwz\nzlfSKGcGLrdb2XojlV21OA==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-b6q4j@ms-user-service.iam.gserviceaccount.com",
    client_id: "102199516782335423427",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b6q4j%40ms-user-service.iam.gserviceaccount.com"
  };
  


const adminApp = firebaseAdmin.initializeApp({credential:firebaseAdmin.credential.cert(JSON.parse(JSON.stringify(adminConfig)))});
export {adminApp};

const config = {    
    apiKey: "AIzaSyA8SJNujTKurGNLA15PQqPjz0Pi2rpeEAw",
    authDomain: "ms-user-service.firebaseapp.com",
    projectId: "ms-user-service",
    storageBucket: "ms-user-service.appspot.com",
    messagingSenderId: "947016479819",
    appId: "1:947016479819:web:6d4c58d6aa90077f6349ce",
    measurementId: "G-XYP3W8XE9Y"
  }

  const app = firebase.default.initializeApp(config);
  export {app};


async function test(){
    const deleteAdministrative = prisma.administrative.deleteMany();
    const deleteDepartment = prisma.department.deleteMany();
    const deleteLecturer = prisma.lecturer.deleteMany();
    const deleteStudents = prisma.student.deleteMany();
    const deleteStudyCourses = prisma.studyCourse.deleteMany();

    
    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([
        deleteAdministrative,
        deleteDepartment,
        deleteLecturer,
        deleteStudents,
        deleteStudyCourses
    ])

      console.log("dropped")

    const listUsersResult = await adminApp.auth().listUsers();
    console.log(listUsersResult.users);

    for(const user of listUsersResult.users){
        if(!user.email){return;}
        await prisma.student.create({
            data:{
                active:true,
                birthdate:new Date(),
                firstname:"Peter",
                lastname:"Pan",
                gender:"MALE",
                id:user.uid,
                mail : user.email,
                matriculationsNumber:getRandomInt(1000000).toString(),
                semester:getRandomInt(10),
            }
        })
    }
    console.log("added");
}

console.log("test");
test();



export abstract class DatabaseInitiator{
    public  static async  generateEntities(){
        
        await this.addStudent({
            id:"",
            firstname: 'Dennis',
            lastname:"Eller",
            birthdate:new Date(1996, 12, 24),
            gender: 'MALE',
            mail:"dennis-eller@gmx.net",
            active:true,
            title:"",
            phone:"",
            matriculationsNumber:"1125631",
            semester:1,
            courseId:null
           });
           await this.addStudent({
            id:"",
            firstname: 'Julia',
            lastname:"Meier",
            birthdate:new Date(1998, 3, 12),
            gender: 'FEMALE',
            mail:"julia.meier@fh-bielefeld.de",
            active:true,
            title:"",
            phone:"",
            matriculationsNumber:"1123684",
            semester:5,
            courseId:null
           })
    }

    private static async addStudent(student:Student){
       await prisma.student.create({data: student});
    }
}


export class Database{

    private prisma = prisma;
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
//db.main();

