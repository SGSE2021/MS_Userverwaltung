import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { Gender } from '@common/dto/gender.enum';
import { StudentDTO } from '@common/dto/student.dto';
import { DataService } from 'src/app/services/data/data.service';
import { StudentsService } from 'src/app/services/students/students.service';
import { EventEmitter } from '@angular/core';
import { StudentTableComponent } from '../student-table/student-table/student-table.component';


@Component({
  selector: 'create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  public newStudent:StudentDTO|null={
    active:true,
    birthdate:new Date(),
    firstname:"",
    gender:Gender.MALE,
    lastname:"",
    mail:"",
    matriculationNumber:"",
    phone:"",
    course:null,
    title:"",
    semester:1,
    id:""
  };

  departmentPool :DepartmentPoolDTO[] | null = [];

  @Output()
  newStudentEvent:EventEmitter<StudentDTO> = new EventEmitter();
  @ViewChild('table') studentForm?: StudentTableComponent
  constructor(
    public dialogRef: MatDialogRef<CreateStudentComponent>,
    public dataService:DataService,
    private studentService:StudentsService
  ) { }

  async ngOnInit() {
    const response = await this.dataService.getDepartmentPool();
    response.subscribe((pool)=>{
      this.departmentPool= pool;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public createStudent(){
    if(!this. studentForm?.studentForm.value){ return; }
    this.studentService.createStudent(this.studentForm.studentForm.value).subscribe((student)=>{
      this.newStudentEvent.emit(student);
    })
  }
}
