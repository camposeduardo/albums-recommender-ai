import { Component } from '@angular/core';
import { RecommenderService } from '../../services/recommender.service';
import { Album } from '../../interfaces/album';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'recommendation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendation-list.component.html',
  styleUrl: './recommendation-list.component.css'
})
export class RecommendationListComponent {

  recommendationsData$ = this.recommenderService.recommendations$;
  recommendedAlbums: Album[] = [];

  constructor(private recommenderService: RecommenderService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.recommenderService.recommendations$.subscribe(data => {
      if (data) {
        this.recommendedAlbums = data;
      }
    });
  }

  onSaveAlbum(id: string) {
    const ids = [id];
    this.spotifyService.saveAlbum(ids).subscribe(data => {
      this.recommendedAlbums = this.recommendedAlbums.filter(album => album.id !== id);
    }
    );

  }
}
