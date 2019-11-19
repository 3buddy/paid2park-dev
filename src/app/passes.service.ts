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
export class PassesService {

  apiUrl = environment.apiUrl;

  private addPassesUrl          = `${this.apiUrl}/passes/add-passes`;
  private getPassesUrl          = `${this.apiUrl}/passes/get-passes-list`;
  private updatePassesUrl       = `${this.apiUrl}/passes/update-passes`;
  private deletePassesUrl       = `${this.apiUrl}/passes/delete-passes`;
  private getPassesDetailsUrl   = `${this.apiUrl}/passes/get-passes-details`;


  constructor(private http: HttpClient) { }

  addPasses(passes) {
    return this.http.post(this.addPassesUrl , passes , httpOptions);
  }

  getPasses() {
     return this.http.get(this.getPassesUrl, httpOptions);
  }

  getPassesDetails(Id) {
     return this.http.get(`${this.getPassesDetailsUrl}/${Id}`, httpOptions);
  }

  updatePasses(passes) {
    return this.http.post(this.updatePassesUrl, passes ,  httpOptions);
  }

  deletePasses(Id) {
    return this.http.delete(`${this.deletePassesUrl}/${Id}`, httpOptions);
  }
}
