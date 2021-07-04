import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentTableComponent } from '../../manage-students/components/student-table/student-table/student-table.component';

@Component({
  selector: 'app-change-passwort',
  templateUrl: './change-passwort.component.html',
  styleUrls: ['./change-passwort.component.css']
})
export class ChangePasswortComponent implements OnInit {
  @ViewChild('table') studentForm?: StudentTableComponent

  public additionalForm = new FormGroup({
    oldPassword: new FormControl('',[Validators.required]),
    newPassword: new FormControl('',[Validators.required]),
    newPasswordConfirmation: new FormControl('',[Validators.required]),
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
