import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { Router } from '@angular/router';


import { UserService } from '../user.service'

@Component({
  selector: 'app-add-security-user',
  templateUrl: './add-security-user.component.html',
  styleUrls: ['./add-security-user.component.css']
})
export class AddSecurityUserComponent implements OnInit {

  addUser: FormGroup;
  submitted = false;

  showMessage:Promise<boolean>;
  messageClass:string = '';
  messageText:string = '';
  
  activeData : Array<string> = ['YES','NO'];
  roleDate : [];
	
  constructor(private fb: FormBuilder , private US : UserService , private router :Router,private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
     
    this.getRoleList();
    
	  this.addUser = this.fb.group({
      user_fname: ['', Validators.required],
      user_lname: ['', Validators.required],
      user_title: ['', Validators.required],
      user_office: ['', Validators.required],
      user_email: ['', [Validators.required , Validators.email]],
      user_login: ['', Validators.required],
      user_password: ['', Validators.required],
      user_role_id: ['', Validators.required],
      user_isactive: ['', Validators.required]
      });
  
  }

  
  getRoleList()
  {
    this.US.getRole()
    .subscribe( response => {
        this.roleDate = response['body'];
    })
  }

  revert() {
   this.addUser.reset();
   }
  
  onSubmit(form: FormGroup)
  {
    this.US.addUser(form.value)
    .subscribe( response => {
          
          if(response['status'] === 1)
          {
            this.showMessage = Promise.resolve(true);
            this.messageText = response['message'];
            this.messageClass = 'success';
            this.cdRef.detectChanges();

            setTimeout(() => {
              this.router.navigate(['/securityusers']);
             }, 3000);
          }
          else
          {
            this.showMessage = Promise.resolve(true);
            this.messageText = response['message'];
            this.messageClass = 'danger';
            this.cdRef.detectChanges();
          }
    })
    
  
  }

}
