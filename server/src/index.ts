import { exit } from "process";
import prisma from "./database"
import { StudentsRoute as ExternalStudensRoute } from "./rest-server-client/routes/students.route";
import { DepartmentsRoute as ExternalDepartmentsRoute } from "./rest-server-client/routes/departments.route";
import { LecturersRoute as ExternalLecturersRoute } from "./rest-server-client/routes/lecturers.route";
import {  AuthRoute as ExternalAuthRoute } from "./rest-server-client/routes/auth.route";

import { StudentsRoute as InternalStudensRoute } from "./rest-server-ms/routes/students.route";
import { DepartmentsRoute as InternalDepartmentsRoute } from "./rest-server-ms/routes/departments.route";
import { LecturersRoute as InternalLecturerRoute} from "./rest-server-ms/routes/lecturers.route";
import { RestServer } from "./server";

import "./databaseInitiator";




const portClient = 8080;
const restServerClient = new RestServer( [
    new ExternalStudensRoute(),
    new ExternalDepartmentsRoute(),
    new ExternalLecturersRoute(),
    new ExternalAuthRoute()
] );

const portMs = 8181;
const restServerMs = new RestServer( [
    new InternalStudensRoute(),
    new InternalDepartmentsRoute(),
    new InternalLecturerRoute()
] );


async function main() {
    await prisma.$connect();
    restServerClient.start( portClient );
    restServerMs.start( portMs );
}

main().catch( ( e ) => {
    console.log( e );
    prisma.$disconnect();
    exit( 1 );
} );