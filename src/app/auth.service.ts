import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private _adminLoginUrl = 'http://173.231.205.186:49156/api/v1/admin/login';
  data;
  error;

  constructor(private http: HttpClient, private router: Router) { }
  
  
  loginUser(user) {
    return this.http.post(this._adminLoginUrl, user);
  }
  
  
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
