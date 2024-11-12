export interface Character {
  id: string;
  name: string;
  currentHp: number;
  maxHp: number;
  baseMaxHp: number;
  tempHp: number;
  aidLevel: number | null;
  ac: number;
}

export const CHARACTERS: Character[] = [
  { 
    id: '1', 
    name: 'Euphraxia', 
    currentHp: 38, 
    maxHp: 38, 
    baseMaxHp: 38,
    tempHp: 0,
    aidLevel: null,
    ac: 16 
  },
  { 
    id: '2', 
    name: 'Wilora', 
    currentHp: 45, 
    maxHp: 45, 
    baseMaxHp: 45,
    tempHp: 0,
    aidLevel: null,
    ac: 16 
  }
];
