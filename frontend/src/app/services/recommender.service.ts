import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Album } from '../interfaces/album';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  private recommendationsDataSubject = new BehaviorSubject<Album[] | null>(null);
  recommendations$ = this.recommendationsDataSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getRecommendations(album: string, artist: string) {
    const token = localStorage.getItem('token')!;
    return this.http.get<Album[]>(`${environment.apiUrl}/recommender`, {
      headers: {
        'Authorization': token
      },
      params: {
        'album': album,
        'artist': artist,
      }
    }).pipe(map(response => {
      this.recommendationsDataSubject.next(response);
    }));
  }
}
