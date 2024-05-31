import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

}
