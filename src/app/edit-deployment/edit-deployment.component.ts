import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { DeploymentService } from '../deployment.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-deployment',
  templateUrl: './edit-deployment.component.html',
  styleUrls: ['./edit-deployment.component.css']
})
export class EditDeploymentComponent implements OnInit {

  addDeployment: FormGroup;
  submitted = false;
  isLinear = false;

  showMessage: boolean;
  messageClass: string;
  messageText: string;
  isPageLaded: boolean;
  activeData: Array<string> = ['YES', 'NO'];

  constructor(
      private fb: FormBuilder,
      private services: DeploymentService,
      private router: Router,
      private ar: ActivatedRoute,
      private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getDeploymentsDetails();
  }

  getDeploymentsDetails() {

    this.services.getDeploymentDetails(this.ar.snapshot.params['deploymentId'])
    .subscribe( (response) => {

      if ( response['status'] === 1 ) {

            this.addDeployment = new FormGroup({
              pageOne: new FormGroup({
                  deployment_id: new FormControl(response['body']['deployment_id'], Validators.required),
                  deployment_assign_id: new FormControl(response['body']['deployment_assign_id'], Validators.required),
                  deployment_name: new FormControl(response['body']['deployment_name'], Validators.required),
                  deployment_billing_address: new FormControl(response['body']['deployment_billing_address'], Validators.required),
                  deployment_billing_city: new FormControl(response['body']['deployment_billing_city'], Validators.required),
                  deployment_billing_state: new FormControl(response['body']['deployment_billing_state'], Validators.required),
                  deployment_billing_zip: new FormControl(response['body']['deployment_billing_zip'], Validators.required),
                  deployment_billing_phone_contact: new FormControl(response['body']['deployment_billing_phone_contact'], Validators.required),
                  deployment_billing_phone: new FormControl(response['body']['deployment_billing_phone'], Validators.required),
                  deployment_billing_email: new FormControl(response['body']['deployment_billing_email'], [Validators.required, Validators.email]),
                  deployment_min_minutes_to_park: new FormControl(response['body']['deployment_min_minutes_to_park'], Validators.required),
                  deployment_parking_charge_times: new FormControl(response['body']['deployment_parking_charge_times'], Validators.required),
                  deployment_monday_start: new FormControl(response['body']['deployment_monday_start'], Validators.required),
                  deployment_monday_end: new FormControl(response['body']['deployment_monday_end'], Validators.required),
                  deployment_tuesday_start: new FormControl(response['body']['deployment_tuesday_start'], Validators.required),
                  deployment_tuesday_end: new FormControl(response['body']['deployment_tuesday_end'], Validators.required),
                  deployment_wednesday_start: new FormControl(response['body']['deployment_wednesday_start'], Validators.required),
                  deployment_wednesday_end: new FormControl(response['body']['deployment_wednesday_end'], Validators.required),
                  deployment_thursday_start: new FormControl(response['body']['deployment_thursday_start'], Validators.required),
                  deployment_thursday_end: new FormControl(response['body']['deployment_thursday_end'], Validators.required),
                  deployment_friday_start: new FormControl(response['body']['deployment_friday_start'], Validators.required),
                  deployment_friday_end: new FormControl(response['body']['deployment_friday_end'], Validators.required),
                  deployment_saturday_start: new FormControl(response['body']['deployment_saturday_start'], Validators.required),
                  deployment_saturday_end: new FormControl(response['body']['deployment_saturday_end'], Validators.required),
                  deployment_sunday_start: new FormControl(response['body']['deployment_sunday_start'], Validators.required),
                  deployment_sunday_end: new FormControl(response['body']['deployment_sunday_end'], Validators.required),
              }),
              pageTwo: new FormGroup({
                  deployment_parking_percentage: new FormControl(response['body']['deployment_parking_percentage'], Validators.required),
                  deployment_tickets_percentage: new FormControl(response['body']['deployment_tickets_percentage'], Validators.required),
                  deployment_ticket_transaction_charges: new FormControl(response['body']['deployment_ticket_transaction_charges'], Validators.required),
                  deployment_monthly_service_charge_parking: new FormControl(response['body']['deployment_monthly_service_charge_parking'], Validators.required),
                  deployment_monthly_service_charge_enforcement: new FormControl(response['body']['deployment_monthly_service_charge_enforcement'], Validators.required),
                  deployment_bill_day_of_month: new FormControl(response['body']['deployment_bill_day_of_month'], Validators.required),
                  deployment_min_monthly_bill: new FormControl(response['body']['deployment_min_monthly_bill'], Validators.required),
                  deployment_parking_revenue: new FormControl(response['body']['deployment_parking_revenue'], Validators.required),
                  deployment_parking_draft_day_of_month: new FormControl(response['body']['deployment_parking_draft_day_of_month'], Validators.required),
                  deployment_parking_draft_routing: new FormControl(response['body']['deployment_parking_draft_routing'], Validators.required),
                  deployment_parking_draft_account: new FormControl(response['body']['deployment_parking_draft_account'], Validators.required),
                  deployment_parking_draft_bank_name: new FormControl(response['body']['deployment_parking_draft_bank_name'], Validators.required),
                  deployment_parking_draft_note: new FormControl(response['body']['deployment_parking_draft_note'], Validators.required),
                  deployment_ticket_revenue: new FormControl(response['body']['deployment_ticket_revenue'], Validators.required),
                  deployment_ticket_draft_day_of_month: new FormControl(response['body']['deployment_ticket_draft_day_of_month'], Validators.required),
                  deployment_ticket_draft_routing: new FormControl(response['body']['deployment_ticket_draft_routing'], Validators.required),
                  deployment_ticket_draft_account: new FormControl(response['body']['deployment_ticket_draft_account'], Validators.required),
                  deployment_ticket_draft_bank_name: new FormControl(response['body']['deployment_ticket_draft_bank_name'], Validators.required),
                  deployment_ticket_draft_note: new FormControl(response['body']['deployment_ticket_draft_note'], Validators.required),
                  deployment_kiosks_price_per_hour: new FormControl(response['body']['deployment_kiosks_price_per_hour'], Validators.required),
                  deployment_status: new FormControl(response['body']['deployment_status'], Validators.required)
              })
          });
            this.isPageLaded = true;
            this.cdRef.detectChanges();
      }
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
    this.services.updateDeployment(form.value.pageOne, form.value.pageTwo)
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
