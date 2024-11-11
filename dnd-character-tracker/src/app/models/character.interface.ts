export interface Character {
  id: string;
  name: string;
  currentHp: number;
  maxHp: number;
  ac: number;
}

export const CHARACTERS: Character[] = [
  { id: '1', name: 'Euphraxia', currentHp: 38, maxHp: 38, ac: 16  },
  { id: '2', name: 'Wilora', currentHp: 45, maxHp: 45, ac: 16 }
];
