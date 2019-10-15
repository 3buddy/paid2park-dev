import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.component.html',
  styleUrls: ['./add-vehicles.component.css']
})
export class AddVehiclesComponent implements OnInit {

  addVehicles: FormGroup;
  submitted = false;
	
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
     
	  this.addVehicles = this.fb.group({
        License: ['', Validators.required],
        Make: ['', Validators.required],
        Model: ['', Validators.required],
		Color: ['', Validators.required]
      });
  
  }
  
  revert() {
   this.addVehicles.reset();
   }
  
  onSubmit(form: FormGroup)
  {
    this.submitted = true;
  
     console.log(form);
  
  }

}
