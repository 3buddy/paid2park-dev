import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-parking-payment',
  templateUrl: './edit-parking-payment.component.html',
  styleUrls: ['./edit-parking-payment.component.css']
})
export class EditParkingPaymentComponent implements OnInit {

  addParkingPayment: FormGroup;
  submitted = false;

  showMessage: boolean;
  messageClass: string;
  messageText: string;
  loadThePage: boolean;
  activeData: Array<string> = ['YES', 'NO'];

 constructor(
   private fb: FormBuilder ,
   private services: PaymentService,
   private cdRef: ChangeDetectorRef,
   private router: Router,
   private ar: ActivatedRoute
   ) { }

ngOnInit() {
   this.services.getParkingPaymentDetails(this.ar.snapshot.params['Id'])
   .subscribe( (response) => {

     if (response['status'] === 1) {

      this.addParkingPayment = this.fb.group({
        parking_payment_id                       : [response['body']['parking_payment_id'], Validators.required],
        parking_payment_license                  : [response['body']['parking_payment_license'], Validators.required],
        parking_payment_customer_name            : [response['body']['parking_payment_customer_name'], Validators.required],
        parking_payment_app_packages_available   : [response['body']['parking_payment_app_packages_available'], Validators.required],
        parking_payment_min_to_add_to_account    : [response['body']['parking_payment_min_to_add_to_account'], Validators.required],
        parking_payment_parking_amount_paid      : [response['body']['parking_payment_parking_amount_paid'], Validators.required],
        parking_payment_funds_by                 : [response['body']['parking_payment_funds_by'], Validators.required],
        parking_payment_status                   : [response['body']['parking_payment_status'], Validators.required]
       });
      this.loadThePage = true;
      this.cdRef.detectChanges();
     }
   });
}


revert() {
this.addParkingPayment.reset();
}

onSubmit(form: FormGroup) {
 // console.log(form);

  this.services.updateParkingPayment(form.value).subscribe( (response) => {

   if (response['status'] === 1) {
     this.showMessage = true;
     this.messageText = response['message'];
     this.messageClass = 'success';

     this.cdRef.detectChanges();
     setTimeout(() => {
       this.router.navigate(['/ParkingPayment']);
      }, 3000);
   } else {
     this.showMessage = true;
     this.messageText = response['message'];
     this.messageClass = 'danger';
     this.cdRef.detectChanges();
   }

 });

}

}
