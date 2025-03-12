import { Component } from '@angular/core';
import { AlbumsComponent } from "../albums/albums.component";


@Component({
  selector: 'search',
  standalone: true,
  imports: [AlbumsComponent],
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
