import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentToken: BehaviorSubject<string | null>;
  private TOKEN_IDENTIFIER="token";

  constructor(
    private angularFireAuth : AngularFireAuth,
    private router: Router
    ) { 
    this.currentToken= new BehaviorSubject<string| null>(localStorage.getItem(this.TOKEN_IDENTIFIER));
  }

  async login(email: string, password: string):Promise<void>{
    console.log(email);
    console.log(password);
    const response = await this.angularFireAuth.signInWithEmailAndPassword(email,password);
    const jwtToken = await response.user?.getIdToken(true);
    if(jwtToken){
      localStorage.setItem(this.TOKEN_IDENTIFIER,jwtToken);
      this.currentToken.next(jwtToken);
    }
  }

  async logout() {
    localStorage.removeItem(this.TOKEN_IDENTIFIER);
    this.currentToken.next(null);
    await this.angularFireAuth.signOut();
    this.router.navigate(['/login']);
  }
}