import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentDTO } from '@common/dto/student.dto';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class StudentsService {

  constructor( private httpClient: HttpClient ) {

  }
  updateStudent( uuid: string, student: StudentDTO ) {
    return this.httpClient.put<StudentDTO>( `${environment.restApi}/students/${ uuid }`, student );
  }

  createStudent( student: StudentDTO ) {
    return this.httpClient.post<StudentDTO>( `${environment.restApi}/students`, student );
  }

  deleteStudent( uuid: string ) {
    return this.httpClient.delete<StudentDTO>( `${environment.restApi}/students/${ uuid }` );
  }

  getStudentById( uuid: string ) {
    return this.httpClient.get<StudentDTO>( `${environment.restApi}/students/${ uuid }` );
  }

  getAllStudents() {
    return this.httpClient.get<StudentDTO[]>( `${environment.restApi}/students` );
  }
}
