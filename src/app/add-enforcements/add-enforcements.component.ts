import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { EnforcementService } from '../enforcement.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-enforcements',
  templateUrl: './add-enforcements.component.html',
  styleUrls: ['./add-enforcements.component.css']
})
export class AddEnforcementsComponent implements OnInit {

  addEnforcements: FormGroup;
  submitted = false;

    showMessage: boolean;
    messageClass: string;
    messageText: string;

    constructor(
      private fb: FormBuilder ,
      private services: EnforcementService,
      private cdRef: ChangeDetectorRef,
      private router: Router
      ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addEnforcements = this.fb.group({
      enforcements_assign_id           : ['', Validators.required],
      enforcements_first_name          : ['', Validators.required],
      enforcements_last_name           : ['', Validators.required],
      enforcements_address             : ['', Validators.required],
      enforcements_city                : ['', Validators.required],
      enforcements_state               : ['', Validators.required],
      enforcements_zip                 : ['', Validators.required],
      enforcements_phone               : ['', Validators.required],
      enforcements_email               : ['', [Validators.required, Validators.email]],
      enforcements_dob                 : ['', Validators.required],
      enforcements_ss                  : ['', Validators.required],
      enforcements_hire_date           : ['', Validators.required],
      enforcements_start_date          : ['', Validators.required],
      enforcements_app_login           : ['', Validators.required],
      enforcements_app_password        : ['', Validators.required],
      enforcements_hours_desired       : ['', Validators.required],
      enforcements_wage                : ['', Validators.required],
      enforcements_ticket_bonus        : ['', Validators.required],
      enforcements_w_4_with_holding    : ['', Validators.required],
      enforcements_start_with_holding  : ['', Validators.required],
      enforcements_comp_rate           : ['', Validators.required],
      enforcements_ot_rate             : ['', Validators.required]
    });
  }

  revert() {
   this.addEnforcements.reset();
   }

  onSubmit(form: FormGroup) {
    // console.log(form);

     this.services.addEnforcements(form.value).subscribe( (response) => {

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
