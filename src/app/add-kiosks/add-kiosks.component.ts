import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { KioskService } from '../kiosk.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-kiosks',
  templateUrl: './add-kiosks.component.html',
  styleUrls: ['./add-kiosks.component.css']
})
export class AddKiosksComponent implements OnInit {

  addKiosks: FormGroup;
  submitted = false;

  showMessage: boolean;
  messageClass: string;
  messageText: string;

  activeData: Array<string> = ['YES', 'NO'];

  constructor(
      private fb: FormBuilder,
      private ks: KioskService,
      private router: Router,
      private ar: ActivatedRoute,
      private cdRef: ChangeDetectorRef) { }


  ngOnInit() {

        this.addKiosks = this.fb.group({
          kiosks_number: ['', Validators.required],
          kiosks_mac_address: ['', Validators.required],
          kiosks_guid: ['', Validators.required],
          kiosks_password: ['', Validators.required],
          kiosks_location_address: ['', Validators.required],
          kiosks_city: ['', Validators.required],
          kiosks_network_login: ['', Validators.required],
          kiosks_network_password: ['', Validators.required],
          kiosks_status: ['', Validators.required]
      });
  }


  revert() {
     this.addKiosks.reset();
   }


    onSubmit(form: FormGroup) {
     this.submitted = true;
     this.ks.addKiosk(form.value)
    .subscribe( response => {

        if(response['status'] === 1) {
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