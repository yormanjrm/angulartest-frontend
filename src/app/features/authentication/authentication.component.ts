import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

}
