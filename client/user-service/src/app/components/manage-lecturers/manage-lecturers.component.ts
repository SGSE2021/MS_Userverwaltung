import { Component, OnInit, ViewChild } from '@angular/core';
import { LecturerDTO } from "@common/dto/lecturer.dto"
import { LecturerTableComponent } from './components/lecturer-table/lecturer-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateLecturerComponent } from './components//create-lecturer/create-lecturer.component';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { StudentsService } from 'src/app/services/students/students.service';
import { DataService } from 'src/app/services/data/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { LecturerService } from 'src/app/services/lecturers/lecturer-service.service';


@Component( {
  selector: 'app-manage-lecturers',
  templateUrl: './manage-lecturers.component.html',
  styleUrls: ['./manage-lecturers.component.css'],
} )

export class ManageLecturersComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'title', 'lastname', 'firstname', 'department'];
  dataSource = new MatTableDataSource<LecturerDTO>();
  selectedStudentId: string | null = null;
  departmentPool: DepartmentPoolDTO[] = [];

  @ViewChild( 'table' ) lecturerForm?: LecturerTableComponent
  @ViewChild( MatPaginator ) paginator?: MatPaginator;
  @ViewChild( MatSort ) sort?: MatSort;


  constructor( public dialog: MatDialog,
    public lecturerService: LecturerService,
    private dataService: DataService,
    private titleService: Title
  ) { this.titleService.setTitle( "Lehrende" ); }
  ngAfterViewInit() {
    if ( this.paginator )
      this.dataSource.paginator = this.paginator;
    if ( this.sort )
      this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.lecturerService.getAllLecturers().subscribe( lecturers => {
      this.dataSource.data = lecturers;
    } );

    this.dataService.getDepartmentPool().subscribe( departments => {
      this.departmentPool = departments;
    } );

    this.dataSource.sortingDataAccessor = ( item: any, property ) => {
      switch ( property ) {

        case 'department': return item.department.name;
        default: return item[property];
      }
    };
    if ( this.sort )
      this.dataSource.sort = this.sort;
  }

  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open( CreateLecturerComponent );
    dialogRef.afterClosed().subscribe( result => {
      console.log( 'The dialog was closed' );
      sub.unsubscribe();
    } );

    const sub = dialogRef.componentInstance.newLecturerEvent.subscribe( ( student ) => {
      alert( student.firstname );
      this.dataSource.data.push( student );
    } )
  }



  get selectedLecturer() {
    return this.selectedStudentId
      ? this.dataSource.data.find( student => student.id === this.selectedStudentId )
      : null;
  }

  onStudentChanged( id: string | undefined, data: LecturerDTO ) {
    this.dataSource.data = this.dataSource.data.map( student =>
      student.id === id ? { ...student, ...data } : student
    );
  }

  public submitStudentChanges() {
    if ( this.selectedStudentId == null ) return;
    this.lecturerService.updateLecturer( this.selectedStudentId, this.lecturerForm?.lecturerForm.value ).subscribe( ( student ) => {
      if ( this.selectedStudentId == null ) return;
      this.lecturerService.getAllLecturers().subscribe( ( students ) => {
        this.dataSource.data = students;
      } )
      //this.onStudentChanged(this.selectedStudentId,student);
    } );

  }


  public deleteStudent() {
    if ( this.selectedStudentId == null ) return;
    const IdToDelete = this.selectedStudentId;
    this.lecturerService.deleteLecturer( this.selectedStudentId ).subscribe( ( student ) => {

      this.dataSource.data = this.dataSource.data.filter( item => item.id !== IdToDelete );
    } );
  }


  public doFilter = ( event: any ) => {
    this.dataSource.filter = event.value.trim().toLocaleLowerCase();
  }

}