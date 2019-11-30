import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  roleId: number;

  testPage: boolean;
  testPromise: Promise<boolean>;
  pageLoad: boolean;
  claimsList;

  showMessage: boolean;
  messageClass: string;
  messageText: string;

  constructor(
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private route: Router,
    private _US: UserService,
    private _CD: ChangeDetectorRef) {  }

  ngOnInit() {

    try {
       this.getRoleDetails();
    } catch (error) {
       console.log(error);
    }
  }


  getRoleDetails() {
     this._US.getRoleDetails(this.ar.snapshot.params['roleId'])
    .subscribe( response => {
        console.table(response['body']['role_permission']);
        this.claimsList = {

        Deployment : [
          {
            name: 'Add New',
            selected: response['body']['role_permission'][0]['Deployment'][0]['Add New'] === 'YES' ? true : false,
             id: 1
          } ,
          {
            name: 'Allow Edit',
            selected: response['body']['role_permission'][0]['Deployment'][0]['Allow Edit'] === 'YES' ? true : false,
            id: 2
          },
          {
            name: 'Both New and Edit',
            selected: response['body']['role_permission'][0]['Deployment'][0]['Both New and Edit'] === 'YES' ? true : false,
             id: 3
          },
          {
            name: 'See Info Only',
            selected: response['body']['role_permission'][0]['Deployment'][0]['See Info Only'] === 'YES' ? true : false,
            id: 4
          },
          {
            name: 'N/A (Unavailable)',
            selected: response['body']['role_permission'][0]['Deployment'][0]['N/A (Unavailable)'] === 'YES' ? true : false,
            id: 5
          }
        ],
        Kiosks : [
          {
            name: 'Add New',
            selected: response['body']['role_permission'][0]['Kiosks'][0]['Add New'] === 'YES' ? true : false,
            id: 1
          } ,
          {
            name: 'Allow Edit',
            selected: response['body']['role_permission'][0]['Kiosks'][0]['Allow Edit'] === 'YES' ? true : false,
            id: 2
          },
          {
            name: 'Both New and Edit',
            selected: response['body']['role_permission'][0]['Kiosks'][0]['Both New and Edit'] === 'YES' ? true : false,
            id: 3
          },
          {
            name: 'See Info Only',
            selected: response['body']['role_permission'][0]['Kiosks'][0]['See Info Only'] === 'YES' ? true : false,
            id: 4
          },
          {
            name: 'N/A (Unavailable)',
            selected: response['body']['role_permission'][0]['Kiosks'][0]['N/A (Unavailable)'] === 'YES' ? true : false,
            id: 5
          }
        ],
        Customers : [
          {
            name: 'Add New',
            selected: response['body']['role_permission'][0]['Customers'][0]['Add New'] === 'YES' ? true : false,
            id: 1
          } ,
          {
            name: 'Allow Edit',
            selected: response['body']['role_permission'][0]['Customers'][0]['Allow Edit'] === 'YES' ? true : false,
            id: 2
          },
          {
            name: 'Both New and Edit',
            selected: response['body']['role_permission'][0]['Customers'][0]['Both New and Edit'] === 'YES' ? true : false,
            id: 3
          },
          {
            name: 'See Info Only',
            selected: response['body']['role_permission'][0]['Customers'][0]['See Info Only'] === 'YES' ? true : false,
            id: 4
          },
          {
            name: 'N/A (Unavailable)',
            selected: response['body']['role_permission'][0]['Customers'][0]['N/A (Unavailable)'] === 'YES' ? true : false,
            id: 5
          }
        ],
        Reports : [
          {
            name: 'Add New',
            selected: response['body']['role_permission'][0]['Reports'][0]['Add New'] === 'YES' ? true : false,
            id: 1
          },
          {
            name: 'Allow Edit',
            selected: response['body']['role_permission'][0]['Reports'][0]['Allow Edit'] === 'YES' ? true : false,
            id: 2
           },
          {
            name: 'Both New and Edit',
            selected: response['body']['role_permission'][0]['Reports'][0]['Both New and Edit'] === 'YES' ? true : false,
            id: 3
          },
          {
            name: 'See Info Only',
            selected: response['body']['role_permission'][0]['Reports'][0]['See Info Only'] === 'YES' ? true : false,
            id: 4
          },
          {
            name: 'N/A (Unavailable)',
            selected: response['body']['role_permission'][0]['Reports'][0]['N/A (Unavailable)'] === 'YES' ? true : false,
            id: 5
          }
        ],
        Enforcements : [
          {
            name: 'Add New',
            selected: response['body']['role_permission'][0]['Enforcements'][0]['Add New'] === 'YES' ? true : false,
            id: 1
          } ,
          {
            name: 'Allow Edit',
            selected: response['body']['role_permission'][0]['Enforcements'][0]['Allow Edit'] === 'YES' ? true : false,
            id: 2
          },
          {
            name: 'Both New and Edit',
            selected: response['body']['role_permission'][0]['Enforcements'][0]['Both New and Edit'] === 'YES' ? true : false,
            id: 3
          },
          {
            name: 'See Info Only',
            selected: response['body']['role_permission'][0]['Enforcements'][0]['See Info Only'] === 'YES' ? true : false,
            id: 4
          },
          {
            name: 'N/A (Unavailable)',
            selected: response['body']['role_permission'][0]['Enforcements'][0]['N/A (Unavailable)'] === 'YES' ? true : false,
            id: 5
          }
        ],
        Payments : [
          {
            name: 'Add New',
            selected: response['body']['role_permission'][0]['Payments'][0]['Add New'] === 'YES' ? true : false,
            id: 1
          } ,
          {
            name: 'Allow Edit',
            selected: response['body']['role_permission'][0]['Payments'][0]['Allow Edit'] === 'YES' ? true : false,
            id: 2
          },
          {
            name: 'Both New and Edit',
            selected: response['body']['role_permission'][0]['Payments'][0]['Both New and Edit'] === 'YES' ? true : false,
            id: 3
          },
          {
            name: 'See Info Only',
            selected: response['body']['role_permission'][0]['Payments'][0]['See Info Only'] === 'YES' ? true : false,
            id: 4
          },
          {
            name: 'N/A (Unavailable)',
            selected: response['body']['role_permission'][0]['Payments'][0]['N/A (Unavailable)'] === 'YES' ? true : false,
            id: 5
          }
        ]
      };

        const deploymentCntrol = this.claimsList.Deployment.map(deployment => { return this.fb.control(deployment.selected); });
        const kiosksCntrol = this.claimsList.Kiosks.map(kiosk => { return this.fb.control(kiosk.selected); });
        const customerCntrol = this.claimsList.Customers.map(Customer => { return this.fb.control(Customer.selected); });
        const reportsCntrol = this.claimsList.Reports.map(reports => { return this.fb.control(reports.selected); });
        const enforcementsCntrol = this.claimsList.Enforcements.map(enforcements => { return this.fb.control(enforcements.selected); });
        const paymentsCntrol = this.claimsList.Payments.map(payments => { return this.fb.control(payments.selected); });

        this.addRole = this.fb.group({
        Role_Id: [response['body']['role_id'], Validators.required],
        RoleName: [response['body']['role_name'], Validators.required],
        Deployment:  new FormArray(deploymentCntrol),
        Kiosks:  new FormArray(kiosksCntrol),
        Customers:  new FormArray(customerCntrol),
        Reports:  new FormArray(reportsCntrol),
        Enforcements:  new FormArray(enforcementsCntrol),
        Payments:  new FormArray(paymentsCntrol)
        });

        this.pageLoad = true;
        this._CD.detectChanges();
    });
  }

  onCheckDeployment(form: FormGroup) {
  }

  onCheckKiosks($event) {
  }

  onCheckCustomers(form: FormGroup) {
  }

  onCheckReports(form: FormGroup) {
  }

  onCheckEnforcements(form: FormGroup) {

  }

  onCheckPayments(form: FormGroup) {

  }


  revert() {
   this.addRole.reset();
   }

  onSubmit(form: FormGroup)  {
       const role = {
        role_id: form.value.Role_Id,
        role_name: form.value.RoleName,
        role_permission: [{
            Deployment: [
              {
                'Add New'            : form.value.Deployment[0] ? 'YES' : 'NO',
                'Allow Edit'         : form.value.Deployment[1] ? 'YES' : 'NO',
                'Both New and Edit'  : form.value.Deployment[2] ? 'YES' : 'NO',
                'See Info Only'      : form.value.Deployment[3] ? 'YES' : 'NO',
                'N/A (Unavailable)'  : form.value.Deployment[4] ? 'YES' : 'NO'
              }
            ],
            Customers: [
              {
                'Add New'            : form.value.Customers[0] ? 'YES' : 'NO',
                'Allow Edit'         : form.value.Customers[1] ? 'YES' : 'No',
                'Both New and Edit'  : form.value.Customers[2] ? 'YES' : 'NO',
                'See Info Only'      : form.value.Customers[3] ?  'YES' : 'NO',
                'N/A (Unavailable)'  : form.value.Customers[4] ? 'YES' : 'NO'
              }
            ],
            Kiosks: [
              {
                'Add New'            : form.value.Kiosks[0] ? 'YES' : 'NO',
                'Allow Edit'         : form.value.Kiosks[1] ? 'YES' : 'NO',
                'Both New and Edit'  : form.value.Kiosks[2] ? 'YES' : 'NO',
                'See Info Only'      : form.value.Kiosks[3] ? 'YES' : 'NO',
                'N/A (Unavailable)'  : form.value.Kiosks[4] ? 'YES' : 'NO'
              }
            ],
            Payments: [
              {
                'Add New'            : form.value.Payments[0] ? 'YES' : 'NO',
                'Allow Edit'         : form.value.Payments[1] ? 'YES' : 'NO',
                'Both New and Edit'  : form.value.Payments[2] ? 'YES' : 'NO',
                'See Info Only'      : form.value.Payments[3] ? 'YES' : 'NO',
                'N/A (Unavailable)'  : form.value.Payments[4] ? 'YES' : 'NO'
              }
            ],
            Enforcements: [
              {
                'Add New'            : form.value.Enforcements[0] ? 'YES' : 'NO',
                'Allow Edit'         : form.value.Enforcements[1] ? 'YES' : 'NO',
                'Both New and Edit'  : form.value.Enforcements[2] ? 'YES' : 'NO',
                'See Info Only'      : form.value.Enforcements[3] ? 'YES' : 'NO',
                'N/A (Unavailable)'  : form.value.Enforcements[4] ? 'YES' : 'NO'
              }
            ],
            Reports: [
              {
                'Add New'            : form.value.Reports[0] ? 'YES' : 'NO',
                'Allow Edit'         : form.value.Reports[1] ? 'YES' : 'NO',
                'Both New and Edit'  : form.value.Reports[2] ? 'YES' : 'NO',
                'See Info Only'      : form.value.Reports[3] ? 'YES' : 'NO',
                'N/A (Unavailable)'  : form.value.Reports[4] ? 'YES' : 'NO'
              }
            ]
          }]
      };

       this._US.updateRole(role)
       .subscribe(response => {
          if (response['status'] === 1)  {
              this.showMessage = true;
              this.messageText = response['message'];
              this.messageClass = 'success';
              this._CD.detectChanges();
              setTimeout(() => {
                this.route.navigate(['/securityroles']);
              }, 3000);
          } else {
            this.showMessage = true;
            this.messageText = response['message'];
            this.messageClass = 'danger';
            this._CD.detectChanges();
          }
          });
  }

}
