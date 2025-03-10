import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StoredGamesComponent } from './stored-games/stored-games.component';

export const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'stored-games', component: StoredGamesComponent },
];
