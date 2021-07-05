import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LecturerDTO } from '@common/dto/lecturer.dto';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class LecturerService {

  constructor( private httpClient: HttpClient ) {

  }
  updateLecturer( uuid: string, lecturer: LecturerDTO ) {
    return this.httpClient.put<LecturerDTO>( `${environment.restApi}/${ uuid }`, lecturer );
  }

  createLecturer( lecturer: LecturerDTO ) {
    return this.httpClient.post<LecturerDTO>( `${environment.restApi}/lecturers`, lecturer );
  }

  deleteLecturer( uuid: string ) {
    return this.httpClient.delete<LecturerDTO>( `${environment.restApi}/lecturers/${ uuid }` );
  }

  getLecturerById( uuid: string ) {
    return this.httpClient.get<LecturerDTO>( `${environment.restApi}/lecturers/${ uuid }` );
  }

  getAllLecturers() {
    return this.httpClient.get<LecturerDTO[]>( `${environment.restApi}/lecturers` );
  }
}
