import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = false;
  title = 'user-service';
  constructor(public authService:AuthService,public titleService:Title){
    this.title = titleService.getTitle();
  }

  log(state:string){
    console.log(state);
  }
}
