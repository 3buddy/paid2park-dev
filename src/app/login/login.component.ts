import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Admin } from '../admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminModel = new Admin();
  loader: Promise<boolean>;
  errorModelEmail;
  errorModelPassword;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  
  onFormSubmit() {
    this.loader = Promise.resolve(true);
    this.auth.loginUser(this.adminModel)
      .subscribe(response => {
        //console.log(response)
        if (response['status'] === 1) {
          localStorage.setItem('token', response['body'].token);
          this.router.navigateByUrl(`/dashboard`);
          this.loader = Promise.resolve(false);
        } else {
          if (response['type'] === 0) {
            this.errorModelEmail = response['message'];
            this.loader = Promise.resolve(false);
          } else {
            this.errorModelPassword = response['message'];
            this.loader = Promise.resolve(false);
          }
        }
      });
  }

}
