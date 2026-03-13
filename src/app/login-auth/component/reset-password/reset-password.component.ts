import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService,  private toastr: ToastrService) { }

  resetPassword: FormGroup;
  config = { isSubmitted: false, oldPasswordShow: false, newPasswordShow : false};
  ngOnInit(): void {
    this.resetPassword  =  this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  get formControls(): any {
    return this.resetPassword.controls;
  }

  resetEmailPassword(): any {
    this.config.isSubmitted = true;
    if (this.resetPassword.invalid){
      return;
    }
    // tslint:disable-next-line: max-line-length
    this.authenticationService.resetPassword(this.authenticationService.authValue.email, this.resetPassword.value.oldPassword, this.resetPassword.value.newPassword).pipe(first())
      .subscribe({
          next: () => {
              this.authenticationService.logout();
              this.toastr.success(' Successfully Password Changed.');
          },
          error: errors => {
              this.toastr.error(errors);
          }
    });
  }

  showHideOldPassword(): any{
    this.config.oldPasswordShow = !this.config.oldPasswordShow;
  }

  showHideNewPassword(): any{
    this.config.newPasswordShow = !this.config.newPasswordShow;
  }
}
