import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '@common/dto/gender.enum';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { EventEmitter } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { StudyCourseDTO } from '@common/dto/study-course.dto';
import { BehaviorSubject } from 'rxjs';
import { LecturerService } from 'src/app/services/lecturers/lecturer-service.service';
import { LecturerDTO } from '@common/dto/lecturer.dto';

@Component({
  selector: 'app-lecturer-table',
  templateUrl: './lecturer-table.component.html',
  styleUrls: ['./lecturer-table.component.css']
})
export class LecturerTableComponent implements OnInit, OnChanges {
  @Input() 
  lecturer:LecturerDTO | null | undefined =null;
  @Input()
  departmentPool:DepartmentPoolDTO[] | null= null;

  gender  = JSON.parse(JSON.stringify(Gender));

  public lecturerForm = new FormGroup({
    title: new FormControl('',[]),
    gender: new FormControl('',[Validators.required]),
    birthdate: new FormControl('',[Validators.required]),
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    department: new FormGroup({
      id: new FormControl('',Validators.required)
    }),
    phone: new FormControl('',[]),
    mail: new FormControl('',[Validators.required,Validators.email]),
    active: new FormControl('',[Validators.required])
  });

  //selectedDep: number=-1;
  selectedCourse: number=-1;
  currentCourseList? :StudyCourseDTO[]=[];

  selectedDep= new BehaviorSubject<number>(-1);
  selectedDepId : number =-1;



  constructor() { }



  ngOnInit(): void {
    console.log("ng INit");
    this.lecturerForm.valueChanges.subscribe((lecturer)=>{
      console.log("form cahngedS")
      console.log(lecturer);
      this.currentCourseList = this.getCourses(this.selectedDep.getValue());
      this.selectedDepId = this.selectedDep.getValue();
    })
  }
  ngOnChanges( changes: SimpleChanges ): void {
    if (changes && changes.lecturer && this.lecturer) {
        console.log(this.lecturer);
         this.lecturerForm.patchValue(this.lecturer);
         if(this.lecturer.department){
         this.selectedDep.next(this.lecturer.department.id);
         this.currentCourseList = this.getCourses(this.selectedDep.getValue());
        }

        this.selectedDepId = this.selectedDep.getValue();
        console.log("SELECTED DEP "+this.selectedDep.getValue());
        console.log("SELECTED course "+this.selectedCourse);
          }
  }


  getCourses(departmentId:number) {
    console.log('courses for departmentid ' + departmentId);
    console.log(this.departmentPool);

    return this.departmentPool?.find(x => x.id === departmentId)?.studyCourses;
  }


  public handleValueChange(newDepartmentId:number){
    this.selectedDep.next(newDepartmentId);
    this.currentCourseList = this.getCourses(this.selectedDep.getValue());
    this.lecturerForm.patchValue({course:{id:-1}});
    this.selectedCourse = -1;
  }


  public handleStudyCourseChange(newCourseId:number){
    this.selectedCourse =newCourseId;
    this.lecturerForm.patchValue({course:{id:newCourseId}});
  }
 

  // get invalid(){
  //   console.log(this.lecturerForm?.invalid || this.selectedCourse == -1);
  //   return this.lecturerForm?.invalid || this.selectedCourse == -1;
  // }
  
  

}
