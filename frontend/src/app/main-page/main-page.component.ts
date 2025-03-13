import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { RecommendationPageComponent } from '../recommendation-page/recommendation-page.component';
import { AlbumResultListComponent } from "../album-result-page/album-result-list/album-result-list.component";
import { AlbumResultPageComponent } from "../album-result-page/album-result-page.component";
import { HelpSectionComponent } from '../help-section/help-section.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchBarComponent, RecommendationPageComponent, AlbumResultPageComponent, HelpSectionComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
