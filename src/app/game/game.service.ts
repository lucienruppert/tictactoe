import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  createGame(board: string, name: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}boards`, { board, name });
  }
}
