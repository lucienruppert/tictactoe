export interface CreateGameResponse {
  id: number;
  name: string;
  board: string;
}

export type StoredGame = CreateGameResponse;
