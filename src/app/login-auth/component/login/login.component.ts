import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/login-auth/service/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private toastr: ToastrService) {
    if (this.authenticationService.authValue) {
      this.router.navigate(['/main/dashboard/landing-dashboard']);
    }
  }

  loginForm: FormGroup;

  config = { isSubmitted: false, showPassword: false};

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls(): any {
    return this.loginForm.controls;
  }

  login(): any {
    this.config.isSubmitted = true;
    if (this.loginForm.invalid){
      return;
    }
    const formData = new FormData();
    formData.append('data', JSON.stringify({ email: this.loginForm.value.username, password: this.loginForm.value.password  }));
    this.authenticationService.login(formData).pipe(first())
      .subscribe({
          next: () => {

              this.authenticationService.getUserLoginDetail()
              .subscribe(responce => {
                  localStorage.setItem('userInfo',JSON.stringify(responce.data));
                  this.authenticationService.authValue.id = responce.data.user.id
                  this.authenticationService.authValue.email = responce.data.user.email;
                  localStorage.setItem('token',JSON.stringify(this.authenticationService.authValue))
                  if (responce.data.userRoleMap.length > 0 && responce.data.user.backend === true && responce.data.userRoleMap[0].role === 'ADMIN' && responce.data.userRoleMap[0].isActive === true ) {
                    this.router.navigate(['/main/dashboard/landing-dashboard']);
                    this.toastr.success(' Login Successful.');
                  } else {
                    this.authenticationService.logout();
                    this.toastr.error(' This Login only for Admin ');
                  }
              },
            );
          },
          error: errors => {
            this.toastr.error(errors);
          }
        }
      );
  }

  showHidePassword(): any{
    this.config.showPassword = !this.config.showPassword;
  }

}
