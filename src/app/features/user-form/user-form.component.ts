import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { StorageService } from '../../core/services/storage.service';
import { UnsubscriptionService } from '../../core/services/unsubscription.service';
import { Subscription } from 'rxjs';
import { SweetalertService } from '../../shared/services/sweetalert.service';
import { Router } from '@angular/router';
import { FormInitializerService } from '../../shared/services/forms-Initializer.service';
import { FormsMessageErrorsService } from '../../shared/services/forms-message-errors.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { UsersControlService } from '../../api/services/users-control.service';
import { IApiResponse } from '../../core/models/api-response.model';
import { IUser } from '../../api/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgClass, DatePipe],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnDestroy {

  public buttonTitle: string = "";
  public imageText: string = "";
  public currentDate: Date | string = new Date;
  public previsualizerImg: any;
  private selectedFile: any = null;
  public formUser: FormGroup;
  private suscription: Subscription = new Subscription();

  constructor(
    private userControlService: UsersControlService,
    private storageService: StorageService,
    private unsubscriptionService: UnsubscriptionService,
    private formInitializerService: FormInitializerService,
    public formMessageError: FormsMessageErrorsService,
    private sweetAlertService: SweetalertService,
    private router: Router
  ) {
    const id = storageService.getSessionItem("iduser");
    this.viewMode(id);
    this.formUser = this.formInitializerService.initUserForm(id);
  }

  ngOnDestroy(): void {
    this.storageService.removeSessionItem("iduser");
    this.unsubscriptionService.unsubscription(this.suscription);
  }

  viewMode(id: number | null) {
    if (id === null) {
      this.buttonTitle = "Register";
      this.imageText = "Load image";
      this.router.navigate(["/new-user"]);
    } else {
      this.findUserById(id);
      this.buttonTitle = "Update";
      this.imageText = "Replace image";
    }
  }

  findUserById(id: number) {
    this.suscription = this.userControlService.findById(id).subscribe({
      next: (response: IApiResponse) => {
        this.setUserValues(response.data);
      }, error: (err: IApiResponse) => {
        this.sweetAlertService.basicAlert("Error", err.message, "error");
        this.router.navigate(['/dashboard']);
      }
    })
  }

  setUserValues(data: IUser) {
    this.formUser.patchValue({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      image: data.image
    });
    this.currentDate = data.date_created;
    this.previsualizerImg = data.image
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previsualizerImg = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submitUser() {
    this.suscription = this.userControlService.submitUser(this.formUser, this.selectedFile).subscribe({
      next: (response: IApiResponse) => {
        this.sweetAlertService.basicAlert("Success", response.message, "success");
        this.router.navigate(['/dashboard']);
      }, error: (err: IApiResponse) => {
        this.sweetAlertService.basicAlert("Error", err.message, "error");
      }
    });
  }

}
