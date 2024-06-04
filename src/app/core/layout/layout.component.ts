import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../shared/modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { TitleCardService } from '../services/title-card.service';

@Component({
  selector: 'core-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MaterialModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent {
  constructor(public titleCardService: TitleCardService){}
}