import { Component } from '@angular/core';
import {HeaderComponent} from "./shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {}
