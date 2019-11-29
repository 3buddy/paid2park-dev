import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PassesService } from '../passes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-passes',
  templateUrl: './add-passes.component.html',
  styleUrls: ['./add-passes.component.css']
})
export class AddPassesComponent implements OnInit {

  addPasses: FormGroup;
  submitted = false;

    showMessage: boolean;
    messageClass: string;
    messageText: string;
    activeData: Array<string> = ['YES', 'NO'];

    constructor(
      private fb: FormBuilder ,
      private services: PassesService,
      private cdRef: ChangeDetectorRef,
      private router: Router
      ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addPasses = this.fb.group({
      passes_license           : ['', Validators.required],
      passes_customers_name    : ['', Validators.required],
      passes_package           : ['', Validators.required],
      passes_price             : ['', Validators.required],
      passes_amount_paid       : ['', Validators.required],
      passes_funds_by          : ['', Validators.required],
      passes_reason            : ['', Validators.required],
      passes_start_date        : ['', Validators.required],
      passes_end_date          : ['', Validators.required],
      passes_status            : ['', Validators.required]
    });
  }

  revert() {
   this.addPasses.reset();
   }

  onSubmit(form: FormGroup) {
    // console.log(form);

     this.services.addPasses(form.value).subscribe( (response) => {

      if (response['status'] === 1) {
        this.showMessage = true;
        this.messageText = response['message'];
        this.messageClass = 'success';

        this.cdRef.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/passes']);
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
