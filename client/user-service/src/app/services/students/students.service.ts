import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentDTO } from '@common/dto/student.dto';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { 
    
  }
  updateStudent(uuid:string, student:StudentDTO){
    return this.httpClient.put<StudentDTO>(`http://localhost:8080/students/${uuid}`,student);
  }

  createStudent(student:StudentDTO){
    return this.httpClient.post<StudentDTO>(`http://localhost:8080/students`,student);
  }

  deleteStudent(uuid:string){
    return this.httpClient.delete<StudentDTO>(`http://localhost:8080/students/${uuid}`);
  }

  getStudentById(uuid:string){
    return this.httpClient.get<StudentDTO>(`http://localhost:8080/students/${uuid}`);
  }

  getAllStudents(){
    return this.httpClient.get<StudentDTO[]>(`http://localhost:8080/students`);
  }
}
