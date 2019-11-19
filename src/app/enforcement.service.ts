import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class EnforcementService {
  apiUrl = environment.apiUrl;

  private addEnforcementsUrl          = `${this.apiUrl}/enforcements/add-enforcements`;
  private getEnforcementsUrl          = `${this.apiUrl}/enforcements/get-enforcements`;
  private updateEnforcementsUrl       = `${this.apiUrl}/enforcements/update-enforcements`;
  private deleteEnforcementsUrl       = `${this.apiUrl}/enforcements/delete-enforcements`;
  private getEnforcementsDetailsUrl   = `${this.apiUrl}/enforcements/get-enforcements-details`;


  constructor(private http: HttpClient) { }

  addEnforcements(enforcements) {
     return this.http.post(this.addEnforcementsUrl , enforcements , httpOptions);
  }

  getEnforcements() {
    return this.http.get(this.getEnforcementsUrl, httpOptions);
  }

  getEnforcementsDetails(Id) {
    return this.http.get(`${this.getEnforcementsDetailsUrl}/${Id}`, httpOptions);
  }

  updateEnforcements(enforcements) {
    return this.http.post(this.updateEnforcementsUrl, enforcements , httpOptions);
  }

  deleteEnforcements(Id) {
    return this.http.delete(`${this.deleteEnforcementsUrl}/${Id}`, httpOptions);
  }

}
