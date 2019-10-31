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
export class KioskService {

  apiUrl = environment.apiUrl;

  private _addKiosk          =  `${this.apiUrl}/kiosk/add-kiosk`;
  private _getKiosk          =  `${this.apiUrl}/kiosk/get-kiosk-list`;
  private _updateKiosk       =  `${this.apiUrl}/kiosk/update-kiosk`;
  private _deleteKiosk       =  `${this.apiUrl}/kiosk/delete-kiosk`;
  private _getKioskDetails   =  `${this.apiUrl}/kiosk/get-kiosk-details`;

  constructor(private http: HttpClient) { }

  addKiosk(kiosk) {
   return this.http.post(this._addKiosk, kiosk, httpOptions);
  }


  getKiosk() {
    return this.http.get(this._getKiosk, httpOptions);
  }

  getKioskDetails(kioskId) {
    return this.http.get(`${this._getKioskDetails}/${kioskId}`, httpOptions);
  }

  updateKiosk(kiosk) {
    return this.http.post(this._updateKiosk, kiosk, httpOptions);
  }

  deleteKiosk(kioskId) {
    return this.http.delete(`${this._deleteKiosk}/${kioskId}`, httpOptions);
  }

}
