import {StudentsRoute} from "../src/rest-server-client/routes/students.route"
import {RestServer}from "../src/server"
import request from "supertest"

const testServer = new RestServer([new StudentsRoute()]);

describe("Test API",()=>{

    describe("GET /movies",()=>{

    it("should return all movies on GET /movies",async ()=>{  
        const test = await request(testServer.app).get("/students");
        expect(test.statusCode).toEqual(200);
        })


    })
    
})

