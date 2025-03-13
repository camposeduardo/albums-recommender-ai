import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HeroComponent } from "./hero/hero.component";
import { HelpSectionComponent } from "./help-section/help-section.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { RecommendationPageComponent } from "./recommendation-page/recommendation-page.component";
import { AlbumResultListComponent } from "./album-result-page/album-result-list/album-result-list.component";
import { MainPageComponent } from "./main-page/main-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,  MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
