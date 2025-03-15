import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { HelpSectionComponent } from '../help-section/help-section.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchBarComponent, RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParamMap => {
      if (queryParamMap.has('code')) {
        const code = queryParamMap.get('code');
        localStorage.setItem('code', code!)
        history.replaceState(null, '', window.location.pathname)
      }
    });
  }

}
