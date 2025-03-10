import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [RouterLink, CommonModule, MatIconModule],
  standalone: true,
})
export class GameComponent implements OnInit {
  tableSize: number = 3;
  gameState: string;
  isSaved: boolean = false;

  constructor() {
    this.gameState = '0'.repeat(Math.pow(this.tableSize, 2));
    this.gameState = '010201122';
  }

  ngOnInit() {
    console.log(this.gameState);
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
}
