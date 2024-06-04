import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { StorageService } from '../../core/services/storage.service';
import { UnsubscriptionService } from '../../core/services/unsubscription.service';
import { Subscription } from 'rxjs';
import { TitleCardService } from '../../core/services/title-card.service';
import { SweetalertService } from '../../shared/services/sweetalert.service';
import { Router } from '@angular/router';
import { FormInitializerService } from '../../shared/services/forms-Initializer.service';
import { FormsMessageErrorsService } from '../../shared/services/forms-message-errors.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatRadioChange } from '@angular/material/radio';
import { UsersControlService } from '../../api/services/users-control.service';
import { IApiResponse } from '../../core/models/api-response.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgClass],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnDestroy {

  private id: number | null = null;
  public buttonTitle: string;
  public formUser: FormGroup = this.formInitializerService.initUserForm();
  private suscription !: Subscription;

  constructor(
    private userControlService: UsersControlService,
    private storageService: StorageService,
    private titleCardService: TitleCardService,
    private unsubscriptionService: UnsubscriptionService,
    private formInitializerService: FormInitializerService,
    public formMessageError: FormsMessageErrorsService,
    private sweetAlertService: SweetalertService,
    private router: Router
  ) {
    this.id = storageService.getSessionItem("iduser");
    if (this.id) {
      this.formUser.setValue({
        id: this.id,
      });
      this.titleCardService.titleCard = "Edit user";
      this.buttonTitle = "Edit";
    } else {
      this.titleCardService.titleCard = "New user";
      this.buttonTitle = "Register";
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.unsubscriptionService.unsubscription(this.suscription);
  }

  toDoAction() {
    this.suscription = this.userControlService.submitUser(this.formUser).subscribe({
      next: (response: IApiResponse) => {
        this.sweetAlertService.basicAlert("Success", response.message, "success");
        this.router.navigate(['/dashboard']);
      }, error: (err: IApiResponse) => {
        this.sweetAlertService.basicAlert("Error", err.message, "error");
      }
    })
  }

}
