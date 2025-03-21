import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Album } from '../interfaces/album';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  private recommendationsDataSubject = new BehaviorSubject<Album[] | null>(null);
  recommendations$ = this.recommendationsDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getRecommendations(album: string, artist: string) {
    return this.http.get<Album[]>(`${environment.apiUrl}/recommender`, {
      params: {
        'album': album,
        'artist': artist,
      }
    }).pipe(map(response => {
      this.recommendationsDataSubject.next(response);
    }));
  }
}
