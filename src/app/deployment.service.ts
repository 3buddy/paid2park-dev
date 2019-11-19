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
export class DeploymentService {
  apiUrl = environment.apiUrl;

  private addDeploymentUrl          = `${this.apiUrl}/deployment/add-passes`;
  private getDeploymentUrl          = `${this.apiUrl}/deployment/get-passes-list`;
  private updateDeploymentUrl       = `${this.apiUrl}/deployment/update-passes`;
  private deleteDeploymentUrl       = `${this.apiUrl}/deployment/delete-passes`;
  private getDeploymentDetailsUrl   = `${this.apiUrl}/deployment/get-passes-details`;


  constructor(private http: HttpClient) { }

  addDeployment(deployment) {
    return this.http.post(this.addDeploymentUrl, deployment, httpOptions);
  }

  getDeployment() {
    return this.http.get(this.getDeploymentUrl, httpOptions);
  }

  getDeploymentDetails(Id) {
    return this.http.get(`${this.getDeploymentDetailsUrl}/${Id}`, httpOptions);
  }

  updateDeployment(deployment) {
    return this.http.post(this.updateDeploymentUrl, deployment, httpOptions);
  }

  deleteDeployment(Id) {
    return this.http.delete(`${this.deleteDeploymentUrl}/${Id}`, httpOptions);
  }
}
