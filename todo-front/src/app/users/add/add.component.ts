import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';

@Component({
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styles: [],
})
export class AddComponent implements OnInit {
  hidePwd = true;

  public form = this.fb.group(
    {
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      confirm_password: ['', Validators.minLength(6)],
    },
    {
      validator: this.custumValidator.MatchPassword(
        'password',
        'confirm_password'
      ),
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    private snackbar: SnackBarService,
    private usrService: UserService,
    private custumValidator: CustomValidationService
  ) {
    if (this.data.data) {
      this.form.patchValue({
        username: this.data.data.username,
        firstname: this.data.data.firstname,
        lastname: this.data.data.lastname,
        password: '',
      });
    }
  }

  ngOnInit(): void {}

  save() {
    if (this.form.valid) {
      const { username, firstname, lastname, password } = this.form.value;

      if (this.data.action === 'add') {
        this.usrService
          .add({ username, firstname, lastname, password })
          .subscribe((result) => {
            if (result && result.message) {
              this.snackbar.sucess(result.message);
              this.dialogRef.close(true);
            }
          });
      } else {
        this.usrService
          .update(this.data.data.id, {
            username,
            firstname,
            lastname,
            password,
          })
          .subscribe((result) => {
            if (result && result.message) {
              this.snackbar.sucess(result.message);
              this.dialogRef.close(true);
            }
          });
      }
    }
  }
}
