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
export class VehicleService {

  apiUrl = environment.apiUrl;

  private _addVehicle          =   `${this.apiUrl}/vehicle/add-vehicle`;
  private _getVehicle          =   `${this.apiUrl}/vehicle/get-vehicle-list`;
  private _updateVehicle       =   `${this.apiUrl}/vehicle/update-vehicle`;
  private _deleteVehicle       =   `${this.apiUrl}/vehicle/delete-vehicle`;
  private _getVehicleDetails   =   `${this.apiUrl}/vehicle/get-vehicle-details`; 
  
  constructor(private http :HttpClient) { }

  addVehicle(vehicle)
  {
   return this.http.post(this._addVehicle,vehicle,httpOptions);
  }

  getVehicle()
  {
    return this.http.get(this._getVehicle,httpOptions);
  }

  getVehicleDetails(vehicleId)
  {
    return this.http.get(`${this._getVehicleDetails}/${vehicleId}`,httpOptions);
  }

  updateVehicle(vehicle)
  {
    return this.http.post(this._updateVehicle,vehicle,httpOptions);
  }

  deleteVehicle(vehicleId)
  {
    return this.http.delete(`${this._deleteVehicle}/${vehicleId}`,httpOptions);
  }

}
