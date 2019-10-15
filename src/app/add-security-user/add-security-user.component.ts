import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-security-user',
  templateUrl: './add-security-user.component.html',
  styleUrls: ['./add-security-user.component.css']
})
export class AddSecurityUserComponent implements OnInit {

  addUser: FormGroup;
	submitted = false;
	
    constructor(private fb: FormBuilder) { }

  ngOnInit() {
     
	  
	  this.addUser = this.fb.group({
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
   this.addUser.reset();
   }
  
  onSubmit(form: FormGroup)
  {
     this.submitted = true;
     console.log(form);
  
  }

}
