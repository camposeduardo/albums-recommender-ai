import { Component } from '@angular/core';
import { AlbumResultListComponent } from "./album-result-list/album-result-list.component";

@Component({
  selector: 'album-result-page',
  standalone: true,
  imports: [AlbumResultListComponent],
  templateUrl: './album-result-page.component.html',
  styleUrl: './album-result-page.component.css'
})
export class AlbumResultPageComponent {

}
