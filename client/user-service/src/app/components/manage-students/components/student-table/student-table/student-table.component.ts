import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '@common/dto/gender.enum';
import { StudentDTO } from '@common/dto/student.dto';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  @Input() 
  student:StudentDTO | null =null;
  @Output()
  isValid= false;
  gender  = JSON.parse(JSON.stringify(Gender));
  public studentForm = new FormGroup({
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    //studyCourse: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required]),
    mail: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),
    birthday: new FormControl('',[Validators.required]),
    department: new FormControl('',[Validators.required]),
    matriculationNumber: new FormControl('',[Validators.required])
  });
  constructor() { }

  ngOnInit(): void {
  }

}
