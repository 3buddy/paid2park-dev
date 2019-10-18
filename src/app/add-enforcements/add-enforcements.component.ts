import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-enforcements',
  templateUrl: './add-enforcements.component.html',
  styleUrls: ['./add-enforcements.component.css']
})
export class AddEnforcementsComponent implements OnInit {

  addEnforcements: FormGroup;
  submitted = false;
	
    constructor(private fb: FormBuilder) { }

  ngOnInit() {
     
	  
	  this.addEnforcements = this.fb.group({
        Id: ['', Validators.required],
        LastName: ['', Validators.required],
        FirstName: ['', Validators.required],
		Address: ['', Validators.required],
        City: ['', Validators.required],
        State: ['', Validators.required],
		Zip: ['', Validators.required],
        Phone: ['', Validators.required],
        Email: ['', Validators.required],
		DOB: ['', Validators.required],
        SS: ['', Validators.required],
        HireDate: ['', Validators.required],
		StartDate: ['', Validators.required],
        AppLogin: ['', Validators.required],
        AppPassword: ['', Validators.required],
		HoursDesired: ['', Validators.required],
        Wage: ['', [ Validators.required, Validators.email]],
        TicketBonus: ['', Validators.required],
		W4Withholding: ['', Validators.required],
		StateWithholding: ['', Validators.required],
		CompRate: ['', Validators.required],
		OTRate: ['', Validators.required]
      });
  
  }
  
  revert() {
   this.addEnforcements.reset();
   }
  
  onSubmit(form: FormGroup)
  {
     this.submitted = true;
     console.log(form);
  
  }

}