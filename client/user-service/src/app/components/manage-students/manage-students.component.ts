import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {StudentPreviewDTO} from "@common/dto/student-preview.dto"
import {StudentDTO} from "@common/dto/student.dto"
import {Gender} from "@common/dto/gender.enum"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Student} from "../../../../../../database/node_modules/prisma/prisma-client"
import { formatCurrency } from '@angular/common';
import { StudentTableComponent } from './components/student-table/student-table/student-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { DepartmentDTO } from '@common/dto/department.dto';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';


@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css'],
})



export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'title','lastname','firstname','matriculationNumber','course','degree','department'];
  dataSource : StudentDTO[] = [];
  selectedStudentId: string | null = null;
  departmentPool: DepartmentPoolDTO[]=[];




  constructor(private httpClient:HttpClient, public dialog:MatDialog) { }

  async ngOnInit(): Promise<void> {
    const observer = await this.httpClient.get<StudentDTO[]>("http://localhost:8080/students").subscribe(students=>{
    this.dataSource = students;
    console.log(students);
    });
    const departmentObserver = await this.httpClient.get<DepartmentPoolDTO[]>("http://localhost:8080/departments").subscribe(departments=>{
    this.departmentPool = departments;
    console.log(this.departmentPool);
    });

    //STUDENT_DATA = response; 



  }

  public log(l:unknown){
    console.log(l);
  }
  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open(CreateStudentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



 get selectedStudent() {
  return this.selectedStudentId
    ? this.dataSource.find(student => student.id === this.selectedStudentId)
    : null;
}

onStudentChanged(id:string| undefined, data:StudentDTO) {
  this.dataSource = this.dataSource.map(student =>
    student.id === id ? { ...student, ...data } : student
  );
}
 


}