import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '@common/dto/gender.enum';
import { StudentDTO } from '@common/dto/student.dto';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { EventEmitter } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { StudyCourseDTO } from '@common/dto/study-course.dto';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lecturers-table',
  templateUrl: './lecturer-table.component.html',
  styleUrls: ['./lecturer-table.component.css']
})
export class LecturerTableComponent implements OnInit, OnChanges {
  @Input() 
  student:StudentDTO | null | undefined =null;
  @Input()
  departmentPool:DepartmentPoolDTO[] | null= null;

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
    phone: new FormControl('',[]),
    mail: new FormControl('',[Validators.required,Validators.email]),
    semester: new FormControl('',[Validators.required]),
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
    this.studentForm.valueChanges.subscribe((student)=>{
      console.log("form cahngedS")
      console.log(student);
      this.currentCourseList = this.getCourses(this.selectedDep.getValue());
      this.selectedDepId = this.selectedDep.getValue();
    })
  }
  ngOnChanges( changes: SimpleChanges ): void {
    if (changes && changes.student && this.student) {
        console.log(this.student);
        const {course,...patchStudent} = this.student;
        //this.studentForm.patchValue(patchStudent);
         this.studentForm.patchValue(this.student);
         if(this.student.course){
         this.selectedDep.next(this.student.course.department.id);
         this.selectedCourse = this.student.course.id;
         this.currentCourseList = this.getCourses(this.selectedDep.getValue());
        }
        // this.selectedDep=this.student.course!.department.id;
        // this.selectedCourse = this.student.course!.id;


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
    this.studentForm.patchValue({course:{id:-1}});
    this.selectedCourse = -1;
  }


  public handleStudyCourseChange(newCourseId:number){
    this.selectedCourse =newCourseId;
    this.studentForm.patchValue({course:{id:newCourseId}});
  }
 

  get invalid(){
    console.log(this.studentForm?.invalid || this.selectedCourse == -1);
    return this.studentForm?.invalid || this.selectedCourse == -1;
  }
  
  

}
