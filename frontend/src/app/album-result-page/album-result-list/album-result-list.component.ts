import { Component } from '@angular/core';
import { RecommenderService } from '../../services/recommender.service';
import { Album } from '../../interfaces/album';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'album-result-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-result-list.component.html',
  styleUrl: './album-result-list.component.css'
})
export class AlbumResultListComponent {

  albumsData$ = this.spotifyService.albumData$;
  currentAlbums: Album[] = [];

  constructor (private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.spotifyService.albumData$.subscribe(data => {
      if (data) {
        this.currentAlbums = data;
      }
    });

  }


}
