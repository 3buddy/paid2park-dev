import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { DeploymentService } from '../deployment.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-app-rates',
  templateUrl: './add-app-rates.component.html',
  styleUrls: ['./add-app-rates.component.css']
})
export class AddAppRatesComponent implements OnInit {

  addDeploymentAppRate: FormGroup;
  submitted = false;

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

        this.addDeploymentAppRate = this.fb.group({
          deployment_id: [this.ar.snapshot.params['deploymentId'], Validators.required],
          deployment_app_rate_rate: ['', Validators.required],
          deployment_app_rate_minutes: ['', Validators.required],
          deployment_app_rate_status: ['', Validators.required]
      });
  }


  revert() {
     this.addDeploymentAppRate.reset();
   }


    onSubmit(form: FormGroup) {
     this.submitted = true;
     this.services.addDeploymentAppRate(form.value)
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
