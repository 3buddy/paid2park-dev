import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { EnforcementService } from '../enforcement.service';

@Component({
  selector: 'app-edit-enforcements',
  templateUrl: './edit-enforcements.component.html',
  styleUrls: ['./edit-enforcements.component.css']
})
export class EditEnforcementsComponent implements OnInit {

  editEnforcements: FormGroup;
  submitted = false;
  loadThePage: boolean;

  showMessage: boolean;
  messageClass: string;
  messageText: string;
  activeData: Array<string> = ['YES', 'NO'];

    constructor(
      private fb: FormBuilder,
      private services: EnforcementService,
      private ar: ActivatedRoute,
      private router: Router,
      private cdRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.services.getEnforcementsDetails(this.ar.snapshot.params['Id']).subscribe( (response) => {

          if (response['status'] === 1 ) {

                this.editEnforcements = this.fb.group({
                  enforcements_id                  : [response['body']['enforcements_id'], Validators.required],
                  enforcements_assign_id           : [response['body']['enforcements_assign_id'], Validators.required],
                  enforcements_first_name          : [response['body']['enforcements_first_name'], Validators.required],
                  enforcements_last_name           : [response['body']['enforcements_last_name'], Validators.required],
                  enforcements_address             : [response['body']['enforcements_address'], Validators.required],
                  enforcements_city                : [response['body']['enforcements_city'], Validators.required],
                  enforcements_state               : [response['body']['enforcements_state'], Validators.required],
                  enforcements_zip                 : [response['body']['enforcements_zip'], Validators.required],
                  enforcements_phone               : [response['body']['enforcements_phone'], Validators.required],
                  enforcements_email               : [response['body']['enforcements_email'], [Validators.required, Validators.email]],
                  enforcements_dob                 : [response['body']['enforcements_dob'], Validators.required],
                  enforcements_ss                  : [response['body']['enforcements_ss'], Validators.required],
                  enforcements_hire_date           : [response['body']['enforcements_hire_date'], Validators.required],
                  enforcements_start_date          : [response['body']['enforcements_start_date'], Validators.required],
                  enforcements_app_login           : [response['body']['enforcements_app_login'], Validators.required],
                  enforcements_app_password        : [''],
                  enforcements_hours_desired       : [response['body']['enforcements_hours_desired'], Validators.required],
                  enforcements_wage                : [response['body']['enforcements_wage'], Validators.required],
                  enforcements_ticket_bonus        : [response['body']['enforcements_ticket_bonus'], Validators.required],
                  enforcements_w_4_with_holding    : [response['body']['enforcements_w_4_with_holding'], Validators.required],
                  enforcements_start_with_holding  : [response['body']['enforcements_start_with_holding'], Validators.required],
                  enforcements_comp_rate           : [response['body']['enforcements_comp_rate'], Validators.required],
                  enforcements_ot_rate             : [response['body']['enforcements_ot_rate'], Validators.required],
                  enforcements_status              : [response['body']['enforcements_status'], Validators.required]
                  });

                this.loadThePage = true;
                this.cdRef.detectChanges();
          }
    });



  }

  revert() {
   this.editEnforcements.reset();
   }

   onSubmit(form: FormGroup) {
     console.log(form.value);

     this.services.updateEnforcements(form.value).subscribe( (response) => {

      if (response['status'] === 1) {
        this.showMessage = true;
        this.messageText = response['message'];
        this.messageClass = 'success';

        this.cdRef.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/enforcements']);
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
