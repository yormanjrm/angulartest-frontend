import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { IToken } from '../../api/models/token.model';
import { SweetalertService } from '../../shared/services/sweetalert.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const sweetAlertService = inject(SweetalertService);
  const routerService = inject(Router);
  const token: IToken = storageService.getSessionItem("token");

  if (token.role != "ADMIN") {
    sweetAlertService.basicAlert("Access denied", "You do not have the necessary permissions to perform this action", "error");
    return routerService.createUrlTree(['/dashboard']);
  }

  return true;

};