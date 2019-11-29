import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { DeploymentService } from '../deployment.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-deployment',
  templateUrl: './add-deployment.component.html',
  styleUrls: ['./add-deployment.component.css']
})
export class AddDeploymentComponent implements OnInit {

  addDeployment: FormGroup;
  submitted = false;
  isLinear = false;

  showMessage: boolean;
  messageClass: string;
  messageText: string;
  activeData: Array<string> = ['YES', 'NO'];

  constructor(
      private fb: FormBuilder,
      private services: DeploymentService,
      private router: Router,
      private ar: ActivatedRoute,
      private cdRef: ChangeDetectorRef) { }


  ngOnInit() {

        this.addDeployment = new FormGroup({
            pageOne: new FormGroup({
                deployment_assign_id: new FormControl('', Validators.required),
                deployment_name: new FormControl('', Validators.required),
                deployment_billing_address: new FormControl('', Validators.required),
                deployment_billing_city: new FormControl('', Validators.required),
                deployment_billing_state: new FormControl('', Validators.required),
                deployment_billing_zip: new FormControl('', Validators.required),
                deployment_billing_phone_contact: new FormControl('', Validators.required),
                deployment_billing_phone: new FormControl('', Validators.required),
                deployment_billing_email: new FormControl('', [Validators.required, Validators.email]),
                deployment_min_minutes_to_park: new FormControl('', Validators.required),
                deployment_parking_charge_times: new FormControl('', Validators.required),
                deployment_monday_start: new FormControl('', Validators.required),
                deployment_monday_end: new FormControl('', Validators.required),
                deployment_tuesday_start: new FormControl('', Validators.required),
                deployment_tuesday_end: new FormControl('', Validators.required),
                deployment_wednesday_start: new FormControl('', Validators.required),
                deployment_wednesday_end: new FormControl('', Validators.required),
                deployment_thursday_start: new FormControl('', Validators.required),
                deployment_thursday_end: new FormControl('', Validators.required),
                deployment_friday_start: new FormControl('', Validators.required),
                deployment_friday_end: new FormControl('', Validators.required),
                deployment_saturday_start: new FormControl('', Validators.required),
                deployment_saturday_end: new FormControl('', Validators.required),
                deployment_sunday_start: new FormControl('', Validators.required),
                deployment_sunday_end: new FormControl('', Validators.required),
            }),
            pageTwo: new FormGroup({
                deployment_parking_percentage: new FormControl('', Validators.required),
                deployment_tickets_percentage: new FormControl('', Validators.required),
                deployment_ticket_transaction_charges: new FormControl('', Validators.required),
                deployment_monthly_service_charge_parking: new FormControl('', Validators.required),
                deployment_monthly_service_charge_enforcement: new FormControl('', Validators.required),
                deployment_bill_day_of_month: new FormControl('', Validators.required),
                deployment_min_monthly_bill: new FormControl('', Validators.required),
                deployment_parking_revenue: new FormControl('', Validators.required),
                deployment_parking_draft_day_of_month: new FormControl('', Validators.required),
                deployment_parking_draft_routing: new FormControl('', Validators.required),
                deployment_parking_draft_account: new FormControl('', Validators.required),
                deployment_parking_draft_bank_name: new FormControl('', Validators.required),
                deployment_parking_draft_note: new FormControl('', Validators.required),
                deployment_ticket_revenue: new FormControl('', Validators.required),
                deployment_ticket_draft_day_of_month: new FormControl('', Validators.required),
                deployment_ticket_draft_routing: new FormControl('', Validators.required),
                deployment_ticket_draft_account: new FormControl('', Validators.required),
                deployment_ticket_draft_bank_name: new FormControl('', Validators.required),
                deployment_ticket_draft_note: new FormControl('', Validators.required),
                deployment_kiosks_price_per_hour: new FormControl('', Validators.required),
                deployment_status: new FormControl('', Validators.required)
            })
        });
  }

  get pageOne() {
    return this.addDeployment.controls.pageOne as FormGroup;
  }

  get pageTwo() {
    return this.addDeployment.controls.pageTwo as FormGroup;
  }

  revert() {
     this.addDeployment.reset();
   }


    onSubmit(form: FormGroup) {
     // console.log(form.value.pageOne);
     // console.log(form.value.pageOne);
     this.submitted = true;
     this.services.addDeployment(form.value.pageOne, form.value.pageTwo)
    .subscribe( response => {

        if (response['status'] === 1) {
          this.showMessage = true;
          this.messageText = response['message'];
          this.messageClass = 'success';

          this.cdRef.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/deployments']);
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
