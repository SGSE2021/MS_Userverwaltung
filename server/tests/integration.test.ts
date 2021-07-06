import {StudentsRoute} from "../src/rest-server-client/routes/students.route"
import {RestServer}from "../src/server"
import request from "supertest"

const testServer = new RestServer([new StudentsRoute()]);

describe("Test API",()=>{

    const studentsRoute ="/students";
    describe(`GET ${studentsRoute}`,()=>{

    it(`should return all Students on GET ${studentsRoute}`,async ()=>{  
        const test = await request(testServer.app).get(studentsRoute);
        expect(test.statusCode).toEqual(200);
        })


    })
    
})

