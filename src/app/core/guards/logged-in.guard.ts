import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { IToken } from '../../api/models/token.model';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const routerService = inject(Router);
  const token: IToken = storageService.getSessionItem("token");

  if (token) {
    return routerService.createUrlTree(['/']);
  }
  return true;
};