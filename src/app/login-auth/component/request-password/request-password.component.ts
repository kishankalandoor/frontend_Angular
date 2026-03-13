import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.css']
})
export class RequestPasswordComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private toastr: ToastrService) { }

  requestPassword: FormGroup;
  config = { isSubmitted: false};

  ngOnInit(): void {
    this.requestPassword  =  this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  get formControls(): any {
    return this.requestPassword.controls;
  }

  requestEmailPassword(): any {
    this.config.isSubmitted = true;
    if (this.requestPassword.invalid){
      return;
    }
    this.authenticationService.requestPassword(this.requestPassword.value.username).pipe(first())
      .subscribe({
          next: () => {
              this.router.navigate(['/auth/login']);
              this.toastr.success(' Successfully Request sent.');
          },
          error: errors => {
            this.toastr.error(errors);
          }
    });
  }

}
