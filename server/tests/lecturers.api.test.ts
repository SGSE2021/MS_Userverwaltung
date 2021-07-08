import { RestServer } from "../src/server"
import request from "supertest"
import { mockLecturer } from "./mockLecturer"
import { mockAddLecturer } from "./mockAddLecturer"
import { LecturerDTO } from "../../common/dto/lecturer.dto"
import { HttpException } from "../src/common/exceptionTypes/httpException"
import { LecturersRoute } from "../src/rest-server-client/routes/lecturers.route"


describe( "Test Lecturers API", () => {

  const lecturersApiRoute = "/lecturers";
  describe( `GET ${ lecturersApiRoute }`, () => {

    it( `L1 Positive: should add a lecturer ${ lecturersApiRoute }`, async () => {
      const requestBody = mockAddLecturer;
      const lecturersRoute = new LecturersRoute();
      const lecturersService = lecturersRoute.lecturerController.lecturerService.addLecturer = jest.fn().mockReturnValue( mockLecturer )
      const testServer = new RestServer( [lecturersRoute], "" );
      const response = await request( testServer.app ).post( lecturersApiRoute ).send( requestBody );
      expect( response.statusCode ).toEqual( 200 );
      const lecturer: LecturerDTO = response.body;
      expect( lecturer.firstname ).toBe( "Uwe" );
      expect( lecturer.lastname ).toBe( "Meier" );
      expect( lecturer.id ).not.toBe( "" );
    } )

    it( `L1 Negative: should not add a lecturer ${ lecturersApiRoute }`, async () => {
      const requestBody = mockLecturer;
      mockLecturer.firstname = "";
      const lecturerRoute = new LecturersRoute();
      const usersService = lecturerRoute.lecturerController.lecturerService.addLecturer = jest.fn().mockImplementation( () => {
        throw new HttpException( 400, "firstname is empty" );
      } )
      const testServer = new RestServer( [lecturerRoute], "" );
      const response = await request( testServer.app ).post( lecturersApiRoute ).send( requestBody );
      const lecturer: LecturerDTO = response.body;

      expect( response.statusCode ).toEqual( 400 );
      expect( response.body.message ).toBe( "firstname is empty" );
    } )


    it( `L2 Positive: should remove one lecturer on DELETE ${ lecturersApiRoute }`, async () => {
      const lecturersRoute = new LecturersRoute();
      const usersService = lecturersRoute.lecturerController.lecturerService.deleteLecturerById = jest.fn().mockReturnValue( null )
      const testServer = new RestServer( [lecturersRoute], "" );
      const reponse = await request( testServer.app ).delete( lecturersApiRoute + '/' + mockLecturer.id );
      expect( reponse.statusCode ).toEqual( 204 );
    } )

    it( `L2 Negative: should remove one Lecturer on DELETE ${ lecturersApiRoute }`, async () => {
      const lecturersRoute = new LecturersRoute();
      const lecturersService = lecturersRoute.lecturerController.lecturerService.deleteLecturerById = jest.fn().mockImplementation( () => {
        throw new HttpException( 400, "Lecturer not found" );
      } )
      const testServer = new RestServer( [lecturersRoute], "" );
      const response = await request( testServer.app ).delete( lecturersApiRoute + '/' + -10 );
      expect( response.statusCode ).toEqual( 400 );
      expect( response.body.message ).toBe( "Lecturer not found" );
    } )


    it( `L3 Positive: should return all Lecturers on GET ${ lecturersApiRoute }`, async () => {
      const lecturerRoute = new LecturersRoute();
      const usersService = lecturerRoute.lecturerController.lecturerService.getAllLecturers = jest.fn().mockReturnValue( [mockLecturer] )
      const testServer = new RestServer( [lecturerRoute], "" );
      const reponse = await request( testServer.app ).get( lecturersApiRoute );
      expect( reponse.statusCode ).toEqual( 200 );
    } )

    it( `L4: should return one Lecturers on GET ${ lecturersApiRoute }`, async () => {
      const lecturersRoute = new LecturersRoute();
      const lecturersService = lecturersRoute.lecturerController.lecturerService.getLecturerById = jest.fn().mockReturnValue( mockLecturer )
      const testServer = new RestServer( [lecturersRoute], "" );
      const reponse = await request( testServer.app ).get( lecturersApiRoute + '/' + mockLecturer.id );
      expect( reponse.statusCode ).toEqual( 200 );
    } )

    it( `L5: should return one Lecturers with search on GET ${ lecturersApiRoute }`, async () => {
      const lecturersRoute = new LecturersRoute();
      const lecturersService = lecturersRoute.lecturerController.lecturerService.getLecturerById = jest.fn().mockReturnValue( mockLecturer )
      const testServer = new RestServer( [lecturersRoute], "" );
      const reponse = await request( testServer.app ).get( lecturersApiRoute + '?name=Uwe' );
      expect( reponse.statusCode ).toEqual( 200 );
    } )

    it( `L6: should update one Lecturers on PUT ${ lecturersApiRoute }`, async () => {
      const lecturersRoute = new LecturersRoute();
      const lecturerService = lecturersRoute.lecturerController.lecturerService.getLecturerById = jest.fn().mockReturnValue( mockLecturer )
      const testServer = new RestServer( [lecturersRoute], "" );
      const reponse = await request( testServer.app ).get( lecturersApiRoute + '/' + mockLecturer.id );
      expect( reponse.statusCode ).toEqual( 200 );
    } )



  } )

} )

