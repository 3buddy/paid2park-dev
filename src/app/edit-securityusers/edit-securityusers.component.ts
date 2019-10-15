import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-securityusers',
  templateUrl: './edit-securityusers.component.html',
  styleUrls: ['./edit-securityusers.component.css']
})
export class EditSecurityusersComponent implements OnInit {

  editUser: FormGroup;
	submitted = false;
	
    constructor(private fb: FormBuilder) { }

  ngOnInit() {
     
	  
	  this.editUser = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Title: ['', Validators.required],
      Office: ['', Validators.required],
      Email: ['', [Validators.required , Validators.email]],
      Login: ['', Validators.required],
      Password: ['', Validators.required],
      Role: ['', Validators.required],
      Active: ['', Validators.required]
      });
  
  }
  
  revert() {
   this.editUser.reset();
   }
  
  onSubmit(form: FormGroup)
  {
     this.submitted = true;
     console.log(form);
  
  }

}
