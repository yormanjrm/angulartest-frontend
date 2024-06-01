import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public setSessionItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getSessionItem(key: string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeSessionItem(key: string) {
    sessionStorage.removeItem(key);
  }

  public setLocalItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getLocalItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeLocalItem(key: string) {
    localStorage.removeItem(key);
  }

}