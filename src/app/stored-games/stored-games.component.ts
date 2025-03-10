import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game/game.service';
import { StoredGame } from '../types';

@Component({
  selector: 'app-stored-games',
  templateUrl: './stored-games.component.html',
  styleUrls: ['./stored-games.component.css'],
  imports: [RouterLink, CommonModule, FormsModule],
  standalone: true,
})
export class StoredGamesComponent implements OnInit {
  games: StoredGame[] = [];
  allGames: StoredGame[] = [];
  filterText: string = '';

  constructor(private gameService: GameService) {}

  loadGames(): void {
    this.gameService.getGames().subscribe((games) => {
      this.allGames = games;
      this.filterGames();
    });
  }

  filterGames(): void {
    this.games = this.filterText
      ? this.allGames.filter((game) =>
          game.name.toLowerCase().includes(this.filterText.toLowerCase())
        )
      : this.allGames;
  }

  ngOnInit(): void {
    this.loadGames();
  }

  deleteGame(id: number): void {
    this.gameService.deleteGameBy(id).subscribe(() => {
      this.loadGames();
    });
  }

  getGame(id: number): void {
    this.gameService.getGameBy(id).subscribe((game) => {
      console.log('Game details:', game);
    });
  }
}
