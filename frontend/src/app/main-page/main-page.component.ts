import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { HelpSectionComponent } from '../help-section/help-section.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchBarComponent, RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParamMap => {
      if (queryParamMap.has('code')) {
        const code = queryParamMap.get('code');
        history.replaceState(null, '', window.location.pathname);
        const verifier = localStorage.getItem('verifier');
        this.getAccessToken(code!, verifier!);
      }
      else {
        localStorage.clear();
        this.router.navigate(['home']);
      }
    });
  }

  getAccessToken(code: string, verifier: string) {
    this.spotifyService.getAccessToken(code!, verifier!).subscribe({
      next(value: any) {
        localStorage.removeItem('verifier');
        localStorage.setItem('token', value['access_token']);
      },
    });
  }

}
