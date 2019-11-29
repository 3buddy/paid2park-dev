import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PassesService } from '../passes.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-passes',
  templateUrl: './edit-passes.component.html',
  styleUrls: ['./edit-passes.component.css']
})
export class EditPassesComponent implements OnInit {

    addPasses: FormGroup;
    submitted = false;

    showMessage: boolean;
    messageClass: string;
    messageText: string;
    loadThePage: boolean;
    activeData: Array<string> = ['YES', 'NO'];

    constructor(
      private fb: FormBuilder ,
      private services: PassesService,
      private cdRef: ChangeDetectorRef,
      private router: Router,
      private ar: ActivatedRoute
      ) { }

  ngOnInit() {

    this.services.getPassesDetails( this.ar.snapshot.params['Id'])
    .subscribe( (response) => {

      if (response['status'] === 1) {
        this.addPasses = this.fb.group({
          passes_id                : [response['body']['passes_id'], Validators.required],
          passes_license           : [response['body']['passes_license'], Validators.required],
          passes_customers_name    : [response['body']['passes_customers_name'], Validators.required],
          passes_package           : [response['body']['passes_package'], Validators.required],
          passes_price             : [response['body']['passes_price'], Validators.required],
          passes_amount_paid       : [response['body']['passes_amount_paid'], Validators.required],
          passes_funds_by          : [response['body']['passes_funds_by'], Validators.required],
          passes_reason            : [response['body']['passes_reason'], Validators.required],
          passes_start_date        : [response['body']['passes_start_date'], Validators.required],
          passes_end_date          : [response['body']['passes_end_date'], Validators.required],
          passes_status            : [response['body']['passes_status'], Validators.required]
        });
        this.loadThePage = true;
        this.cdRef.detectChanges();
      }

    });
  }


  revert() {
   this.addPasses.reset();
   }

  onSubmit(form: FormGroup) {
    // console.log(form);

     this.services.updatePasses(form.value).subscribe( (response) => {

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
