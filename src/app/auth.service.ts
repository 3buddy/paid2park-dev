import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private _adminLoginUrl = `${environment.apiUrl}/admin/login`;
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
