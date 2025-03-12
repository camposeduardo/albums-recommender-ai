import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HeroComponent } from "./hero/hero.component";
import { HelpSectionComponent } from "./help-section/help-section.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchComponent } from "./search-bar/search-bar.component";
import { AlbumsComponent } from "./albums/albums.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, HelpSectionComponent, FooterComponent, SearchComponent, AlbumsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
