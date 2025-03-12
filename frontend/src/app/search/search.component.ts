import { Component } from '@angular/core';
import { AlbumsComponent } from "../albums/albums.component";

@Component({
  selector: 'search',
  standalone: true,
  imports: [AlbumsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
