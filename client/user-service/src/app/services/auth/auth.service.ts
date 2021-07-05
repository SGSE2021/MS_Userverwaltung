import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserInfoDTO } from "../../../../../../common/dto/userInfo.dto"
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  public user: BehaviorSubject<UserInfoDTO>;
  private placeHolderUser: UserInfoDTO = {
    uid: "-1",
    firstname: "Annonymous",
    lastname: "",
    role: -1
  }
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    const currentUserObject = localStorage.getItem( "current-user" );
    if ( currentUserObject ) {
      this.user = new BehaviorSubject<UserInfoDTO>( JSON.parse( currentUserObject ) );
    } else {
      this.user = new BehaviorSubject<UserInfoDTO>( this.placeHolderUser );
    }

  }

  async login( email: string, password: string ) {
    console.log( `Logging in with ${ email } and ${ password }.` )
    const response = await this.angularFireAuth.signInWithEmailAndPassword( email, password );
    const uid = response.user?.uid;
    const names = response.user?.displayName?.split( " " ) || ["Annonymous", ""];
    
    const requestUrl = `${environment.restApi}/getUserInfo/${uid}`;
    const userInfo =await this.http.post<UserInfoDTO>(requestUrl,{}).toPromise();
    this.user.next( userInfo);

    console.dir( "New user ", this.user.getValue() );
    localStorage.setItem( "current-user", JSON.stringify( this.user.getValue() ) );


    return this.user;
  }

  async logout() {
    console.log( "Logout:logged out" );
    this.user.next( this.placeHolderUser );
    localStorage.removeItem( "current-user" );

    await this.angularFireAuth.signOut();
    console.log( "Signed out from angualFire" );
    console.log( "Navigate to /login" );
    return this.router.navigate( ['/login'] );
  }
}