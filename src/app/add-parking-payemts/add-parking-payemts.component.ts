import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-parking-payemts',
  templateUrl: './add-parking-payemts.component.html',
  styleUrls: ['./add-parking-payemts.component.css']
})
export class AddParkingPayemtsComponent implements OnInit {

  addParkingPayment: FormGroup;
  submitted = false;

 showMessage: boolean;
 messageClass: string;
 messageText: string;

 constructor(
   private fb: FormBuilder ,
   private services: PaymentService,
   private cdRef: ChangeDetectorRef,
   private router: Router
   ) { }

ngOnInit() {
 this.createForm();
}

createForm() {
 this.addParkingPayment = this.fb.group({
  parking_payment_license             : ['', Validators.required],
  parking_payment_customer_name             : ['', Validators.required],
  parking_payment_app_packages_available          : ['', Validators.required],
  parking_payment_min_to_add_to_account         : ['', Validators.required],
  parking_payment_parking_amount_paid     : ['', Validators.required],
  parking_payment_funds_by      : ['', Validators.required]
 });
}

revert() {
this.addParkingPayment.reset();
}

onSubmit(form: FormGroup) {
 // console.log(form);

  this.services.addParkingPayment(form.value).subscribe( (response) => {

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
