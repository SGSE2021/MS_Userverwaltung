import { Component, OnInit, ViewChild } from '@angular/core';
import {StudentDTO} from "@common/dto/student.dto"
import { StudentTableComponent } from './components/student-table/student-table/student-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { DepartmentPoolDTO } from '@common/dto/department-pool.dto';
import { StudentsService } from 'src/app/services/students/students.service';
import { DataService } from 'src/app/services/data/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css'],
})

export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'title','lastname','firstname','matriculationNumber','course','degree','department'];
  dataSource = new MatTableDataSource<StudentDTO>();
  selectedStudentId: string | null = null;
  departmentPool: DepartmentPoolDTO[]=[];

  @ViewChild('table') studentForm?: StudentTableComponent
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;



  constructor(public dialog:MatDialog,public studentService:StudentsService,private dataService: DataService,
    private titleService : Title ) { 
      this.titleService.setTitle("Studierende");
    }
  ngAfterViewInit() {
    if(this.paginator)
    this.dataSource.paginator = this.paginator;
    if(this.sort)
    this.dataSource.sort = this.sort;
  }
  ngOnInit(){
    this.studentService.getAllStudents().subscribe(students=>{
    this.dataSource.data = students;
    });

    this.dataService.getDepartmentPool().subscribe(departments=>{
    this.departmentPool = departments;
    });

    this.dataSource.sortingDataAccessor = (item:any, property) => {
      switch(property) {
        
        case 'degree': return item.course?.degree;
        case 'course': return item.course?.name;
        case 'department': return item.course?.department.name;
        default: return "item[property]";
      }
  };
  if(this.sort)
  this.dataSource.sort = this.sort;
  }

  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open(CreateStudentComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      sub.unsubscribe();
    });

    const sub = dialogRef.componentInstance.newStudentEvent.subscribe((student)=>{
      alert(student.firstname);
      this.dataSource.data.push(student);
    })
  }



 get selectedStudent() {
  return this.selectedStudentId
    ? this.dataSource.data.find(student => student.id === this.selectedStudentId)
    : null;
}

onStudentChanged(id:string| undefined, data:StudentDTO) {
  this.dataSource.data = this.dataSource.data.map(student =>
    student.id === id ? { ...student, ...data } : student
  );
}

public submitStudentChanges(){
  if(this.selectedStudentId == null) return;
  this.studentService.updateStudent(this.selectedStudentId,this.studentForm?.studentForm.value).subscribe((student)=>{
    if(this.selectedStudentId == null) return;
    this.studentService.getAllStudents().subscribe((students)=>{
      this.dataSource.data = students;
    })
    //this.onStudentChanged(this.selectedStudentId,student);
  });
  
}


public deleteStudent(){
  if(this.selectedStudentId == null) return;
  const IdToDelete = this.selectedStudentId;
  this.studentService.deleteStudent(this.selectedStudentId).subscribe((student)=>{
   
    this.dataSource.data =  this.dataSource.data.filter(item => item.id !== IdToDelete);
  });
}


public doFilter = (event: any) => {
  this.dataSource.filter = event.value.trim().toLocaleLowerCase();
}

}