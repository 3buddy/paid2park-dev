import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl , FormArray} from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-security-role',
  templateUrl: './add-security-role.component.html',
  styleUrls: ['./add-security-role.component.css']
})
export class AddSecurityRoleComponent implements OnInit {

  addRole: FormGroup;
  submitted = false;

  showMessage:boolean = false;
  messageClass:string = '';
  messageText:string = '';


   claimsList = {

    Deployment :[ 
         { name: 'Add New',  selected: true, id: 1  } ,
         { name: 'Allow Edit',  selected: false, id: 2 },
         { name: 'Both New and Edit',  selected: false, id: 3  },
         { name: 'See Info Only',  selected: false, id: 4  },
         { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Kiosks : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Both New and Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Customers : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Both New and Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Reports : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Both New and Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Enforcements : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Both New and Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Payments : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Both New and Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ]
  }
  
	
  constructor(private fb: FormBuilder , protected _US : UserService,protected router : Router, private cd : ChangeDetectorRef) { }

  ngOnInit() {
     
    const deploymentCntrol = this.claimsList.Deployment.map(deployment => { return this.fb.control(deployment.selected); });
    const kiosksCntrol = this.claimsList.Kiosks.map(kiosk => { return this.fb.control(kiosk.selected); });
    const customerCntrol = this.claimsList.Customers.map(Customer => { return this.fb.control(Customer.selected); });
    const reportsCntrol = this.claimsList.Reports.map(reports => { return this.fb.control(reports.selected); });
    const enforcementsCntrol = this.claimsList.Enforcements.map(enforcements => { return this.fb.control(enforcements.selected); });
    const paymentsCntrol = this.claimsList.Payments.map(payments => { return this.fb.control(payments.selected); });
    
	  this.addRole = this.fb.group({
      RoleName: ['', Validators.required],
      Deployment:  new FormArray(kiosksCntrol),
      Kiosks:  new FormArray(deploymentCntrol),
      Customers:  new FormArray(customerCntrol),
      Reports:  new FormArray(reportsCntrol),
      Enforcements:  new FormArray(enforcementsCntrol),
      Payments:  new FormArray(paymentsCntrol)
      });

    
  }


  onCheckDeployment(form: FormGroup)
  {
    //console.log(form);
  }

  onCheckKiosks($event)
  {

  }

  onCheckCustomers(form: FormGroup)
  {

  }

  onCheckReports(form: FormGroup)
  {

  }

  onCheckEnforcements(form: FormGroup)
  {

  }

  onCheckPayments(form: FormGroup)
  {

  }



  
  
  revert() {
   this.addRole.reset();
   }
  
  onSubmit(form: FormGroup)
  {
    //console.log(form.value);
     //this.submitted = true;

     

    let role = {
      "role_name":form.value.RoleName,
      "role_permission":[{
          "Deployment":[
            {
              "Add New"            : form.value.Deployment[0] ? "YES" : "NO",
              "Allow Edit"         : form.value.Deployment[1] ? "YES" : "NO", 
              "Both New and Edit"  : form.value.Deployment[2] ? "YES" : "NO",
              "See Info Only"      : form.value.Deployment[3] ? "YES" : "NO", 
              "N/A (Unavailable)"  : form.value.Deployment[4] ? "YES" : "NO"
            }
          ],
          "Customers":[
            {
              "Add New"            : form.value.Customers[0] ? "YES" : "NO",
              "Allow Edit"         : form.value.Customers[1] ? "YES" : "No",
              "Both New and Edit"  : form.value.Customers[2] ? "YES" : "NO",
              "See Info Only"      : form.value.Customers[3] ?  "YES" : "NO",
              "N/A (Unavailable)"  : form.value.Customers[4] ? "YES" : "NO" 
            }
          ],
          "Kiosks":[
            {
              "Add New"            : form.value.Kiosks[0] ? "YES" : "NO",
              "Allow Edit"         : form.value.Kiosks[1] ? "YES" : "NO",
              "Both New and Edit"  : form.value.Kiosks[2] ? "YES" : "NO",
              "See Info Only"      : form.value.Kiosks[3] ? "YES" : "NO",
              "N/A (Unavailable)"  : form.value.Kiosks[4] ? "YES" : "NO"
            }
          ],
          "Payments":[
            {
              "Add New"            : form.value.Payments[0] ? "YES" : "NO",
              "Allow Edit"         : form.value.Payments[1] ? "YES" : "NO",
              "Both New and Edit"  : form.value.Payments[2] ? "YES" : "NO",
              "See Info Only"      : form.value.Payments[3] ? "YES" : "NO",
              "N/A (Unavailable)"  : form.value.Payments[4] ? "YES" : "NO"
            }
          ],
          "Enforcements":[
            {
              "Add New"            : form.value.Enforcements[0] ? "YES" : "NO",
              "Allow Edit"         : form.value.Enforcements[1] ? "YES" : "NO",
              "Both New and Edit"  : form.value.Enforcements[2] ? "YES" : "NO",
              "See Info Only"      : form.value.Enforcements[3] ? "YES" : "NO",
              "N/A (Unavailable)"  : form.value.Enforcements[4] ? "YES" : "NO" 
            }
          ],
          "Reports":[
            {
              "Add New"            : form.value.Reports[0] ? "YES" : "NO",
              "Allow Edit"         : form.value.Reports[1] ? "YES" : "NO",
              "Both New and Edit"  : form.value.Reports[2] ? "YES" : "NO",
              "See Info Only"      : form.value.Reports[3] ? "YES" : "NO",
              "N/A (Unavailable)"  : form.value.Reports[4] ? "YES" : "NO"
            }
          ]
        }]
    }
    // console.log(form);

    this._US.addRole(role)
    .subscribe(response =>{
        if(response['status'] === 1)
        {
            this.showMessage = true;
            this.messageText = response['message'];
            this.messageClass = 'success';
            this.cd.detectChanges();
            setTimeout(() => {
              this.router.navigate(['/securityroles']);
             }, 3000);
            
        }
        else
        {
          this.showMessage = true;
          this.messageText = response['message'];
          this.messageClass = 'danger';
          this.cd.detectChanges();
        }
         
          
        });
    
  
  }

}
