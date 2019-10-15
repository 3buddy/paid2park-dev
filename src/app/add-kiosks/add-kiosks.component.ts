import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-kiosks',
  templateUrl: './add-kiosks.component.html',
  styleUrls: ['./add-kiosks.component.css']
})
export class AddKiosksComponent implements OnInit {

  addKiosks: FormGroup;
  submitted = false;
	
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
  
	  this.addKiosks = this.fb.group({
			kiosksNumber: ['', Validators.required],
			MacAddress: ['', Validators.required],
			GUID: ['', Validators.required],
			Password: ['', Validators.required],
			LocationAddress: ['', Validators.required],
			City: ['', Validators.required],
			NetworkLogin: ['', Validators.required],
			NetworkPassword: ['', Validators.required]
		  });
  }
  
  
	  revert() {
	   this.addKiosks.reset();
	   }

	  onSubmit(form: FormGroup)
	  {
		this.submitted = true;

		 console.log(form);

	  }


}
