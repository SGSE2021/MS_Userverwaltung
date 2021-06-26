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


let STUDENT_DATA: StudentPreviewDTO[];

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css'],
})
export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'title','lastname','firstname','matriculationNumber','studyCourse','degree','department'];
  dataSource = STUDENT_DATA;
  clickedRow :StudentDTO | null=null;

  constructor(private httpClient:HttpClient, public dialog:MatDialog) { }

  async ngOnInit(): Promise<void> {
    const observer = await this.httpClient.get<Student[]>("http://localhost:8080/students").subscribe(students=>{

    this.dataSource = students;
 
    this.dataSource.push(...JSON.parse(JSON.stringify(this.dataSource.slice(0))));
    this.dataSource[0].id="12";
      console.log(students);
    });

    //STUDENT_DATA = response; 
    console.log(observer);


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

}