import { Component } from '@angular/core';
import { RecommenderService } from '../../services/recommender.service';
import { Album } from '../../interfaces/album';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainPageComponent } from '../../main-page/main-page.component';

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

  constructor (private spotifyService: SpotifyService,
    private recommenderService: RecommenderService,
    private router: Router) {}

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

  getRecommendations(album: Album) {
    this.recommenderService.getRecommendations(album.name, album.artists[0].name).subscribe(data => {
      this.router.navigate(['/album-recommender','recommendations']);
    });
  }

}
