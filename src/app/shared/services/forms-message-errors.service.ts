import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsMessageErrorsService {

  getAuthenticationFormMessageError(ctrl_name: string, form: FormGroup): string {
    return form.get(ctrl_name)?.hasError('required') ? 'Field is required.' : 'Enter a valid email.';
  }

}