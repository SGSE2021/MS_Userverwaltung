import prisma from "./database"
import { RestServer } from "./server";
import "./databaseInitiator";

import { StudentsRoute as ExternalStudensRoute } from "./rest-server-client/routes/students.route";
import { DepartmentsRoute as ExternalDepartmentsRoute } from "./rest-server-client/routes/departments.route";
import { LecturersRoute as ExternalLecturersRoute } from "./rest-server-client/routes/lecturers.route";
import { AuthRoute as ExternalAuthRoute } from "./rest-server-client/routes/auth.route";
import { MaintenanceRoute as ExternalMaintenanceRoute } from "./rest-server-client/routes/maintenance.route";

import { StudentsRoute as InternalStudensRoute } from "./rest-server-ms/routes/students.route";
import { DepartmentsRoute as InternalDepartmentsRoute } from "./rest-server-ms/routes/departments.route";
import { LecturersRoute as InternalLecturerRoute } from "./rest-server-ms/routes/lecturers.route";
import { AdministrativeRoute as InternalAdministrativeRoute } from "./rest-server-ms/routes/administrative.route";
import { StudycourseRoute as InternalStudycoursesRoute } from "./rest-server-ms/routes/studycourses.route";

import { RabbitReceiver } from "./rabbitmq-client/rabbit.receiver";

process.env.standardpassword="123456";
try {
    const rabbitReceiver = new RabbitReceiver("users-new-student",(queue,message)=>{
        console.log(queue,message)
        });
        
} catch (error) {
    console.log("Rabbit Receiver. Couldn't connect to RabbitMQ from Index")
}


const portClient = process.env.INTERNAL_PORT || 8080;
const restServerClient = new RestServer( [
    new ExternalStudensRoute(),
    new ExternalDepartmentsRoute(),
    new ExternalLecturersRoute(),
    new ExternalAuthRoute(),
    new ExternalMaintenanceRoute(),
    new InternalStudycoursesRoute()
],
"external-api.yml" );

const portMs = process.env.EXTERNAL_PORT || 8181;
const restServerMs = new RestServer( [
    new InternalStudensRoute(),
    new InternalDepartmentsRoute(),
    new InternalLecturerRoute(),
    new InternalAdministrativeRoute()
],
"internal-api.yml" );


async function main() {
    await prisma.$connect();
    restServerClient.start( portClient );
    restServerMs.start( portMs );
}

main().catch( ( e ) => {
    console.log( e );
    prisma.$disconnect();
} );