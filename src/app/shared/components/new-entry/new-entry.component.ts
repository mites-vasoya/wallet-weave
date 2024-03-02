import {Component} from '@angular/core';
import {
  MatDialogRef,
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.css',
})
export class NewEntryComponent {
  newExpenseForm: FormGroup;
  accountType: any[] = [{key: "bank", value: "Bank"}, {key: "upi", value: "UPI"}, {key: "cash", value: "Cash"}];
  futureDateDisableFilter = (d: Date | null): boolean => {
    // Prevent future date from being selected.
    return d?.getTime() ? d?.getTime() <= Date.now() : false;
  };

  constructor(public dialogRef: MatDialogRef<NewEntryComponent>, private formBuilder: FormBuilder) {
    this.newExpenseForm = this.formBuilder.group({
      account: [this.accountType[0].key, Validators.required],
      amount : [0, [Validators.required]],
      paymentDate : ['', Validators.required]
    });
  }
}
