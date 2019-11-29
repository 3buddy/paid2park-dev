import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { DeploymentService } from '../deployment.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-pass-rates',
  templateUrl: './edit-pass-rates.component.html',
  styleUrls: ['./edit-pass-rates.component.css']
})
export class EditPassRatesComponent implements OnInit {

  addDeploymentPassRate: FormGroup;
  submitted = false;

  showMessage: boolean;
  messageClass: string;
  messageText: string;
  isPageLoadded: boolean;
  activeData: Array<string> = ['YES', 'NO'];

  constructor(
      private fb: FormBuilder,
      private services: DeploymentService,
      private router: Router,
      private ar: ActivatedRoute,
      private cdRef: ChangeDetectorRef) { }


  ngOnInit() {
      this.getDeploymentPassRateDetails();
  }

  getDeploymentPassRateDetails() {
    this.services.getDeploymentPassRateDetails(this.ar.snapshot.params['Id'])
    .subscribe( (response) => {

      if ( response['status'] === 1 ) {
            this.addDeploymentPassRate = this.fb.group({
              deployment_pass_rate_id: [ response['body']['deployment_pass_rate_id'], Validators.required],
              deployment_id: [ response['body']['deployment_id'], Validators.required],
              deployment_pass_rate_name: [ response['body']['deployment_pass_rate_name'] , Validators.required],
              deployment_pass_rate_day: [ response['body']['deployment_pass_rate_day'], Validators.required],
              deployment_pass_rate_cost: [ response['body']['deployment_pass_rate_cost'], Validators.required],
              deployment_pass_rate_status: [response['body']['deployment_pass_rate_status'], Validators.required]
          });
          this.isPageLoadded = true;
          this.cdRef.detectChanges();
      }
   });
  }


  revert() {
     this.addDeploymentPassRate.reset();
   }


    onSubmit(form: FormGroup) {
     this.submitted = true;
     this.services.updateDeploymentPassRate(form.value)
    .subscribe( response => {

        if (response['status'] === 1) {
          this.showMessage = true;
          this.messageText = response['message'];
          this.messageClass = 'success';

          this.cdRef.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/deployments', this.ar.snapshot.params['deploymentId'], 'pass-rate']);
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
