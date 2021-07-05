import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getDepartmentPool(){
    return this.httpClient.get<DepartmentPoolDTO[]>(`${environment.restApi}/departments`);
  }




}
