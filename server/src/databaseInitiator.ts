import { Student } from "../../database/node_modules/prisma/prisma-client";
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
    const deleteStudyCourses = prisma.studyCourse.deleteMany();
    const deleteDepartment = prisma.department.deleteMany();
    const deleteLecturer = prisma.lecturer.deleteMany();
    const deleteStudents = prisma.student.deleteMany();

    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([
        deleteAdministrative,
        deleteStudyCourses,

        deleteLecturer,
        deleteDepartment,
        deleteStudents,
        
    ])

      console.log("dropped")

    const listUsersResult = await adminApp.auth().listUsers();
    console.log("Firebase users: "+listUsersResult.users.length);

    //delete all users
    for(const user of listUsersResult.users){
        await adminApp.auth().deleteUser(user.uid);
    }
    console.log("Deleted all firebase users");

    //Fachbereiche
        const campusMinden = await prisma.department.create({
            data:{
                name:"Campus Minden",
                description:"Campus in Minden"
            }
        })
                const infMaster = await prisma.studyCourse.create({
                    data:{
                        name:"Informatik",
                        degree:"Master",
                        departmentId:campusMinden.id
                    }
                })
                    const profInfMaster1 = await createLecturer(
                        "hans.meier@ilias20.de",
                        new Date('1975-12-17T03:24:00'),
                        "Hans",
                        "Meier",
                        "01794233664",
                        "Prof. Dr.",
                        "MALE",
                        campusMinden.id);

                    const profInfMaster2 = await createLecturer(
                        "ulrike.martens@ilias20.de",
                        new Date('1985-08-18T03:24:00'),
                        "Ulrike",
                        "Martens",
                        "01785693664",
                        "Prof. Dr.",
                        "FEMALE",
                        campusMinden.id);

                    const profInfMaster3 = await createLecturer(
                        "Kim.Wald@ilias20.de",
                        new Date('1990-08-18T03:24:00'),
                        "Kim",
                        "Wald",
                        "01784239664",
                        "Prof. Dr.",
                        "DIVERSE",
                        campusMinden.id);

                        const studentInfMaster1 = await createStudent(
                            "dennis.eller@ilias20.de",
                            new Date('1996-08-18T03:24:00'),
                            "Dennis",
                            "Eller",
                            "01784239664",
                            "",
                            "MALE",
                            infMaster.id,
                            getRandomInt(1500000).toString(),
                            getRandomInt(7));
                        const studentInfMaster2 = await createStudent(
                            "julia.meier@ilias20.de",
                            new Date('1995-06-17T03:24:00'),
                            "Julia",
                            "Meier",
                            "01784852464",
                            "",
                            "FEMALE",
                            infMaster.id,
                            getRandomInt(1500000).toString(),
                            getRandomInt(7)
                            );

                        const studentInfMaster3 = await createStudent(
                            "kim.schulz@fh-bielefeld.de",
                            new Date('1994-04-11T03:24:00'),
                            "Kim",
                            "Schulz",
                            "01784239617",
                            "",
                            "DIVERSE",
                            infMaster.id,
                            getRandomInt(1500000).toString(),
                            getRandomInt(7)
                            );

                            const admin1 = await createAdministrative(
                                "dennis-eller@gmx.net",
                                new Date('1994-04-11T03:24:00'),
                                "Dennis",
                                "Admin",
                                "01784239617",
                                "",
                                "DIVERSE",
                                infMaster.id);




                // const infBachelor = await prisma.studyCourse.create({
                //     data:{
                //         name:"Informatik",
                //         degree:"Bachelor",
                //         departmentId:campusMinden.id
                //     }
                // })

                // const bachelorArchitektur = await prisma.studyCourse.create({
                //     data:{
                //         name:"Architektur",
                //         degree:"Bachelor",
                //         departmentId:campusMinden.id
                //     }
                // })

        // const fbIuM = await prisma.department.create({
        //     data:{
        //         name:"IuM",
        //         description:"Ingenieurwissenschaften und Mathematik"
        //     }
        // })
        //         const bachelorMechatronik = await prisma.studyCourse.create({
        //             data:{
        //                 name:"Mechatronik",
        //                 degree:"Bachelor",
        //                 departmentId:fbIuM.id
        //             }
        //         })
        //         const masterMechatronik = await prisma.studyCourse.create({
        //             data:{
        //                 name:"Mechatronik",
        //                 degree:"Master",
        //                 departmentId:fbIuM.id
        //             }
        //         })
        //         const bachelorElektrotechnik = await prisma.studyCourse.create({
        //             data:{
        //                 name:"Elektrotechnik",
        //                 degree:"Bachelor",
        //                 departmentId:fbIuM.id
        //             }
        //         })
        //         const masterELektrotechnik = await prisma.studyCourse.create({
        //             data:{
        //                 name:"Elektrotechnik",
        //                 degree:"Master",
        //                 departmentId:fbIuM.id
        //             }
        //         })

    


  
    console.log("Finished db init");
}

test();

async function createDepartments(){
    const department = await prisma.department.create({
        data:{
            name:"Campus Minden",
            description:"Campus in Minden"
        }
    })
}

async function createLecturer(mail:string,
     birthdate:Date,
     firstname:string,
      lastname:string,
      phone:string,
      title:string,
      gender:string,
      departmentId:number){
    const fbProfInfMaster1 = await firebaseAdmin.auth().createUser({
        email:mail,
        password:"123456"              
    });
    return await prisma.lecturer.create({
        data:{
            active:true,
            birthdate: birthdate,
            firstname:firstname,
            gender:get(gender),
            lastname:lastname,
            mail:mail,
            title:title,
            phone:phone,
            departmentId:departmentId,
            id:fbProfInfMaster1.uid
        }
    })
    function test(gender:string):gender is ("MALE" | "FEMALE") {
        if(gender ==="MALE"){return true;}
        if(gender ==="FEMALE"){return true;}
        if(gender ==="DIVERSE"){return true;}
        return false;
    }

    function get(gender:string){
        if(gender ==="MALE"){return gender;}
        if(gender ==="FEMALE"){return gender;}
        if(gender ==="DIVERSE"){return gender;}
        throw new Error("Unknown Gender");
    }
}

async function createStudent(mail:string,
    birthdate:Date,
    firstname:string,
     lastname:string,
     phone:string,
     title:string,
     gender:string,
     courseId:number,
     matriculationNumber:string,
     semester:number){


   const fbStudent = await firebaseAdmin.auth().createUser({
       email:mail,
       password:"123456"                            
   });

   return await prisma.student.create({
    data:{
        active:true,
        birthdate: birthdate,
        firstname:firstname,
        gender:get(gender),
        lastname:lastname,
        mail:mail,
        title:title,
        phone:phone,
        courseId:courseId,
        id:fbStudent.uid,
        matriculationNumber:matriculationNumber,
        semester:semester,
    }
})


}

async function createAdministrative(mail:string,
    birthdate:Date,
    firstname:string,
     lastname:string,
     phone:string,
     title:string,
     gender:string,
     courseId:number){
   const fbAdministrative = await firebaseAdmin.auth().createUser({
       email:mail,
       password:"123456"                            
   });
   return await prisma.administrative.create({
       data:{
           active:true,
           birthdate: birthdate,
           firstname:firstname,
           gender:get(gender),
           lastname:lastname,
           mail:mail,
           title:title,
           phone:phone,
           id:fbAdministrative.uid
       }
   })
}

function testGender(gender:string):gender is ("MALE" | "FEMALE" | "DIVERSE") {
    if(gender ==="MALE"){return true;}
    if(gender ==="FEMALE"){return true;}
    if(gender ==="DIVERSE"){return true;}
    return false;
}

function get(gender:string){
    if(gender ==="MALE"){return gender;}
    if(gender ==="FEMALE"){return gender;}
    if(gender ==="DIVERSE"){return gender;}
    throw new Error("Unknown Gender");
}
//db.main();

