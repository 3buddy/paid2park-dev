import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router , ActivatedRoute , Params} from '@angular/router';

@Component({
  selector: 'app-edit-vehicles',
  templateUrl: './edit-vehicles.component.html',
  styleUrls: ['./edit-vehicles.component.css']
})
export class EditVehiclesComponent implements OnInit {

  editVehicles: FormGroup;
  submitted = false;

  isLoaded: boolean;
  showMessage: Promise<boolean>;
  messageClass: string;
  messageText: string;
  activeData: Array<string> = ['YES', 'NO'];

  constructor(
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private CS: CustomerService,
    private cdRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {

    this.CS.getVehicleDetails(this.ar.snapshot.params['vehicleId']).subscribe(
      (data) => {

        if (data['status'] === 1) {
          this.isLoaded = true;
          this.editVehicles = this.fb.group({
            customer_vehicle_id : [this.ar.snapshot.params['vehicleId'] , Validators.required],
            customer_id: [ this.ar.snapshot.params['customerId'] , Validators.required],
            license:     [ data['body']['license'], Validators.required],
            make:        [ data['body']['make'], Validators.required],
            model:       [ data['body']['model'], Validators.required],
            color:       [ data['body']['color'], Validators.required],
            status:      [ data['body']['status'], Validators.required]
          });
          this.cdRef.detectChanges();
        }

    });

  }

  revert() {
    this.editVehicles.reset();
    }

  onSubmit(form: FormGroup) {

      this.submitted = true;
      this.CS.updateVehicle(form.value)
      .subscribe( (response) => {
         if (response['status'] === 1) {
          this.showMessage = Promise.resolve(true);
          this.messageText = response['message'];
          this.messageClass = 'success';
          this.cdRef.detectChanges();

          setTimeout(() => {
            this.router.navigate([`/customers/${this.ar.snapshot.params['customerId']}/vehicles`]);
           }, 3000);
         } else {
          this.showMessage = Promise.resolve(true);
          this.messageText = response['message'];
          this.messageClass = 'danger';
          this.cdRef.detectChanges();
         }

      });
    }

}
