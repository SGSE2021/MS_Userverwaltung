import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getDepartmentPool(){
    return this.httpClient.get<DepartmentPoolDTO[]>("http://localhost:8080/departments");
  }




}
