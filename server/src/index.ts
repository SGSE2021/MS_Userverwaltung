import { exit } from "process";
import prisma from "./database"
import { RestServer } from "./server";
import "./databaseInitiator";

import { StudentsRoute as ExternalStudensRoute } from "./rest-server-client/routes/students.route";
import { DepartmentsRoute as ExternalDepartmentsRoute } from "./rest-server-client/routes/departments.route";
import { LecturersRoute as ExternalLecturersRoute } from "./rest-server-client/routes/lecturers.route";
import { AuthRoute as ExternalAuthRoute } from "./rest-server-client/routes/auth.route";

import { StudentsRoute as InternalStudensRoute } from "./rest-server-ms/routes/students.route";
import { DepartmentsRoute as InternalDepartmentsRoute } from "./rest-server-ms/routes/departments.route";
import { LecturersRoute as InternalLecturerRoute } from "./rest-server-ms/routes/lecturers.route";
import { AdministrativeRoute as InternalAdministrativeRoute } from "./rest-server-ms/routes/administrative.route";





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
    new InternalLecturerRoute(),
    new InternalAdministrativeRoute()
] );


async function main() {
    await prisma.$connect();
    restServerClient.start( portClient );
    restServerMs.start( portMs );

    // const messenger = new Messenger();
    // messenger.send("test","Hallo");
}

main().catch( ( e ) => {
    console.log( e );
    prisma.$disconnect();
    //exit( 1 );
} );

// import * as Amqp from "amqp-ts";

// export class Messenger {
//     public send(type: string, message: any) {
//         console.log("send invoked")
//         const connection = new Amqp.Connection("asdasdasdasddas");
//         const exchange = connection.declareExchange("userservice", "fanout");
//         console.log("starting configuration");
//         connection.completeConfiguration().then(() => {
//             console.log("222222222222");
//             const msg = new Amqp.Message(message, {
//                 type: type,
//                 appId: 'parkplatz'
//             });
//             exchange.send(msg);
//             console.log("3333333333333333");
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }
// }




