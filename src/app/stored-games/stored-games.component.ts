import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../game/game.service';
import { StoredGame } from '../types';

@Component({
  selector: 'app-stored-games',
  templateUrl: './stored-games.component.html',
  styleUrls: ['./stored-games.component.css'],
  imports: [RouterLink, CommonModule],
  standalone: true,
})
export class StoredGamesComponent implements OnInit {
  games: StoredGame[] = [];

  constructor(private gameService: GameService) {}

  loadGames(): void {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
  }

  ngOnInit(): void {
    this.loadGames();
  }

  deleteGame(id: number): void {
    this.gameService.deleteGame(id).subscribe(() => {
      this.loadGames();
    });
  }
}
