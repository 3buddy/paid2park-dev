import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router , ActivatedRoute , Params} from '@angular/router';

@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.component.html',
  styleUrls: ['./add-vehicles.component.css']
})
export class AddVehiclesComponent implements OnInit {

  addVehicles: FormGroup;
  submitted = false;


  showMessage: Promise<boolean>;
  messageClass: string;
  messageText: string;

  constructor(
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private CS: CustomerService,
    private cdRef: ChangeDetectorRef,
    private router: Router) { }


  ngOnInit() {

   this.addVehicles = this.fb.group({
        customer_id: [ this.ar.snapshot.params['customerId'] , Validators.required],
        license:     ['', Validators.required],
        make:        ['', Validators.required],
        model:       ['', Validators.required],
        color:       ['', Validators.required]
      });

  }

  revert() {
   this.addVehicles.reset();
   }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.CS.addVehicle(form.value)
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
