export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  description?: string;
  value?: number;  // in gold pieces
  equipped?: boolean;
}

export interface Equipment {
  armor?: InventoryItem;
  mainHand?: InventoryItem;
  offHand?: InventoryItem;
  accessories: InventoryItem[];  // rings, amulets, etc.
}

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
  weaponProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];
  equipment: Equipment;
  inventory: InventoryItem[];
  gold: number;
  silver: number;
  copper: number;
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
    },
    weaponProficiencies: ['Quarterstaff', 'Shortbow', 'Daggers', 'Spears', 'Longbows'],
    toolProficiencies: ['Herbalism Kit'],
    languages: ['Common', 'Sylvan', 'Elvish', 'Druidic', 'Beast Speak', 'Plant Speak'],
    equipment: {
      armor: {
        id: '1',
        name: 'Cloak of the Mildengrove',
        quantity: 1,
        weight: 1,
        description: 'The cloak is made of high quality fabric that adapts to the suroundings of the forest. Adv. on stealth checks while in the wild, and grants a +1 bonus to Spell Attacks and Spell DCs.',
        value: 0,
        equipped: true
      },
      mainHand: {
        id: '2',
        name: 'Quarterstaff',
        quantity: 1,
        weight: 4,
        description: 'A quarterstaff made of wood. 1d6 bludgeoning damage.',
        value: 2,
        equipped: true
      },
      accessories: [{
        id: '3',
        name: 'Band of Whispers',
        quantity: 1,
        weight: 0.1,
        description: 'A silver band with blue stones taken off the body of a bandit. Grants the message cantrip. 1 charge = 1 use. 1 minute per recharge.',
        value: 0,
        equipped: true
      }]
    },
    inventory: [
      {
      id: '4',
      name: 'Herbalism Kit',
      quantity: 1,
      weight: 0.5,
      description: 'A kit for gathering herbs and plants.',
      value: 5,
      equipped: true
    },
    {
      id: '5',
      name: 'Rations',
      quantity: 5,
      weight: 1,
      description: 'Daily rations of dried food.',
      value: 0.5
    },
    {
      id: '6',
      name: 'Bedroll',
      quantity: 2,
      weight: 5,
      description: 'A bedroll for sleeping.',
      value: 1
    },
    {
      id: '7',
      name: 'Find Familiar Kit',
      quantity: 2,
      weight: 1,
      description: 'A small pouch of ingredients for summoning Chestnut.',
      value: 10
    },
    {
      id: '8',
      name: 'Bonsai',
      quantity: 1,
      weight: 3,
      description: 'The life source of Euphraxia.',
      value: 0
    },
    {
      id: '9',
      name: 'Waterskin',
      quantity: 1,
      weight: 5,
      description: 'Refillable waterskin.',
      value: 0.5
    },
    {
      id: '10',
      name: 'Mess Kit',
      quantity: 1,
      weight: 5,
      description: 'A small kit for preparing food.',
      value: 0.5
    },
    {
      id: '11',
      name: 'Torch',
      quantity: 1,
      weight: 3,
      description: 'A torch with a flint and steel.',
      value: 0.5
    },
    {
      id: '12',
      name: 'Small Knife',
      quantity: 1,
      weight: 1,
      description: 'A small knife.',
      value: 0.5
    },
    {
      id: '13',
      name: 'Sling',
      quantity: 1,
      weight: 1,
      description: 'A sling for throwing stones. 1d6 + spell casting modifier of bludgeoning damage. Range is 60/120 feet',
      value: 0.5
    },
  ],
    gold: 243,
    silver: 91,
    copper: 159
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
    },
    weaponProficiencies: ['Quarterstaff', 'Shortbow', 'Daggers', 'Spears', 'Longbows'],
    toolProficiencies: ['Herbalism Kit'],
    languages: ['Common', 'Sylvan', 'Elvish', 'Druidic', 'Beast Speak', 'Plant Speak'],
    equipment: {
      armor: {
        id: '1',
        name: 'Leather Armor',
        quantity: 1,
        weight: 10,
        description: 'A sturdy leather armor.',
        value: 10,
        equipped: true
      },
      mainHand: {
        id: '2',
        name: 'Longsword',
        quantity: 1,
        weight: 5,
        description: 'A longsword with a hilt of silver.',
        value: 15,
        equipped: true
      },
      offHand: {
        id: '3',
        name: 'Shield',
        quantity: 1,
        weight: 5,
        description: 'A sturdy wooden shield.',
        value: 5,
        equipped: true
      },
      accessories: [{
        id: '4',
        name: 'Silver Ring',
        quantity: 1,
        weight: 0.1,
        description: 'A silver ring with a small gem.',
        value: 2,
        equipped: true
      }]
    },
    inventory: [{
      id: '5',
      name: 'Herbalism Kit',
      quantity: 1,
      weight: 0.5,
      description: 'A kit for gathering herbs and plants.',
      value: 5,
      equipped: true
    }],
    gold: 10,
    silver: 0,
    copper: 0
  }
];
