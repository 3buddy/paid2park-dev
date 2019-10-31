import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

    addCustomer: FormGroup;
    submitted = false;

    showMessage: boolean;
    messageClass: string;
    messageText: string;

    constructor(private fb: FormBuilder, private CS: CustomerService , private router: Router, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {


    this.addCustomer = this.fb.group({
        customer_assign_id: ['', Validators.required],
        customer_first_name: ['', Validators.required],
        customer_last_name: ['', Validators.required],
        customer_mail_address: ['', Validators.required],
        customer_mail_city: ['', Validators.required],
        customer_mail_state: ['', Validators.required],
        customer_mail_zip: ['', Validators.required],
        customer_minute_available: ['', Validators.required],
        customer_last_payment_date: ['', Validators.required],
        customer_last_payment_amount: ['', Validators.required],
        customer_last_minutes_received: ['', Validators.required],
        customer_last_parking_date: ['', Validators.required],
        customer_last_pass_purchase_date: ['', Validators.required],
        customer_last_pass_start_date: ['', Validators.required],
        customer_last_pass_end_date: ['', Validators.required],
        customer_last_pass_cost: ['', Validators.required],
        customer_email_address: ['', [ Validators.required, Validators.email]],
        customer_cell: ['', Validators.required],
        customer_cell_carrier: ['', Validators.required],
        customer_notify_mins_in_advance: ['', Validators.required],
        customer_number_of_tickets_ytd: ['', Validators.required],
      });


  }

  revert() {
   this.addCustomer.reset();
   }

  onSubmit(form: FormGroup) {

    this.CS.addCustomer(form.value)
    .subscribe( response => {

        if(response['status'] === 1) {
          this.showMessage = true;
          this.messageText = response['message'];
          this.messageClass = 'success';

          this.cdRef.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/customers']);
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
