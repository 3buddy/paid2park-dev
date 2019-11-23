import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observable } from 'rxjs';
import * as _ from 'lodash';
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

  private addDeploymentUrl          = `${this.apiUrl}/deployment/add-deployment`;
  private getDeploymentUrl          = `${this.apiUrl}/deployment/get-deployment-list`;
  private updateDeploymentUrl       = `${this.apiUrl}/deployment/edit-deployment`;
  private deleteDeploymentUrl       = `${this.apiUrl}/deployment/delete-deployment`;
  private getDeploymentDetailsUrl   = `${this.apiUrl}/deployment/get-deployment-details`;


  private addDeploymentAppRateUrl          = `${this.apiUrl}/deployment/add-deployment-app-rate`;
  private getDeploymentAppRateUrl          = `${this.apiUrl}/deployment/get-deployment-app-rate`;
  private updateDeploymentAppRateUrl       = `${this.apiUrl}/deployment/edit-deployment-app-rate`;
  private deleteDeploymentAppRateUrl       = `${this.apiUrl}/deployment/delete-deployment-app-rate`;
  private getDeploymentAppRateDetailsUrl   = `${this.apiUrl}/deployment/get-deployment-app-rate-details`;


  private addDeploymentPassRateUrl          = `${this.apiUrl}/deployment/add-deployment-pass-rate`;
  private getDeploymentPassRateUrl          = `${this.apiUrl}/deployment/get-deployment-pass-rate`;
  private updateDeploymentPassRateUrl       = `${this.apiUrl}/deployment/edit-deployment-pass-rate`;
  private deleteDeploymentPassRateUrl       = `${this.apiUrl}/deployment/delete-deployment-pass-rate`;
  private getDeploymentPassRateDetailsUrl   = `${this.apiUrl}/deployment/get-deployment-pass-rate-details`;


  constructor(private http: HttpClient) { }


  addDeploymentAppRate(appRate) {
    return this.http.post(this.addDeploymentAppRateUrl, appRate, httpOptions);
  }

  getDeploymentAppRate(deploymentId) {
    return this.http.get(`${this.getDeploymentAppRateUrl}/${deploymentId}`, httpOptions);
  }

  getDeploymentAppRateDetails(Id) {
    return this.http.get(`${this.getDeploymentAppRateDetailsUrl}/${Id}`, httpOptions);
  }

  updateDeploymentAppRate(appRate) {
    return this.http.post(this.updateDeploymentAppRateUrl, appRate, httpOptions);
  }

  deleteDeploymentAppRate(Id) {
    return this.http.delete(`${this.deleteDeploymentAppRateUrl}/${Id}`, httpOptions);
  }


  addDeploymentPassRate(appPass) {
    return this.http.post(this.addDeploymentPassRateUrl, appPass, httpOptions);
  }

  getDeploymentPassRate(deploymentId) {
    return this.http.get(`${this.getDeploymentPassRateUrl}/${deploymentId}`, httpOptions);
  }

  getDeploymentPassRateDetails(Id) {
    return this.http.get(`${this.getDeploymentPassRateDetailsUrl}/${Id}`, httpOptions);
  }

  updateDeploymentPassRate(appPass) {
    return this.http.post(this.updateDeploymentPassRateUrl, appPass, httpOptions);
  }

  deleteDeploymentPassRate(Id) {
    return this.http.delete(`${this.deleteDeploymentPassRateUrl}/${Id}`, httpOptions);
  }


  addDeployment(deploymentOne,deploymentTwo) {
    const deployment = _.merge(deploymentOne, deploymentTwo);
    // console.log(deployment);
    return this.http.post(this.addDeploymentUrl, deployment, httpOptions);
  }

  getDeployment() {
    return this.http.get(this.getDeploymentUrl, httpOptions);
  }

  getDeploymentDetails(Id) {
    return this.http.get(`${this.getDeploymentDetailsUrl}/${Id}`, httpOptions);
  }

  updateDeployment(deploymentOne,deploymentTwo) {
    const deployment = _.merge(deploymentOne, deploymentTwo);
    return this.http.post(this.updateDeploymentUrl, deployment, httpOptions);
  }

  deleteDeployment(Id) {
    return this.http.delete(`${this.deleteDeploymentUrl}/${Id}`, httpOptions);
  }
}
