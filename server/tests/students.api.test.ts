import { StudentsRoute } from "../src/rest-server-client/routes/students.route"
import { RestServer } from "../src/server"
import request from "supertest"
import { mockStudent } from "./mockStudent"
import { mockAddStudent } from "./mockAddStudent"
import { StudentDTO } from "../../common/dto/student.dto"
import { HttpException } from "../src/common/exceptionTypes/httpException"


describe( "Test Students API", () => {

  const studentsApiRoute = "/students";
  describe( `GET ${ studentsApiRoute }`, () => {

    it( `S1 Positive: should add a student ${ studentsApiRoute }`, async () => {
      const requestBody = mockAddStudent;
      const studentsRoute = new StudentsRoute();
      const usersService = studentsRoute.studentsController.studentsService.addStudent = jest.fn().mockReturnValue( mockStudent )
      const testServer = new RestServer( [studentsRoute], "" );
      const response = await request( testServer.app ).post( studentsApiRoute ).send(requestBody);
      expect( response.statusCode ).toEqual( 200 );
      const student:StudentDTO = response.body;
      expect(student.firstname).toBe("Dennis");
      expect(student.lastname).toBe("Eller");
      expect(student.id).not.toBe("");
    } )

    it( `S1 Negative: should not add a student ${ studentsApiRoute }`, async () => {
      const requestBody = mockAddStudent;
      mockAddStudent.firstname="";
      const studentsRoute = new StudentsRoute();
      const usersService = studentsRoute.studentsController.studentsService.addStudent = jest.fn().mockImplementation(() =>{
        throw new HttpException(400,"firstname is empty");
      } )
      const testServer = new RestServer( [studentsRoute], "" );
      const response = await request( testServer.app ).post( studentsApiRoute ).send(requestBody);
      const student:StudentDTO = response.body;

      expect( response.statusCode ).toEqual( 400 );
      expect( response.body.message ).toBe("firstname is empty");
    } )


    it( `S2 Positive: should remove one Student on DELETE ${ studentsApiRoute }`, async () => {
      const studentsRoute = new StudentsRoute();
      const usersService = studentsRoute.studentsController.studentsService.deleteStudentById = jest.fn().mockReturnValue( null )
      const testServer = new RestServer( [studentsRoute], "" );
      const reponse = await request( testServer.app ).delete( studentsApiRoute + '/' + mockStudent.id );
      expect( reponse.statusCode ).toEqual( 204 );
    } )

    it( `S2 Negative: should remove one Student on DELETE ${ studentsApiRoute }`, async () => {
      const studentsRoute = new StudentsRoute();
      const usersService = studentsRoute.studentsController.studentsService.deleteStudentById = jest.fn().mockImplementation(() =>{
        throw new HttpException(400,"Student not found");
      } )
      const testServer = new RestServer( [studentsRoute], "" );
      const response = await request( testServer.app ).delete( studentsApiRoute + '/' + -10 );
      expect( response.statusCode ).toEqual( 400 );
      expect( response.body.message ).toBe("Student not found");
    } )


    it( `S3 Positive: should return all Students on GET ${ studentsApiRoute }`, async () => {
      const studentsRoute = new StudentsRoute();
      const usersService = studentsRoute.studentsController.studentsService.getAllStudents = jest.fn().mockReturnValue( [mockStudent] )
      const testServer = new RestServer( [studentsRoute], "" );
      const reponse = await request( testServer.app ).get( studentsApiRoute );
      expect( reponse.statusCode ).toEqual( 200 );
    } )

    it( `S4: should return one Students on GET ${ studentsApiRoute }`, async () => {
      const studentsRoute = new StudentsRoute();
      const usersService = studentsRoute.studentsController.studentsService.getStudentById = jest.fn().mockReturnValue( mockStudent )
      const testServer = new RestServer( [studentsRoute], "" );
      const reponse = await request( testServer.app ).get( studentsApiRoute + '/' + mockStudent.id );
      expect( reponse.statusCode ).toEqual( 200 );
    } )

    it( `S5: should update one Students on PUT ${ studentsApiRoute }`, async () => {
      const studentsRoute = new StudentsRoute();
      const usersService = studentsRoute.studentsController.studentsService.getStudentById = jest.fn().mockReturnValue( mockStudent )
      const testServer = new RestServer( [studentsRoute], "" );
      const reponse = await request( testServer.app ).get( studentsApiRoute + '?name=Dennis');
      expect( reponse.statusCode ).toEqual( 200 );
    } )
  

    it( `S6: sshould return one Lecturers with search on GET ${ studentsApiRoute }`, async () => {
      const studentsRoute = new StudentsRoute();
      const usersService = studentsRoute.studentsController.studentsService.getStudentById = jest.fn().mockReturnValue( mockStudent )
      const testServer = new RestServer( [studentsRoute], "" );
      const reponse = await request( testServer.app ).get( studentsApiRoute + '/' + mockStudent.id );
      expect( reponse.statusCode ).toEqual( 200 );
    } )

 


  } )

} )

