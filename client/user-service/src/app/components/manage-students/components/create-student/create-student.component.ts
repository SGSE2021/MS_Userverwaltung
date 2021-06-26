import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gender } from '@common/dto/gender.enum';
import { StudentDTO } from '@common/dto/student.dto';

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
    studyCourse:null,
    title:""
  };
  constructor(
    public dialogRef: MatDialogRef<CreateStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  animal: string;
  name: string;
}