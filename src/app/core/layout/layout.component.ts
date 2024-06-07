import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../shared/modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'core-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MaterialModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent {}