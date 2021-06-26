import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {StudentPreviewDTO} from "@common/dto/student-preview.dto"
import {StudentDTO} from "@common/dto/student.dto"
import {Gender} from "@common/dto/gender.enum"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Student} from "../../../../../../database/node_modules/prisma/prisma-client"


let STUDENT_DATA: StudentPreviewDTO[];

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'firstname', 'lastname'];
  dataSource = STUDENT_DATA;
  clickedRow :StudentDTO | undefined;
  gender  = JSON.parse(JSON.stringify(Gender));
  

  public dataForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    studyCourse: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    mail: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    birthday: new FormControl('',Validators.required),
    department: new FormControl('',Validators.required),
    matriculationNumber: new FormControl('',Validators.required)
  });
  constructor(private httpClient:HttpClient) { }

  async ngOnInit(): Promise<void> {
    console.log(this.gender);
    const observer = await this.httpClient.get<Student[]>("http://localhost:8080/students").subscribe(students=>{
    //students[0].  
    this.dataSource = students;
      console.log(students);
    });

    //STUDENT_DATA = response; 
    console.log(observer);
  }

  public log(a:unknown){
    console.log(a);
     
  }

}