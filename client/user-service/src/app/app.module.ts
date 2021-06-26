import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material/material.module'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { SettingsComponent } from './components/settings/settings.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ManageStudentsComponent } from './components/manage-students/manage-students.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';  

const config = {    
  apiKey: "AIzaSyA8SJNujTKurGNLA15PQqPjz0Pi2rpeEAw",
  authDomain: "ms-user-service.firebaseapp.com",
  projectId: "ms-user-service",
  storageBucket: "ms-user-service.appspot.com",
  messagingSenderId: "947016479819",
  appId: "1:947016479819:web:6d4c58d6aa90077f6349ce",
  measurementId: "G-XYP3W8XE9Y"
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    HomePageComponent,
    ManageStudentsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAuthFirebaseUIModule.forRoot(config),
    MatPasswordStrengthModule
  ],
  exports:[
    LoginComponent
  ],
  providers: [{provide: MAT_DATE_LOCALE,useValue:'de-de'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
