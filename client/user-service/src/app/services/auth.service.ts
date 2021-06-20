import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;

  constructor(
    private afAuth : AngularFireAuth,
    private router: Router
    ) { 
    this.user = this.afAuth.authState;
  }
  async login(){
    const user = await this.afAuth.signInWithEmailAndPassword("dennis.eller@fh-bielefeld.de", "123456");
    console.log(user);
  }
}