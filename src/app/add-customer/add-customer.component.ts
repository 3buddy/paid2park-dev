import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
   
    addCustomer: FormGroup;
	submitted = false;
	
    constructor(private fb: FormBuilder) { }

  ngOnInit() {
     
	  
	  this.addCustomer = this.fb.group({
        CustomerID: ['', Validators.required],
        CustomerFirstName: ['', Validators.required],
        CustomerLastName: ['', Validators.required],
		CustomerMailAddress: ['', Validators.required],
        CustomerMailCity: ['', Validators.required],
        CustomerMailState: ['', Validators.required],
		CustomerMailZip: ['', Validators.required],
        CustomerMinuteAvailable: ['', Validators.required],
        CustomerLastPaymentDate: ['', Validators.required],
		CustomerLastPaymentAmount: ['', Validators.required],
        CustomerLastMinutesReceived: ['', Validators.required],
        CustomerLastParkingDate: ['', Validators.required],
		CustomerLastPassPurchaseDate: ['', Validators.required],
        CustomerLastPassStartDate: ['', Validators.required],
        CustomerLastPassEndDate: ['', Validators.required],
		CustomerLastPassCost: ['', Validators.required],
        CustomerEmailAddress: ['', [ Validators.required, Validators.email]],
        CustomerCell: ['', Validators.required],
		CustomerCellCarrier: ['', Validators.required],
		CustomerNotifyMinsInAdvance: ['', Validators.required],
		CustomerNumberOfTicketsYTD: ['', Validators.required],
      });
  
  }
  
  revert() {
   this.addCustomer.reset();
   }
  
  onSubmit(form: FormGroup)
  {
     this.submitted = true;
     console.log(form);
  
  }

}
