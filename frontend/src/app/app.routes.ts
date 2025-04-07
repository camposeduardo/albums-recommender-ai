import { Routes } from '@angular/router';
import { AlbumResultPageComponent } from './album-result-page/album-result-page.component';
import { RecommendationPageComponent } from './recommendation-page/recommendation-page.component';
import { HeroComponent } from './hero/hero.component';
import { MainPageComponent } from './main-page/main-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HeroComponent},
  {
    path: 'album-recommender', component: MainPageComponent, canActivateChild: [authGuard],
    children: [
      { path: 'albums', component: AlbumResultPageComponent },
      { path: 'recommendations', component: RecommendationPageComponent },
    ]
  },

];
