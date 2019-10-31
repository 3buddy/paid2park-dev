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
export class CustomerService {

  apiUrl = environment.apiUrl;

  private _addcustomer        = `${this.apiUrl}/customer/add-customer`;
  private _getcustomer        = `${this.apiUrl}/customer/get-customer-list`;
  private _updatecustomer     = `${this.apiUrl}/customer/edit-customer`;
  private _deletecustomer     = `${this.apiUrl}/customer/delete-customer`;
  private _getcustomerdetails = `${this.apiUrl}/customer/get-customer-details`;

  private _addVehicle         = `${this.apiUrl}/vehicle/add-vehicle`;
  private _getVehicle         =  `${this.apiUrl}/vehicle/get-vehicle-list`;
  private _getVehicleDetails  =  `${this.apiUrl}/vehicle/get-vehicle-details`;
  private _updateVehicle      =  `${this.apiUrl}/vehicle/update-vehicle`;
  private _deleteVehicle      =  `${this.apiUrl}/vehicle/delete-vehicle`;



  /*
  /:vehicleId
  update-vehicle
  delete-vehicle/:vehicleId

*/
  constructor(private http: HttpClient) { }

  addVehicle(vehicle) {
    return this.http.post(this._addVehicle , vehicle , httpOptions);
  }

  getVehicle(customerId) {
    return this.http.get(`${this._getVehicle}/${customerId}`, httpOptions);
  }

  getVehicleDetails(vehicleId) {
     return this.http.get(`${this._getVehicleDetails}/${vehicleId}`, httpOptions);
  }

  updateVehicle(vehicle) {
    return this.http.post(this._updateVehicle , vehicle , httpOptions);
  }

  deleteVehicle(vehicleId) {
    return this.http.delete(`${this._deleteVehicle}/${vehicleId}` , httpOptions);
  }

  addCustomer(customer) {
   return this.http.post(this._addcustomer, customer, httpOptions);
  }


  getCustomer() {
    return this.http.get(this._getcustomer, httpOptions);
  }

  getCustomerDetails(customerId) {
    return this.http.get(`${this._getcustomerdetails}/${customerId}`, httpOptions);
  }

  updateCustomer(customer) {
    return this.http.post(this._updatecustomer, customer, httpOptions);
  }

  deleteCustomer(customerId) {
    return this.http.delete(`${this._deletecustomer}/${customerId}`, httpOptions);
  }

}
