import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  

  constructor(private http :HttpClient) { }

  addCustomer(customer)
  {
   return this.http.post(this._addcustomer,customer,httpOptions);
  }


  getCustomer()
  {
    return this.http.get(this._getcustomer,httpOptions);
  }

  getCustomerDetails(customerId)
  {
    return this.http.get(`${this._getcustomerdetails}/${customerId}`,httpOptions);
  }

  updateCustomer(customer)
  {
    return this.http.post(this._updatecustomer,customer,httpOptions);
  }

  deleteCustomer(customerId)
  {
    return this.http.delete(`${this._deletecustomer}/${customerId}`,httpOptions);
  }

}
