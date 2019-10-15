import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _adduser       = 'http://173.231.205.186:49156/admin/login';
  private _updateuser    = '';
  private _deleteuser    = '';
  private _getuser       = 'http://173.231.205.186:49156/api/v1/user/get-user-list';
  private _getrole       = 'http://173.231.205.186:49156/api/v1/role/get-role-list';
  private _addrole       = 'http://173.231.205.186:49156/api/v1/role/add-role';
  private _updaterole    = '';
  private _getclaim      = 'http://173.231.205.186:49156/api/v1/claim/get-claim';
  private _roledetails   = 'http://173.231.205.186:49156/api/v1/role/get-role-datails/'


  constructor(private http: HttpClient, private router: Router) { }

  getClaim()
  {
    return this.http.get(this._getclaim);
  }

  addUser(user)
  {
    return this.http.post(this._adduser, user);
  }

  updateUser(user)
  {
    return this.http.post(this._updateuser , user);
  }

  getUser()
  {
    return this.http.get(this._getuser);
  }

  deleteUser(userId)
  {
    return this.http.post(this._deleteuser,userId);
  }

  getRole()
  {
    return this.http.get(this._getrole);
  }

  updateRole(role)
  {
    return this.http.post(this._updaterole,role);
  }

  getRoleDetails(roleId)
  {
    return this.http.get(this._roledetails + roleId)
  }

  addRole(role)
  {
    return this.http.post(this._addrole,role,httpOptions);
  }
  


}
