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
  spellSaveDC?: number;
  spellAttackModifier?: number;
  savingThrowProficiencies: {
    strength: boolean;
    dexterity: boolean;
    constitution: boolean;
    intelligence: boolean;
    wisdom: boolean;
    charisma: boolean;
  };
  skillProficiencies: {
    acrobatics: boolean;
    animalHandling: boolean;
    arcana: boolean;
    athletics: boolean;
    deception: boolean;
    history: boolean;
    insight: boolean;
    intimidation: boolean;
    investigation: boolean;
    medicine: boolean;
    nature: boolean;
    perception: boolean;
    performance: boolean;
    persuasion: boolean;
    religion: boolean;
    sleightOfHand: boolean;
    stealth: boolean;
    survival: boolean;
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
    spellSaveDC: 16,
    spellAttackModifier: 8,
    savingThrowProficiencies: {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: true,
      charisma: true
    },
    skillProficiencies: {
      acrobatics: false,
      animalHandling: true,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: true,
      perception: false,
      performance: false,
      persuasion: true,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: true
    }
  },
  { 
    id: '2', 
    name: 'Willora', 
    currentHp: 45, 
    maxHp: 45, 
    baseMaxHp: 45,
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
    spellSaveDC: 15,
    spellAttackModifier: 7,
    savingThrowProficiencies: {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: true,
      charisma: true
    },
    skillProficiencies: {
      acrobatics: false,
      animalHandling: true,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: true,
      perception: false,
      performance: false,
      persuasion: true,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: true
    }
  }
];
