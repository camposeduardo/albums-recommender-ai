import { Component } from '@angular/core';
import { RecommendationListComponent } from "./recommendation-list/recommendation-list.component";

@Component({
  selector: 'recommendation-page',
  standalone: true,
  imports: [RecommendationListComponent],
  templateUrl: './recommendation-page.component.html',
  styleUrl: './recommendation-page.component.css'
})
export class RecommendationPageComponent {

}
