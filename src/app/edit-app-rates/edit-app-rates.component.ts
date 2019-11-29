import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { DeploymentService } from '../deployment.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-app-rates',
  templateUrl: './edit-app-rates.component.html',
  styleUrls: ['./edit-app-rates.component.css']
})
export class EditAppRatesComponent implements OnInit {

  addDeploymentAppRate: FormGroup;
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
        this.getDeploymentAppRateDetails();
  }

  getDeploymentAppRateDetails() {

     this.services.getDeploymentAppRateDetails(this.ar.snapshot.params['Id'])
     .subscribe( (response) => {
           if ( response['status'] === 1) {
            this.addDeploymentAppRate = this.fb.group({
              deployment_app_rate_id: [response['body']['deployment_app_rate_id'] , Validators.required],
              deployment_id: [response['body']['deployment_id'] , Validators.required],
              deployment_app_rate_rate: [response['body']['deployment_app_rate_rate'] , Validators.required],
              deployment_app_rate_minutes: [response['body']['deployment_app_rate_minutes'] , Validators.required],
              deployment_app_rate_status: [response['body']['deployment_app_rate_status'] , Validators.required]
          });
          this.isPageLoadded = true;
          this.cdRef.detectChanges();
           }
     });

  }


  revert() {
     this.addDeploymentAppRate.reset();
   }


    onSubmit(form: FormGroup) {
     this.submitted = true;
     this.services.updateDeploymentAppRate(form.value)
    .subscribe( response => {

        if(response['status'] === 1) {
          this.showMessage = true;
          this.messageText = response['message'];
          this.messageClass = 'success';

          this.cdRef.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/deployments', this.ar.snapshot.params['deploymentId'], 'app-rate']);
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
