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

  apiurl = environment.apiUrl;

  private _adduser        = `${this.apiurl}/user/add-user`;
  private _updateuser     = `${this.apiurl}/user/edit-user`;
  private _deleteuser     = `${this.apiurl}/user/delete-user`;
  private _getuser        = `${this.apiurl}/user/get-user-list`;
  private _getuserdetails = `${this.apiurl}/user/get-user-details/`;

  private _getrole        = `${this.apiurl}/role/get-role-list`;
  private _addrole        = `${this.apiurl}/role/add-role`;
  private _updaterole     = `${this.apiurl}/role/edit-role`;
  private _roledetails    = `${this.apiurl}/role/get-role-details`

  private _getclaim       = `${this.apiurl}/claim/get-claim`;
  


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
