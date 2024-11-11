export interface Character {
  id: string;
  name: string;
  currentHp: number;
  maxHp: number;
}

export const CHARACTERS: Character[] = [
  { id: '1', name: 'Euphraxia', currentHp: 38, maxHp: 38 },
  { id: '2', name: 'Wilora', currentHp: 45, maxHp: 45 }
];
