import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CreateGameResponse, StoredGame } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  createGame(board: string, name: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}boards`, { board, name });
  }

  updateGame(
    id: number,
    board: string,
    name: string
  ): Observable<CreateGameResponse> {
    return this.http.patch<CreateGameResponse>(
      `${environment.apiUrl}boards/${id}`,
      { board, name }
    );
  }

  getGames(): Observable<StoredGame[]> {
    return this.http.get<StoredGame[]>(`${environment.apiUrl}boards`);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}boards/${id}`);
  }
}
