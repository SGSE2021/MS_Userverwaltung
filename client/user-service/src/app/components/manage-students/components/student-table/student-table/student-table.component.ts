import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '@common/dto/gender.enum';
import { StudentDTO } from '@common/dto/student.dto';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  @Input() 
  student:StudentDTO | null =null;
  @Input()
  departmentPool:DepartmentPoolDTO[] | null= null;
  pageLoaded = false;
  gender  = JSON.parse(JSON.stringify(Gender));
  public studentForm = new FormGroup({
    title: new FormControl('',[]),
    gender: new FormControl('',[Validators.required]),
    birthdate: new FormControl('',[Validators.required]),
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    matriculationNumber: new FormControl('',[Validators.required]),
    department: new FormControl('',Validators.required),
    course: new FormControl('',Validators.required),
    studyCourseDegree: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required]),
    mail: new FormControl('',[Validators.required,Validators.email])
  });
  constructor() { }

  ngOnInit(): void {
    this.studentForm.statusChanges.subscribe((status)=>{
      console.log(status)
    })
  }



}
