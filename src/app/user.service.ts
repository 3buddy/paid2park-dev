import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable }   from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  private _adduser        = `${this.apiUrl}/user/add-user`;
  private _updateuser     = `${this.apiUrl}/user/edit-user`;
  private _deleteuser     = `${this.apiUrl}/user/delete-user`;
  private _getuser        = `${this.apiUrl}/user/get-user-list`;
  private _getuserdetails = `${this.apiUrl}/user/get-user-details`;

  private _getrole        = `${this.apiUrl}/role/get-role-list`;
  private _addrole        = `${this.apiUrl}/role/add-role`;
  private _updaterole     = `${this.apiUrl}/role/edit-role`;
  private _roledetails    = `${this.apiUrl}/role/get-role-details`

  private _getclaim       = `${this.apiUrl}/claim/get-claim`;
  


  constructor(private http: HttpClient) { }

  getClaim()
  {
    return this.http.get(this._getclaim,httpOptions);
  }

  addUser(user)
  {
    return this.http.post(this._adduser, user,httpOptions);
  }

  updateUser(user)
  {
    return this.http.post(this._updateuser , user,httpOptions);
  }

  getUser()
  {
    return this.http.get(this._getuser,httpOptions);
  }

  deleteUser(userId)
  {
    return this.http.delete(`${this._deleteuser}/${userId}`);
  }

  getuserdetails(userId)
  {
    console.log(`user id : ${userId}`)
    return this.http.get(`${this._getuserdetails}/${userId}`,httpOptions);
  }

  getRole()
  {
    return this.http.get(this._getrole,httpOptions);
  }

  updateRole(role)
  {
    return this.http.post(this._updaterole,role,httpOptions);
  }

  getRoleDetails(roleId): Observable<any>
  {
    return this.http.get<any>(`${this._roledetails}/${roleId}`,httpOptions)
  }

  addRole(role)
  {
    return this.http.post(this._addrole,role,httpOptions);
  }
  


}
