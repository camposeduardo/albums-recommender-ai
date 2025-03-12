import { Component } from '@angular/core';
import { RecommendationPageComponent } from "../recommendation-page/recommendation-page.component";


@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [RecommendationPageComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  albumResult: string = '';
  artistResult: string = '';

  search(album: string, artist: string) {
    this.albumResult = album;
    this.artistResult = artist;
  }
}
