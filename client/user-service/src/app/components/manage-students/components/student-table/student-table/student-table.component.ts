import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '@common/dto/gender.enum';
import { StudentDTO } from '@common/dto/student.dto';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { EventEmitter } from '@angular/core';

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
    department: new FormControl('',Validators.required),
    course: new FormControl('',Validators.required),
    studyCourseDegree: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required]),
    mail: new FormControl('',[Validators.required,Validators.email])
  });
  constructor() { }



  ngOnInit(): void {
    this.studentForm.valueChanges.subscribe((student)=>{
      if(this.student){
      this.studentChanged.emit(student);
    }
    })
  }
  ngOnChanges( changes: SimpleChanges ): void {
    if (changes && changes.student && this.student) {
        this.studentForm.patchValue(this.student);
    }
  }
 


}
