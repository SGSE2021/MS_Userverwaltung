import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required)
  });
  loading = false;
  submitted=false;
  constructor(
    public  authService:AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { 
    }

  ngOnInit(): void {
    if (this.authService.currentToken.value) {
      console.log("Already logged in");
      this.router.navigate(['/']);
    }
  }

  public async login(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return;
    }
    this.loading=true;
    try {
      const mail = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      await this.authService.login(mail,password);

      const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
      console.log(`returning to ${returnUrl}`);
    } catch (error) {
      console.log(error);
      this.loading= false;
    }
   
  }
}