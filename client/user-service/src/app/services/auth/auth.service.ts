import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserInfoDTO } from "../../../../../../common/dto/userInfo.dto"

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  public currentToken: BehaviorSubject<string | null>;
  public displayName: BehaviorSubject<string | null>;
  public user: BehaviorSubject<UserInfoDTO | null>;
  private TOKEN_IDENTIFIER = "token";

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.currentToken = new BehaviorSubject<string | null>( localStorage.getItem( this.TOKEN_IDENTIFIER ) );

    this.displayName = new BehaviorSubject<string | null>( localStorage.getItem( "display-name" ) );
    const currentUserObject = localStorage.getItem( "current-user" );
    this.user = new BehaviorSubject<UserInfoDTO | null>(null);
    if ( currentUserObject ) {
      this.user = new BehaviorSubject<UserInfoDTO | null>( JSON.parse( currentUserObject ) );
    }
    if ( this.displayName.getValue() === null ) {
      this.displayName.next( "Annonymous" );
    }
    // this.user = this.angularFireAuth.authState.pipe(
    //   switchMap( user =>{
    //     if(user){
    //       return this.angularFireAuth.
    //     }else{
    //       return of(null);
    //     }
    //   })
    // )
  }

  async login( email: string, password: string ): Promise<string | undefined> {
    console.log( `Logging in with ${ email } and ${ password }.` )
    const response = await this.angularFireAuth.signInWithEmailAndPassword( email, password );
    const jwtToken = await response.user?.getIdToken( true );
    if ( jwtToken ) {
      localStorage.setItem( this.TOKEN_IDENTIFIER, jwtToken );

      this.currentToken.next( jwtToken );
      if ( response.user?.displayName ) {
        console.log( "New displayname " + response.user.displayName );
        this.displayName.next( response.user?.displayName );
        localStorage.setItem( "display-name", response.user.displayName );

      }
    }
    return response.user?.uid;
  }

  async logout() {
    console.log( "Logout:logged out" );
    localStorage.removeItem( this.TOKEN_IDENTIFIER );
    this.currentToken.next( null );
    localStorage.removeItem( "display-name" );
    this.displayName.next( "Annonymous" );
    await this.angularFireAuth.signOut();
    console.log( "Signed out from angualFire" );
    console.log( "Navigate to /login" );
    return this.router.navigate( ['/login'] );
  }
}