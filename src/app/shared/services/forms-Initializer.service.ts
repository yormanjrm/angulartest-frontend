import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormInitializerService {

  constructor(private fb: FormBuilder) { }

  initLoginForm(): FormGroup {
    return this.fb.group({
      email: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl<string>('', {
        validators: [
          Validators.required
        ]
      })
    });
  }

  initUserForm(isEdit: any): FormGroup {
    const formGroup = this.fb.group({
      id: new FormControl<number>(0),
      name: new FormControl<string>('', {
        validators: [
          Validators.required
        ]
      }),
      email: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl<string>('', {
        validators: [
          Validators.required
        ]
      }),
      confirmPassword: new FormControl<string>('', {
        validators: isEdit === null ? [Validators.required] : []
      }),
      role: new FormControl<string>('', {
        validators: [
          Validators.required
        ]
      }),
      image: new FormControl<string>('default.png')
    }, {
      validators: isEdit === null ? [this.passwordMatchValidator] : []
    });

    return formGroup;
  }

  private passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
