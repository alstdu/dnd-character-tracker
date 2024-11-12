export interface Character {
  id: string;
  name: string;
  currentHp: number;
  maxHp: number;
  baseMaxHp: number;
  tempHp: number;
  aidLevel: number | null;
  ac: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencyBonus: number;
  savingThrowProficiencies: {
    strength: boolean;
    dexterity: boolean;
    constitution: boolean;
    intelligence: boolean;
    wisdom: boolean;
    charisma: boolean;
  };
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
    ac: 16,
    strength: 8,
    dexterity: 12,
    constitution: 14,
    intelligence: 12,
    wisdom: 14,
    charisma: 18,
    proficiencyBonus: 3,
    savingThrowProficiencies: {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: true,
      charisma: true
    }
  },
  { 
    id: '2', 
    name: 'Wilora', 
    currentHp: 45, 
    maxHp: 45, 
    baseMaxHp: 45,
    tempHp: 0,
    aidLevel: null,
    ac: 16,
    strength: 8,
    dexterity: 14,
    constitution: 16,
    intelligence: 16,
    wisdom: 12,
    charisma: 14,
    proficiencyBonus: 3,
    savingThrowProficiencies: {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: true,
      charisma: true
    }
  }
];
