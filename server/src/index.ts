import { exit } from "process";
import prisma from "./database"
import StudentsRoute from "./rest-server-client/routes/students.route";
import { RestServerClient } from "./rest-server-client/server";

const port = 8080; // default port to listen
const restServerClient = new RestServerClient([new StudentsRoute()]);


async function main(){
    await prisma.$connect();
    restServerClient.start(port);
}

main().catch((e)=>{
    console.log(e);
    prisma.$disconnect();
    exit(1);
});