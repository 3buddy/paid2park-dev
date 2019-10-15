import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl , FormArray} from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-securityroles',
  templateUrl: './edit-securityroles.component.html',
  styleUrls: ['./edit-securityroles.component.css']

})




export class EditSecurityrolesComponent implements OnInit {

  
  addRole: FormGroup;
  submitted = false;
  roleId:number;
  roledetails:any;

   claimsList = {

    Deployment :[ 
         { name: 'Add New',  selected: true, id: 1  } ,
         { name: 'Allow Edit',  selected: false, id: 2 },
         { name: 'Allow Edit',  selected: false, id: 3  },
         { name: 'See Info Only',  selected: false, id: 4  },
         { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Kiosks : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Allow Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Customers : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Allow Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Reports : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Allow Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Enforcements : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Allow Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ],
    Payments : [
      { name: 'Add New',  selected: true, id: 1  } ,
      { name: 'Allow Edit',  selected: false, id: 2 },
      { name: 'Allow Edit',  selected: false, id: 3  },
      { name: 'See Info Only',  selected: false, id: 4  },
      { name: 'N/A (Unavailable)',  selected: false, id: 5  }
    ]
  }
  
	
  constructor(private fb: FormBuilder, private _ar : ActivatedRoute , private route :Router,private _US : UserService) { }

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
   


      //console.log(this._ar.snapshot.params['roleId']);

         this._US.getRoleDetails(this._ar.snapshot.params['roleId'])
         .subscribe(response=>{
           if(response['status'] == 1)
           {
            this.roledetails = response['body'];
           }
              
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
     this.submitted = true;
     console.log(form);
  
  }

}
