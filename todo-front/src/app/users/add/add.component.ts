import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styles: [],
})
export class AddComponent implements OnInit {
  hidePwd = true;

  public form = this.fb.group({
    username: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.minLength(6)],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    private snackbar: SnackBarService,
    private usrService: UserService
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
      if (this.data.action === 'add') {
        this.usrService.add(this.form.value).subscribe((result) => {
          if (result && result.message) {
            this.snackbar.sucess(result.message);
            this.dialogRef.close(true);
          }
        });
      } else {
        this.usrService
          .update(this.data.data.id, this.form.value)
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
