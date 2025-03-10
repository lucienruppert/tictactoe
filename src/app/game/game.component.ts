import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WINNING_PATTERNS_3 } from './winningPatterns';
import { FormsModule } from '@angular/forms';
import { GameService } from './game.service';
import { CreateGameResponse } from '../types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [RouterLink, CommonModule, MatIconModule, FormsModule],
  providers: [],
  standalone: true,
})
export class GameComponent implements OnInit {
  tableSize: number = 3;
  gameState: string;
  nextUp: number = 1;
  winner: number | null = null;
  showNameInput: boolean = false;
  gameName: string = '';
  isNameSaved: boolean = false;
  isBoardCreated: boolean = false;
  gameId: number | null = null;

  private createInitialGameState(): string {
    return '0'.repeat(Math.pow(this.tableSize, 2));
  }

  constructor(private gameService: GameService, private route: ActivatedRoute) {
    this.gameState = this.createInitialGameState();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.gameService.getGameBy(params['id']).subscribe((game) => {
          this.gameState = game.board;
          this.gameName = game.name;
          this.gameId = game.id;
          this.isNameSaved = true;
          this.isBoardCreated = true;

          const placedCount = this.countPlacedIcons();
          this.nextUp = placedCount % 2 === 0 ? 1 : 2;

          if (placedCount >= 5) {
            this.checkWinner();
          }
        });
      }
    });
  }

  getGameStateForBoard(): string[][] {
    const matrix: string[][] = [];
    for (let i = 0; i < this.tableSize; i++) {
      matrix.push(
        this.gameState
          .slice(i * this.tableSize, (i + 1) * this.tableSize)
          .split('')
      );
    }
    return matrix;
  }

  private countPlacedIcons(): number {
    return this.gameState.split('').filter((cell) => cell !== '0').length;
  }

  private isBoardFull(): boolean {
    return !this.gameState.includes('0');
  }

  private checkWinner(): void {
    const isWinningPattern = WINNING_PATTERNS_3.some((pattern) => {
      const isWinner = pattern.split('').every((value, index) => {
        return value === '0' || value === this.gameState[index];
      });
      if (isWinner) {
        this.winner = this.nextUp === 1 ? 2 : 1;
      }
      return isWinner;
    });
  }

  handleClick(i: number, j: number): void {
    if (this.winner) return;

    const index = i * this.tableSize + j;
    if (this.gameState[index] === '0') {
      this.gameState =
        this.gameState.substring(0, index) +
        this.nextUp +
        this.gameState.substring(index + 1);
      this.nextUp = this.nextUp === 1 ? 2 : 1;

      if (this.countPlacedIcons() >= 5) {
        this.checkWinner();
      }
    }
  }

  getCurrentPlayerText(): string {
    if (this.isBoardFull()) {
      return 'Döntetlen!';
    }
    if (this.winner) {
      return `${this.winner === 1 ? 'X' : 'O'} a győztes. Gratula!`;
    }
    return this.nextUp === 1 ? 'X jön' : 'O jön';
  }

  isGameOver(): boolean {
    return this.winner !== null || this.isBoardFull();
  }

  resetGame(): void {
    this.gameState = this.createInitialGameState();
    this.winner = null;
    this.nextUp = 1;
  }

  hasGameStarted(): boolean {
    return this.countPlacedIcons() > 0;
  }

  saveGame(): void {
    if (this.isNameSaved) {
      this.gameService.updateGame(this.gameId!, this.gameState, this.gameName);
      return;
    }

    if (!this.showNameInput) {
      this.showNameInput = true;
      return;
    }

    if (this.gameName.trim() && !this.isBoardCreated) {
      this.gameService
        .createGame(this.gameState, this.gameName)
        .subscribe((response: CreateGameResponse) => {
          this.gameId = response.id;
          this.isBoardCreated = true;
          this.showNameInput = false;
          this.isNameSaved = true;
        });
    }
  }
}
