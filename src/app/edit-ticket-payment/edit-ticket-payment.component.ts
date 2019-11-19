import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-ticket-payment',
  templateUrl: './edit-ticket-payment.component.html',
  styleUrls: ['./edit-ticket-payment.component.css']
})
export class EditTicketPaymentComponent implements OnInit {

 addTicketPayment: FormGroup;
 submitted = false;

 showMessage: boolean;
 messageClass: string;
 messageText: string;
 loadThePage: boolean;

 constructor(
   private fb: FormBuilder ,
   private services: PaymentService,
   private cdRef: ChangeDetectorRef,
   private router: Router,
   private ar: ActivatedRoute
   ) { }

ngOnInit() {

  this.services.getTicketPaymentDetails(this.ar.snapshot.params['Id'])
  .subscribe( (response) => {

    if ( response['status'] === 1) {
      this.addTicketPayment = this.fb.group({
        ticket_payment_id                  : [response['body']['ticket_payment_id'], Validators.required],
        ticket_payment_tickets             : [response['body']['ticket_payment_tickets'] , Validators.required],
        ticket_payment_license             : [response['body']['ticket_payment_license'], Validators.required],
        ticket_payment_ticket_fee          : [response['body']['ticket_payment_ticket_fee'], Validators.required],
        ticket_payment_ticket_date         : [response['body']['ticket_payment_ticket_date'], Validators.required],
        ticket_payment_ticket_discount     : [response['body']['ticket_payment_ticket_discount'], Validators.required],
        ticket_payment_ticket_balance      : [response['body']['ticket_payment_ticket_balance'], Validators.required],
        ticket_payment_payment_amount      : [response['body']['ticket_payment_payment_amount'], Validators.required],
        ticket_payment_funded_by           : [response['body']['ticket_payment_funded_by'], Validators.required],
        ticket_payment_balance_on_ticket   : [response['body']['ticket_payment_balance_on_ticket'], Validators.required]
      });
      this.loadThePage = true;
      this.cdRef.detectChanges();
    }
  });
}

revert() {
this.addTicketPayment.reset();
}

onSubmit(form: FormGroup) {
 // console.log(form);

  this.services.updateTicketPayment(form.value).subscribe( (response) => {

   if (response['status'] === 1) {
     this.showMessage = true;
     this.messageText = response['message'];
     this.messageClass = 'success';

     this.cdRef.detectChanges();
     setTimeout(() => {
       this.router.navigate(['/payments']);
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
