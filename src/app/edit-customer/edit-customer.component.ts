import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

    editCustomer: FormGroup;
    submitted = false;
    pageLoad: boolean;

    showMessage: boolean = false;
    messageClass: string = '';
    messageText: string = '';
    activeData: Array<string> = ['YES', 'NO'];

  constructor(private AR: ActivatedRoute , private fb: FormBuilder, private CS : CustomerService , private router : Router, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    try {
      this.getCustomerDetails();
    } catch (error) {
      console.log(error);

    }

  }

  revert() {
    this.editCustomer.reset();
    }

    getCustomerDetails() {
     this.CS.getCustomerDetails(this.AR.snapshot.params['Id'])
     .subscribe((response) => {

        //console.log(response['body']['customer_id']);
        if (response['status'] === 1) {
            this.editCustomer = this.fb.group({
              customer_id: [ response['body']['customer_id'] , Validators.required],
              customer_assign_id: [response['body']['customer_assign_id'], Validators.required],
              customer_first_name: [response['body']['customer_first_name'], Validators.required],
              customer_last_name: [response['body']['customer_last_name'], Validators.required],
              customer_mail_address: [response['body']['customer_mail_address'], Validators.required],
              customer_mail_city: [response['body']['customer_mail_city'], Validators.required],
              customer_mail_state: [response['body']['customer_mail_state'], Validators.required],
              customer_mail_zip: [response['body']['customer_mail_zip'], Validators.required],
              customer_minute_available: [response['body']['customer_minute_available'], Validators.required],
              customer_last_payment_date: [response['body']['customer_last_payment_date'], Validators.required],
              customer_last_payment_amount: [response['body']['customer_last_payment_amount'], Validators.required],
              customer_last_minutes_received: [response['body']['customer_last_minutes_received'], Validators.required],
              customer_last_parking_date: [response['body']['customer_last_parking_date'], Validators.required],
              customer_last_pass_purchase_date: [response['body']['customer_last_pass_purchase_date'], Validators.required],
              customer_last_pass_start_date: [response['body']['customer_last_pass_start_date'], Validators.required],
              customer_last_pass_end_date: [response['body']['customer_last_pass_end_date'], Validators.required],
              customer_last_pass_cost: [response['body']['customer_last_pass_cost'], Validators.required],
              customer_email_address: [response['body']['customer_email_address'], [Validators.required, Validators.email]],
              customer_cell: [response['body']['customer_cell'], Validators.required],
              customer_cell_carrier: [response['body']['customer_cell_carrier'], Validators.required],
              customer_notify_mins_in_advance: [response['body']['customer_notify_mins_in_advance'], Validators.required],
              customer_number_of_tickets_ytd: [response['body']['customer_number_of_tickets_ytd'], Validators.required],
              customer_status: [response['body']['customer_status'], Validators.required]
            });

        }
        this.pageLoad = true;
        this.cdRef.detectChanges();

     });
  }

   onSubmit(form: FormGroup) {

     this.CS.updateCustomer(form.value)
     .subscribe( response => {

         if (response['status'] === 1) {
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
