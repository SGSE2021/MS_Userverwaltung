import prisma from "./database";
import { getRandomInt } from "./common/utils/getRandomInt";
import { adminApp } from "./common/services/firebase.service"

async function initDatabase() {
    console.log( "DatabaseInitiator: Starting db init" );

    console.log( "DatabaseInitiator: Creating Fachbereich Minden" );
    //Fachbereiche
    const campusMinden = await prisma.department.create( {
        data: {
            name: "Campus Minden",
            description: "Campus in Minden"
        }
    } )
    console.log( "DatabaseInitiator: Creating Master Informatik" );
    const infMaster = await prisma.studyCourse.create( {
        data: {
            name: "Informatik",
            degree: "Master",
            departmentId: campusMinden.id,
            code: "BINF"
        }
    } )
    console.log( "DatabaseInitiator: Creating Lecturers in Minden" );
    const mindenProf1 = await createLecturer(
        "hans.meier@ilias20.de",
        new Date( '1975-12-17T03:24:00' ),
        "Hans",
        "Meier",
        "01794233664",
        "Prof. Dr.",
        "MALE",
        campusMinden.id );

    const mindenProf2 = await createLecturer(
        "ulrike.martens@ilias20.de",
        new Date( '1985-08-18T03:24:00' ),
        "Ulrike",
        "Martens",
        "01785693664",
        "Prof. Dr.",
        "FEMALE",
        campusMinden.id );

    const mindenProf3 = await createLecturer(
        "Kim.Wald@ilias20.de",
        new Date( '1990-08-18T03:24:00' ),
        "Kim",
        "Wald",
        "01784239664",
        "Prof. Dr.",
        "DIVERSE",
        campusMinden.id );
    console.log( "DatabaseInitiator: Creating Students in Master Informatik" );
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


    console.log( "DatabaseInitiator: Creating Bachelor Informatik" );

    const infBachelor = await prisma.studyCourse.create( {
        data: {
            name: "Informatik",
            degree: "Bachelor",
            departmentId: campusMinden.id,
            code: "BINF"
        }
    } )

    console.log( "DatabaseInitiator: Creating Students in Bachelor Informatik" );

    const studentInfBachelor1 = await createStudent(
        "ole.gramit@ilias20.de",
        new Date( '1996-08-18T03:24:00' ),
        "Ole",
        "Gramit",
        "017842324123464",
        "",
        "MALE",
        infBachelor.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 ) );
    const studentInfBachelor2 = await createStudent(
        "jonas.posselt@ilias20.de",
        new Date( '1995-06-17T03:24:00' ),
        "Jonas",
        "POSSELT",
        "01784852464",
        "",
        "MALE",
        infBachelor.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 )
    );

    const studentInfBachelor3 = await createStudent(
        "kevin.schima@fh-bielefeld.de",
        new Date( '1994-04-11T03:24:00' ),
        "Kevin",
        "Schima",
        "01232146244",
        "",
        "MALE",
        infBachelor.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 )
    );

    console.log( "DatabaseInitiator: Creating Fachbereich fbIuM" );

    const fbIuM = await prisma.department.create( {
        data: {
            name: "IuM",
            description: "Ingenieurwissenschaften und Mathematik"
        }
    } )
    console.log( "DatabaseInitiator: Creating Bachelor Elektrotechnik" );
    const bachelorElektrotechnik = await prisma.studyCourse.create( {
        data: {
            name: "Elektrotechnik",
            degree: "Bachelor",
            departmentId: fbIuM.id,
            code: "BET"
        }
    } )
    console.log( "DatabaseInitiator: Creating Students in Bachelor Elektrotechnik" );

    const studentETBachelor1 = await createStudent(
        "malte.reinsch@ilias20.de",
        new Date( '1976-08-18T03:24:00' ),
        "Malte",
        "Reinsch",
        "017425324",
        "Dr.",
        "MALE",
        bachelorElektrotechnik.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 ) );
    const studentETBachelor2 = await createStudent(
        "tim.luecking@ilias20.de",
        new Date( '1995-07-15T03:24:00' ),
        "Tim",
        "Lücking",
        "014256834257",
        "",
        "MALE",
        bachelorElektrotechnik.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 )
    );

    const studentETBachelor3 = await createStudent(
        "jan.strutthoff@illias20.de",
        new Date( '1994-09-19T03:24:00' ),
        "Jan",
        "Strutthoff",
        "01794366997",
        "",
        "MALE",
        bachelorElektrotechnik.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 )
    );

    console.log( "DatabaseInitiator: Creating Master Elektrotechnik" );


    const masterElektrotechnik = await prisma.studyCourse.create( {
        data: {
            name: "Elektrotechnik",
            degree: "Master",
            departmentId: fbIuM.id,
            code: "MET"
        }
    } )
    console.log( "DatabaseInitiator: Creating Students in Master Elektrotechnik" );

    const studentETMaster1 = await createStudent(
        "leonie.bollweg@ilias20.de",
        new Date( '1976-08-18T03:24:00' ),
        "Leonie",
        "Bollweg",
        "017475624",
        "Dr.",
        "FEMALE",
        masterElektrotechnik.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 ) );
    const studentETMaster2 = await createStudent(
        "saskia.meier@ilias20.de",
        new Date( '1995-07-15T03:24:00' ),
        "Saskia",
        "Meier",
        "017416834257",
        "",
        "FEMALE",
        masterElektrotechnik.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 )
    );

    const studentETMaster3 = await createStudent(
        "kim.janzen@illias20.de",
        new Date( '1994-09-19T03:24:00' ),
        "Kim",
        "Janzen",
        "01794378997",
        "",
        "DIVERSE",
        masterElektrotechnik.id,
        getRandomInt( 1500000 ).toString(),
        getRandomInt( 7 )
    );


    console.log( "DatabaseInitiator: Creating Administratives" );

    const admin1 = await createAdministrative(
        "dennis-eller@gmx.net",
        new Date( '1994-04-11T03:24:00' ),
        "Dennis",
        "Admin",
        "01784239617",
        "",
        "DIVERSE" );



    console.log( "DatabaseInitiator: Finished db init" );
}

async function resetDatabase() {
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

    console.log( "DatabaseInitiator: Reset database" )

    const listUsersResult = await adminApp.auth().listUsers();
    console.log( "DatabaseInitiator: Firebase users: " + listUsersResult.users.length );

    //delete all users
    for ( const user of listUsersResult.users ) {
        await adminApp.auth().deleteUser( user.uid );
    }
    console.log( "DatabaseInitiator: Deleted all firebase users" );
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
            gender: parseGender( gender ),
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
    gender: string ) {
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
            gender: parseGender( gender ),
            lastname: lastname,
            mail: mail,
            title: title,
            phone: phone,
            id: fbAdministrative.uid
        }
    } )
}


function parseGender( gender: string ) {
    if ( gender === "MALE" ) { return gender; }
    if ( gender === "FEMALE" ) { return gender; }
    if ( gender === "DIVERSE" ) { return gender; }
    throw new Error( "Unknown Gender" );
}

export { initDatabase, resetDatabase }