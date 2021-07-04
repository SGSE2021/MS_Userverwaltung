import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleDTO } from '@common/dto/role.enum';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from "./components/login/login.component";
import { ManageLecturersComponent } from './components/manage-lecturers/manage-lecturers.component';
import { ManageStudentsComponent } from './components/manage-students/manage-students.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RoleGuard } from './services/auth/role.guard';

const routes: Routes = [
  { path:'', component:HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent,canActivate:[AuthGuard]},
  { path: 'students', component: ManageStudentsComponent,
  canActivate:[RoleGuard,AuthGuard],
  data:{
    role:RoleDTO.ADMINSTRATIVE
  }
  },
  { 
    path: 'lecturers', component: ManageLecturersComponent,
    canActivate:[RoleGuard,AuthGuard],
    data:{
      role:RoleDTO.ADMINSTRATIVE
    }
  }  
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
