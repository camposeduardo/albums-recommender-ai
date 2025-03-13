import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { HelpSectionComponent } from '../help-section/help-section.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchBarComponent, RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
