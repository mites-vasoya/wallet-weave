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
  paymentType: any[] = [
    {
      "id": 1,
      "payment_mode_name": "Cash"
    },
    {
      "id": 2,
      "payment_mode_name": "Debit Card"
    },
    {
      "id": 3,
      "payment_mode_name": "Voucher"
    },
    {
      "id": 4,
      "payment_mode_name": "Credit Card"
    },
    {
      "id": 5,
      "payment_mode_name": "Web Payment"
    },
    {
      "id": 6,
      "payment_mode_name": "Mobile Payment"
    },
    {
      "id": 7,
      "payment_mode_name": "Cheque"
    }
  ];

  futureDateDisableFilter = (d: Date | null): boolean => {
    // Prevent future date from being selected
    return d?.getTime() ? d?.getTime() <= Date.now() : false;
  };

  constructor(public dialogRef: MatDialogRef<NewEntryComponent>, private formBuilder: FormBuilder) {
    this.newExpenseForm = this.formBuilder.group({
      account: [this.accountType[0].key, Validators.required],
      amount: [0, [Validators.required]],
      paymentDate: ["1/3/2024", Validators.required],
      paymentType : [this.paymentType[0].id, Validators.required],
      note : ['']
    });
  }

  onSubmit() {
    console.log("New Entry Data : ", this.newExpenseForm);
  }
}
