
import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { KioskService } from '../kiosk.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-kiosks',
  templateUrl: './edit-kiosks.component.html',
  styleUrls: ['./edit-kiosks.component.css']
})
export class EditKiosksComponent implements OnInit {

  editKiosks: FormGroup;
  submitted = false;

  isloaded: boolean;
  showMessage: boolean;
  messageClass: string;
  messageText: string;

  constructor(
       private router: Router,
       private ar: ActivatedRoute,
       private fb: FormBuilder,
       private ks: KioskService, 
       private cdRef: ChangeDetectorRef) { }


  ngOnInit() {

       this.ks.getKioskDetails(this.ar.snapshot.params['Id'])
       .subscribe(
          (response) => {

             if (response['status'] === 1) {
            this.isloaded = true;
            this.editKiosks = this.fb.group({
                kiosk_Id: [response['body']['kiosk_Id'], Validators.required],
                kiosks_number: [response['body']['kiosks_number'], Validators.required],
                kiosks_mac_address: [response['body']['kiosks_mac_address'], Validators.required],
                kiosks_guid: [response['body']['kiosks_guid'], Validators.required],
                kiosks_password: [''],
                kiosks_location_address: [response['body']['kiosks_location_address'], Validators.required],
                kiosks_city: [response['body']['kiosks_city'], Validators.required],
                kiosks_network_login: [response['body']['kiosks_network_login'], Validators.required],
                kiosks_network_password: ['']
             });
            this.cdRef.detectChanges();
           }
         });
  }

    revert() {
     this.editKiosks.reset();
    }

     onSubmit(form: FormGroup) {
        console.log(form.value);
        this.submitted = true;
        this.ks.updateKiosk(form.value)
        .subscribe( response => {

            if (response['status'] === 1) {
             this.showMessage = true;
             this.messageText = response['message'];
             this.messageClass = 'success';

             this.cdRef.detectChanges();
             setTimeout(() => {
                 this.router.navigate(['/kiosks']);
                }, 3000);
             } else {
              this.showMessage = true;
              this.messageText = response['message'];
              this.messageClass = 'danger';
              this.cdRef.detectChanges();
          }
        });
      }

}
