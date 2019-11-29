import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { DeploymentService } from '../deployment.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-pass-rates',
  templateUrl: './add-pass-rates.component.html',
  styleUrls: ['./add-pass-rates.component.css']
})
export class AddPassRatesComponent implements OnInit {

  addDeploymentPassRate: FormGroup;
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

        this.addDeploymentPassRate = this.fb.group({
          deployment_id: [this.ar.snapshot.params['deploymentId'], Validators.required],
          deployment_pass_rate_name: ['', Validators.required],
          deployment_pass_rate_day: ['', Validators.required],
          deployment_pass_rate_cost: ['', Validators.required],
          deployment_pass_rate_status: ['', Validators.required]
      });
  }


  revert() {
     this.addDeploymentPassRate.reset();
   }


    onSubmit(form: FormGroup) {
     this.submitted = true;
     this.services.addDeploymentPassRate(form.value)
    .subscribe( response => {

        if(response['status'] === 1) {
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
