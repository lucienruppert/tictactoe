import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WINNING_PATTERNS_3 } from './winningPatterns';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [RouterLink, CommonModule, MatIconModule],
  standalone: true,
})
export class GameComponent {
  tableSize: number = 3;
  gameState: string;
  isSaved: boolean = false;
  nextUp: number = 1;
  winner: number | null = null;

  private createInitialGameState(): string {
    return '0'.repeat(Math.pow(this.tableSize, 2));
  }

  constructor() {
    this.gameState = this.createInitialGameState();
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
      const matches = pattern.split('').every((value, index) => {
        return value === '0' || value === this.gameState[index];
      });
      if (matches) {
        this.winner = this.nextUp === 1 ? 2 : 1;
      }
      return matches;
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
}
