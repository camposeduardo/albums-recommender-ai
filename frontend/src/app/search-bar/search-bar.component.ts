import { Component } from '@angular/core';
import { RecommenderService } from '../services/recommender.service';
import { Album } from '../interfaces/album';
import { ActivatedRoute, Router, RouterConfigOptions } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';


@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(private spotifyService: SpotifyService, private router: Router, private route: ActivatedRoute) {}

  onSearchAlbum(album: string) {
    this.spotifyService.searchAlbum(album);
    this.router.navigate(['albums'], {relativeTo: this.route});
  }
}
