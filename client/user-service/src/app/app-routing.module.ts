import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from "./components/login/login.component";
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path:'', component:HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent,canActivate:[AuthGuard]  },
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
