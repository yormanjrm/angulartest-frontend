import { Component } from '@angular/core';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { IToken } from '../../../../api/models/token.model';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../../../shared/services/sweetalert.service';

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public user: IToken;

  constructor(private storageService: StorageService, private router: Router, private sweetAlertService: SweetalertService) {
    this.user = storageService.getSessionItem("token");
  }

  logOut() {
    this.storageService.removeSessionItem("token");
    this.storageService.removeLocalItem("title-card");
    this.sweetAlertService.toastAlert('See you again ' + this.user.name, 'success', "bottom");
    this.router.navigate(['/authentication']);
  }

}
