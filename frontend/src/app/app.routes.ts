import { Routes } from '@angular/router';
import { AlbumResultPageComponent } from './album-result-page/album-result-page.component';
import { RecommendationPageComponent } from './recommendation-page/recommendation-page.component';

export const routes: Routes = [
  {path: 'albums', component: AlbumResultPageComponent},
  {path: 'recommendation', component: RecommendationPageComponent},
];
