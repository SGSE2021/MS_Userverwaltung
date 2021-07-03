import { Component, OnInit, ViewChild } from '@angular/core';
import { LecturerDTO } from "@common/dto/lecturer.dto"
import { LecturerTableComponent } from './components/lecturer-table/lecturer-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateLecturerComponent } from './components//create-lecturer/create-lecturer.component';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
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
  selectedLecturerId: string | null = null;
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

  openAddLecturerDialog(): void {
    const dialogRef = this.dialog.open( CreateLecturerComponent );
    dialogRef.afterClosed().subscribe( result => {
      console.log( 'The dialog was closed' );
      sub.unsubscribe();
    } );

    const sub = dialogRef.componentInstance.newLecturerEvent.subscribe( ( lecturer ) => {
      this.lecturerService.getAllLecturers().subscribe( ( lecturers ) => {
        this.dataSource.data = lecturers;
      } )
    } )
  }



  get selectedLecturer() {
    return this.selectedLecturerId
      ? this.dataSource.data.find( lecturer => lecturer.id === this.selectedLecturerId )
      : null;
  }

  onLecturerChanged( id: string | undefined, data: LecturerDTO ) {
    this.dataSource.data = this.dataSource.data.map( lecturer =>
      lecturer.id === id ? { ...lecturer, ...data } : lecturer
    );
  }

  public submitLecturerChanges() {
    if ( this.selectedLecturerId == null ) return;
    this.lecturerService.updateLecturer( this.selectedLecturerId, this.lecturerForm?.lecturerForm.value ).subscribe( ( student ) => {
      if ( this.selectedLecturerId == null ) return;
      this.lecturerService.getAllLecturers().subscribe( ( lecturers ) => {
        this.dataSource.data = lecturers;
      } )
    } );

  }


  public deleteLecturer() {
    if ( this.selectedLecturerId == null ) return;
    const IdToDelete = this.selectedLecturerId;
    this.lecturerService.deleteLecturer( this.selectedLecturerId ).subscribe( ( lecturer ) => {

      this.dataSource.data = this.dataSource.data.filter( item => item.id !== IdToDelete );
    } );
  }


  public doFilter = ( event: any ) => {
    this.dataSource.filter = event.value.trim().toLocaleLowerCase();
  }

}