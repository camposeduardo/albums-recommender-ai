import { Component } from '@angular/core';
import { RecommenderService } from '../../services/recommender.service';
import { Album } from '../../interfaces/album';
import { CommonModule } from '@angular/common';

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

  constructor(private recommenderService: RecommenderService,) { }

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
}
