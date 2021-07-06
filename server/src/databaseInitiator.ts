import prisma from "./database";
import { getRandomInt } from "./common/utils/getRandomInt";
import { adminApp } from "./common/services/firebase.service"

async function test() {
    const deleteAdministrative = prisma.administrative.deleteMany();
    const deleteStudyCourses = prisma.studyCourse.deleteMany();
    const deleteDepartment = prisma.department.deleteMany();
    const deleteLecturer = prisma.lecturer.deleteMany();
    const deleteStudents = prisma.student.deleteMany();

    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction( [
        deleteAdministrative,
        deleteStudyCourses,

        deleteLecturer,
        deleteDepartment,
        deleteStudents,

    ] )

    console.log( "dropped" )

    const listUsersResult = await adminApp.auth().listUsers();
    console.log( "Firebase users: " + listUsersResult.users.length );

    //delete all users
    for ( const user of listUsersResult.users ) {
        await adminApp.auth().deleteUser( user.uid );
    }
    console.log( "Deleted all firebase users" );

    //Fachbereiche
    const campusMinden = await prisma.department.create( {
        data: {
            name: "Campus Minden",
            description: "Campus in Minden"
        }
    } )
    const infMaster = await prisma.studyCourse.create( {
        data: {
            name: "Informatik",
            degree: "Master",
            departmentId: campusMinden.id
        }
    } )
    const profInfMaster1 = await createLecturer(
        "hans.meier@ilias20.de",
        new Date( '1975-12-17T03:24:00' ),
        "Hans",
        "Meier",
        "01794233664",
        "Prof. Dr.",
        "MALE",
        campusMinden.id );

    const profInfMaster2 = await createLecturer(
        "ulrike.martens@ilias20.de",
        new Date( '1985-08-18T03:24:00' ),
        "Ulrike",
        "Martens",
        "01785693664",
        "Prof. Dr.",
        "FEMALE",
        campusMinden.id );

    const profInfMaster3 = await createLecturer(
        "Kim.Wald@ilias20.de",
        new Date( '1990-08-18T03:24:00' ),
        "Kim",
        "Wald",
        "01784239664",
        "Prof. Dr.",
        "DIVERSE",
        campusMinden.id );

    const studentInfMaster1 = await createStudent(
        "dennis.eller@ilias20.de",
        new Date( '1996-08-18T03:24:00' ),
        "Dennis",
        "Eller",
        "01784239664",
        "",
        "MALE",
        infMaster.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 ) );
    const studentInfMaster2 = await createStudent(
        "julia.meier@ilias20.de",
        new Date( '1995-06-17T03:24:00' ),
        "Julia",
        "Meier",
        "01784852464",
        "",
        "FEMALE",
        infMaster.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 )
    );

    const studentInfMaster3 = await createStudent(
        "kim.schulz@fh-bielefeld.de",
        new Date( '1994-04-11T03:24:00' ),
        "Kim",
        "Schulz",
        "01784239617",
        "",
        "DIVERSE",
        infMaster.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 )
    );

    const admin1 = await createAdministrative(
        "dennis-eller@gmx.net",
        new Date( '1994-04-11T03:24:00' ),
        "Dennis",
        "Admin",
        "01784239617",
        "",
        "DIVERSE",
        infMaster.id );




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





    console.log( "Finished db init" );
}

//TODO
//test();

async function createDepartments() {
    const department = await prisma.department.create( {
        data: {
            name: "Campus Minden",
            description: "Campus in Minden"
        }
    } )
}

async function createLecturer( mail: string,
    birthdate: Date,
    firstname: string,
    lastname: string,
    phone: string,
    title: string,
    gender: string,
    departmentId: number ) {
    const fbProfInfMaster1 = await adminApp.auth().createUser( {
        email: mail,
        password: "123456",
        displayName: firstname + " " + lastname
    } );
    return await prisma.lecturer.create( {
        data: {
            active: true,
            birthdate: birthdate,
            firstname: firstname,
            gender: get( gender ),
            lastname: lastname,
            mail: mail,
            title: title,
            phone: phone,
            departmentId: departmentId,
            id: fbProfInfMaster1.uid
        }
    } )
    function test( gender: string ): gender is ( "MALE" | "FEMALE" ) {
        if ( gender === "MALE" ) { return true; }
        if ( gender === "FEMALE" ) { return true; }
        if ( gender === "DIVERSE" ) { return true; }
        return false;
    }

    function get( gender: string ) {
        if ( gender === "MALE" ) { return gender; }
        if ( gender === "FEMALE" ) { return gender; }
        if ( gender === "DIVERSE" ) { return gender; }
        throw new Error( "Unknown Gender" );
    }
}

async function createStudent( mail: string,
    birthdate: Date,
    firstname: string,
    lastname: string,
    phone: string,
    title: string,
    gender: string,
    courseId: number,
    matriculationNumber: string,
    semester: number ) {


    const fbStudent = await adminApp.auth().createUser( {
        email: mail,
        password: "123456",
        displayName: firstname + " " + lastname
    } );

    return await prisma.student.create( {
        data: {
            active: true,
            birthdate: birthdate,
            firstname: firstname,
            gender: get( gender ),
            lastname: lastname,
            mail: mail,
            title: title,
            phone: phone,
            courseId: courseId,
            id: fbStudent.uid,
            matriculationNumber: matriculationNumber,
            semester: semester,
        }
    } )


}

async function createAdministrative( mail: string,
    birthdate: Date,
    firstname: string,
    lastname: string,
    phone: string,
    title: string,
    gender: string,
    courseId: number ) {
    const fbAdministrative = await adminApp.auth().createUser( {
        email: mail,
        password: "123456",
        displayName: firstname + " " + lastname
    } );
    return await prisma.administrative.create( {
        data: {
            active: true,
            birthdate: birthdate,
            firstname: firstname,
            gender: get( gender ),
            lastname: lastname,
            mail: mail,
            title: title,
            phone: phone,
            id: fbAdministrative.uid
        }
    } )
}


function get( gender: string ) {
    if ( gender === "MALE" ) { return gender; }
    if ( gender === "FEMALE" ) { return gender; }
    if ( gender === "DIVERSE" ) { return gender; }
    throw new Error( "Unknown Gender" );
}
//db.main();

