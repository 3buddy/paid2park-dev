import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

     addTicketPayment: FormGroup;
     submitted = false;

    showMessage: boolean;
    messageClass: string;
    messageText: string;
    activeData: Array<string> = ['YES', 'NO'];

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
    this.addTicketPayment = this.fb.group({
      ticket_payment_tickets             : ['', Validators.required],
      ticket_payment_license             : ['', Validators.required],
      ticket_payment_ticket_fee          : ['', Validators.required],
      ticket_payment_ticket_date         : ['', Validators.required],
      ticket_payment_ticket_discount     : ['', Validators.required],
      ticket_payment_ticket_balance      : ['', Validators.required],
      ticket_payment_payment_amount      : ['', Validators.required],
      ticket_payment_funded_by           : ['', Validators.required],
      ticket_payment_balance_on_ticket   : ['', Validators.required],
      ticket_payment_status              : ['', Validators.required]
    });
  }

  revert() {
   this.addTicketPayment.reset();
   }

  onSubmit(form: FormGroup) {
    // console.log(form);

     this.services.addTicketPayment(form.value).subscribe( (response) => {

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
