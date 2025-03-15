import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  signIn() {
    return this.http.get(`${environment.apiUrl}/album-recommender/api/v1/auth/spotify-url`);
  }

  getAccessToken(code: string, verifier: string) {
    return this.http.post(`${environment.apiUrl}/album-recommender/api/v1/token`, {}, {
      params: new HttpParams().set('code', code).set('verifier', verifier)
    });
  }
}
