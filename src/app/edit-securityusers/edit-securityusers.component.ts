import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import {  UserService  } from '../user.service';


@Component({
  selector: 'app-edit-securityusers',
  templateUrl: './edit-securityusers.component.html',
  styleUrls: ['./edit-securityusers.component.css']
})
export class EditSecurityusersComponent implements OnInit {

  editUser: FormGroup;
  submitted = false;
  pageLoad:boolean;

  showMessage:Promise<boolean>;
  messageClass:string = '';
  messageText:string = '';

  activeData : Array<string> = ['YES','NO'];
  roleData : [];
	
    constructor(private _CD:ChangeDetectorRef,private fb: FormBuilder,private US:UserService , private route : Router , private _ar : ActivatedRoute) { }

    ngOnInit() {

      this.getRoleList();

      try
      {  
      this.getUserDetails()
      }
      catch(error)
      {
       console.log(error);
      }
   }


   getRoleList()
   {
     this.US.getRole()
     .subscribe( response => {
         this.roleData = response['body'];
     })
   }

   getUserDetails()
   {

     console.log(this._ar.snapshot.params['userId']);
       this.US.getuserdetails(this._ar.snapshot.params['userId'])
       .subscribe((response) =>{
          console.table(response);
        this.editUser = this.fb.group({
          user_id : [response['body']['user_id'], Validators.required],
          user_fname: [response['body']['user_fname'], Validators.required],
          user_lname: [response['body']['user_lname'], Validators.required],
          user_title: [response['body']['user_title'], Validators.required],
          user_office: [response['body']['user_office'], Validators.required],
          user_email: [response['body']['user_email'], [Validators.required , Validators.email]],
          user_login: [response['body']['user_login'], Validators.required],
          user_password: [''],
          user_role_id: [response['body']['user_role_id'], Validators.required],
          user_isactive: [response['body']['user_isactive'], Validators.required]
          });
          
          
          this.pageLoad = true;
          this._CD.detectChanges();

       });
   }

  
  revert() {
   this.editUser.reset();
   }
  
  onSubmit(form: FormGroup)
  {
     this.US.updateUser(form.value)
    .subscribe( response => {
          
          if(response['status'] === 1)
          {
            this.showMessage = Promise.resolve(true);
            this.messageText = response['message'];
            this.messageClass = 'success';
            this._CD.detectChanges();

            setTimeout(() => {
              this.route.navigate(['/securityusers']);
             }, 3000);
          }
          else
          {
            this.showMessage = Promise.resolve(true);
            this.messageText = response['message'];
            this.messageClass = 'danger';
            this._CD.detectChanges();
          }
    })
  
  }

}
