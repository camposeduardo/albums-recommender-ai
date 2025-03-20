import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'
import { BehaviorSubject, map } from 'rxjs';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private albumDataSubject = new BehaviorSubject<Album[] | null>(null);
  albumData$ = this.albumDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  signIn() {
    return this.http.get(`${environment.apiUrl}/auth/spotify-url`);
  }

  getAccessToken(code: string, verifier: string) {
    return this.http.post(`${environment.apiUrl}/token`, {}, {
      params: new HttpParams().set('code', code).set('verifier', verifier)
    });
  }

  searchAlbum(album: string) {
    const token = localStorage.getItem('token')!;
    return this.http.get<Album[]>(`${environment.apiUrl}/search`, {
      headers: {
        'Authorization': token
      },
      params: {
        'album': album
      }
    }).pipe(map(response => {
      this.albumDataSubject.next(response);
    })).subscribe();
  }

  saveAlbum(ids: string[]) {
    const token = localStorage.getItem('token')!;
    return this.http.put(`${environment.apiUrl}/save/albums`, {ids: ids}, {headers: {
      'Authorization': token
    }} );
  }
}
