import {StudentsRoute} from "../src/rest-server-client/routes/students.route"
import {RestServer}from "../src/server"
import request from "supertest"



describe("Test API",()=>{

    const studentsApiRoute ="/students";
    describe(`GET ${studentsApiRoute}`,()=>{

    it(`should return all Students on GET ${studentsApiRoute}`,async ()=>{  
        const studentsRoute = new StudentsRoute();
        const usersService = studentsRoute.studentsController.studentsService.getAllStudents= jest.fn().mockReturnValue([
            {
                id: "5ujfBWeRemQEguNbFFdXNpM7Kyt2",
                active: true,
                firstname: "Dennis",
                lastname: "Eller",
                matriculationNumber: "452750",
                course: {
                  id: 4,
                  name: "Informatik",
                  code: "MINF",
                  degree: "Master",
                  departmentId: 9,
                  department: {
                    id: 9,
                    name: "Campus Minden",
                    description: "Campus in Minden"
                  }
                },
                birthdate: "1996-08-18T03:24:00.000Z",
                gender: "MALE",
                mail: "dennis.eller@ilias20.de",
                title: "",
                phone: "01784239664",
                semester: 6
              }
        ])
        const testServer = new RestServer([studentsRoute],"");
        const test = await request(testServer.app).get(studentsApiRoute);
        expect(test.statusCode).toEqual(200);
        })


    })
    
})

