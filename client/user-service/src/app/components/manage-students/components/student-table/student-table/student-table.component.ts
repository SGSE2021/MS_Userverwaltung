import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '@common/dto/gender.enum';
import { StudentDTO } from '@common/dto/student.dto';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { EventEmitter } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit, OnChanges {
  @Input() 
  student:StudentDTO | null | undefined =null;
  @Input()
  departmentPool:DepartmentPoolDTO[] | null= null;
  @Output()
  studentChanged = new EventEmitter<StudentDTO>();

  gender  = JSON.parse(JSON.stringify(Gender));

  public studentForm = new FormGroup({
    title: new FormControl('',[]),
    gender: new FormControl('',[Validators.required]),
    birthdate: new FormControl('',[Validators.required]),
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    matriculationNumber: new FormControl('',[Validators.required]),
    course: new FormGroup({
      id: new FormControl('',Validators.required)
    }),
    phone: new FormControl('',[Validators.required]),
    mail: new FormControl('',[Validators.required,Validators.email])
  });

  selectedDep: number=65;
  constructor() { }



  ngOnInit(): void {

  }
  ngOnChanges( changes: SimpleChanges ): void {
    if (changes && changes.student && this.student) {
        const {course,...patchStudent} = this.student;
        this.studentForm.patchValue(patchStudent);

        console.log("SELECTED DEP "+this.selectedDep);
        this.selectedDep=this.student.course!.department.id;

        console.log("SELECTED DEP "+this.selectedDep);
          }
  }


  getCourses(departmentId:number) {
    console.log('courses for departmentid ' + departmentId);
    console.log(this.departmentPool);

    return this.departmentPool?.find(x => x.id === departmentId)?.studyCourses;
  }
 


}
