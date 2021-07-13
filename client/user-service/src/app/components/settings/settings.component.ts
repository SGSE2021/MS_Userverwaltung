import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { StudentDTO } from "@common/dto/student.dto"
import { StudentTableComponent } from '../manage-students/components/student-table/student-table/student-table.component';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { StudentsService } from 'src/app/services/students/students.service';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LecturerDTO } from '@common/dto/lecturer.dto';
import { RoleDTO } from '@common/dto/role.enum';
import { LecturerService } from 'src/app/services/lecturers/lecturer-service.service';
import { LecturerTableComponent } from '../manage-lecturers/components/lecturer-table/lecturer-table.component';


@Component( {
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
} )
export class SettingsComponent implements OnInit {

  public student: StudentDTO | null = null;
  public lecturer: LecturerDTO | null = null;

  departmentPool: DepartmentPoolDTO[] | null = [];

  @Output()
  newStudentEvent: EventEmitter<StudentDTO> = new EventEmitter();
  @ViewChild( 'settingsTable' ) studentsTable?: StudentTableComponent
  @ViewChild( 'lecturerTable' ) lecturerTable?: LecturerTableComponent
  constructor(
    public dataService: DataService,
    private studentService: StudentsService,
    private lecturerService: LecturerService,
    public authService: AuthService
  ) { }

  async ngOnInit() {
    this.departmentPool = await this.dataService.getDepartmentPool().toPromise();
    console.log( this.authService.user.getValue().uid );
    if ( this.authService.user.getValue().role == RoleDTO.LECTURER ) {
      this.lecturer = await this.lecturerService.getLecturerById( this.authService.user.getValue().uid ).toPromise();

    } else {
      this.student = await this.studentService.getStudentById( this.authService.user.getValue().uid ).toPromise();
    }


  }
  get selectedStudent() {
    return this.student;
  }

  public submitLecturerChanges() {
    if ( !this.lecturer?.id ) { return }
    console.dir( "Sending lecturer", this.lecturerTable?.lecturerForm.value );
    this.lecturerService.updateLecturer( this.lecturer?.id, this.lecturerTable?.lecturerForm.value ).subscribe( ( student ) => {
      if ( !this.lecturer?.id ) { return; }
      this.lecturerService.getLecturerById( this.lecturer.id ).subscribe( ( lecturer ) => {
        this.lecturer = lecturer;
      } )
    } );

  }

  public submitStudentChanges() {
    if ( !this.student?.id ) { return }
    console.dir( "Sending student", this.studentsTable?.studentForm.value );
    this.studentService.updateStudent( this.student?.id, this.studentsTable?.studentForm.value ).subscribe( ( student ) => {
      if ( !this.student?.id ) { return; }
      this.studentService.getStudentById( this.student.id ).subscribe( ( student ) => {
        this.student = student;
      } )
    } );

  }
}