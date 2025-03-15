import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  constructor(private spotifyService: SpotifyService) {}

  onSignIn() {
    this.spotifyService.signIn().subscribe({
      next(value: any) {
        document.location = value['url'];
        localStorage.setItem('verifier', value['verifier']);
      },
    });
  }
}
