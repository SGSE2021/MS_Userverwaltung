import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { Gender } from '@common/dto/gender.enum';
import { StudentDTO } from '@common/dto/student.dto';
import { DataService } from 'src/app/services/data/data.service';
import { StudentsService } from 'src/app/services/students/students.service';
import { EventEmitter } from '@angular/core';
import { LecturerTableComponent } from '../lecturer-table/lecturer-table.component';
import { LecturerService } from 'src/app/services/lecturers/lecturer-service.service';
import { LecturerDTO } from '@common/dto/lecturer.dto';

@Component({
  selector: 'create-student',
  templateUrl: './create-lecturer.component.html',
  styleUrls: ['./create-lecturer.component.css']
})
export class CreateLecturerComponent implements OnInit {

  public newLecturer:LecturerDTO|null={
    active:true,
    birthdate:new Date(),
    firstname:"",
    gender:Gender.MALE,
    lastname:"",
    mail:"",
    phone:"",
    title:"",
    id:"",
    department:null
  };

  departmentPool :DepartmentPoolDTO[] | null = [];

  @Output()
  newLecturerEvent:EventEmitter<LecturerDTO> = new EventEmitter();
  @ViewChild('table') lecturerForm?: LecturerTableComponent
  constructor(
    public dialogRef: MatDialogRef<CreateLecturerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dataService:DataService,
    private lecturerService:LecturerService
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

  public createLecturer(){
    if(!this. lecturerForm?.lecturerForm.value){ return; }
    this.lecturerService.createLecturer(this.lecturerForm.lecturerForm.value).subscribe((lecturer)=>{
      this.newLecturerEvent.emit(lecturer);
    })
  }
}

export interface DialogData {
  animal: string;
  name: string;
}