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
export class PaymentService {

  apiUrl = environment.apiUrl;

  private addTicketPaymentUrl          = `${this.apiUrl}/payment/add-ticket-payment`;
  private getTicketPaymentUrl          = `${this.apiUrl}/payment/get-ticket-payment`;
  private updateTicketPaymentUrl       = `${this.apiUrl}/payment/update-ticket-payment`;
  private deleteTicketPaymentUrl       = `${this.apiUrl}/payment/delete-ticket-payment`;
  private getTicketPaymentDetailsUrl   = `${this.apiUrl}/payment/get-ticket-payment-details`;

  private addParkingPaymentUrl          = `${this.apiUrl}/payment/add-parking-payment`;
  private getParkingPaymentUrl          = `${this.apiUrl}/payment/get-parking-payment`;
  private updateParkingPaymentUrl       = `${this.apiUrl}/payment/update-parking-payment`;
  private deleteParkingPaymentUrl       = `${this.apiUrl}/payment/delete-parking-payment`;
  private getParkingPaymentDetailsUrl   = `${this.apiUrl}/payment/get-parking-payment-details`;


  constructor(private http: HttpClient) { }

  addTicketPayment(TicketPayment) {
    return this.http.post(this.addTicketPaymentUrl , TicketPayment , httpOptions);
  }

  getTicketPayment() {
    return this.http.get(this.getTicketPaymentUrl, httpOptions);
  }

  getTicketPaymentDetails(Id) {
    return this.http.get(`${this.getTicketPaymentDetailsUrl}/${Id}`, httpOptions);
  }

  updateTicketPayment(TicketPayment) {
   return this.http.post(this.updateTicketPaymentUrl, TicketPayment , httpOptions);
  }

  deleteTicketPayment(Id) {
    return this.http.delete(`${this.deleteTicketPaymentUrl}/${Id}`, httpOptions);
  }


  addParkingPayment(ParkingPayment) {
    return this.http.post(this.addParkingPaymentUrl , ParkingPayment , httpOptions);
  }

  getParkingPayment() {
    return this.http.get(this.getParkingPaymentUrl, httpOptions);
  }

  getParkingPaymentDetails(Id) {
    return this.http.get(`${this.getParkingPaymentDetailsUrl}/${Id}`, httpOptions);
  }

  updateParkingPayment(ParkingPayment) {
   return this.http.post(this.updateParkingPaymentUrl, ParkingPayment , httpOptions);
  }

  deleteParkingPayment(Id) {
    return this.http.delete(`${this.deleteParkingPaymentUrl}/${Id}`, httpOptions);
  }
}
