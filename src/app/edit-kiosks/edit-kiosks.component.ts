import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-kiosks',
  templateUrl: './edit-kiosks.component.html',
  styleUrls: ['./edit-kiosks.component.css']
})
export class EditKiosksComponent implements OnInit {

  editKiosks: FormGroup;
  submitted = false;
	
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
  
	  this.editKiosks = this.fb.group({
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
	   this.editKiosks.reset();
	   }

	  onSubmit(form: FormGroup)
	  {
		this.submitted = true;

		 console.log(form);

	  }

}
