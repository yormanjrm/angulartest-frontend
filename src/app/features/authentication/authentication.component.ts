import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetalertService } from '../../shared/services/sweetalert.service';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { FormInitializerService } from '../../shared/services/forms-Initializer.service';
import { FormsMessageErrorsService } from '../../shared/services/forms-message-errors.service';
import { Subscription } from 'rxjs';
import { UnsubscriptionService } from '../../core/services/unsubscription.service';
import { AuthenticationService } from '../../api/services/authentication.service';
import { IApiResponse } from '../../core/models/api-response.model';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    SweetalertService
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  public formLogin: FormGroup = this.formInitializerService.initLoginForm();
  private suscription !: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private unsubscriptionService: UnsubscriptionService,
    private formInitializerService: FormInitializerService,
    private storageService: StorageService,
    private sweetAlertService: SweetalertService,
    private router: Router,
    public formMessageError: FormsMessageErrorsService
  ) { }

  ngOnDestroy(): void {
    this.unsubscriptionService.unsubscription(this.suscription);
  }

  logIn() {
    this.suscription = this.authenticationService.login(this.formLogin.value.email, this.formLogin.value.password).subscribe({
      next: (data: IApiResponse) => {
        this.sweetAlertService.toastAlert("Welcome back", "success", "bottom");
        this.storageService.setSessionItem('token', data);
        this.router.navigate(['/']);
      }, error: (err: IApiResponse) => {
        this.sweetAlertService.toastAlert(err.message, 'error', "bottom");
      }
    });
  }

}