import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LecturerDTO } from '@common/dto/lecturer.dto';

@Injectable( {
  providedIn: 'root'
} )
export class LecturerService {

  constructor( private httpClient: HttpClient ) {

  }
  updateLecturer( uuid: string, lecturer: LecturerDTO ) {
    return this.httpClient.put<LecturerDTO>( `http://localhost:8080/lecturers/${ uuid }`, lecturer );
  }

  createLecturer( lecturer: LecturerDTO ) {
    return this.httpClient.post<LecturerDTO>( `http://localhost:8080/lecturers`, lecturer );
  }

  deleteLecturer( uuid: string ) {
    return this.httpClient.delete<LecturerDTO>( `http://localhost:8080/lecturers/${ uuid }` );
  }

  getLecturerById( uuid: string ) {
    return this.httpClient.get<LecturerDTO>( `http://localhost:8080/lecturers/${ uuid }` );
  }

  getAllLecturers() {
    return this.httpClient.get<LecturerDTO[]>( `http://localhost:8080/lecturers` );
  }
}
