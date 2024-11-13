import { TestBed } from '@angular/core/testing';
import { HPManagementService } from './hp-management.service';
import { Character } from '../../../models/character.interface';

describe('HPManagementService', () => {
  let service: HPManagementService;
  let mockCharacter: Character;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HPManagementService]
    });
    service = TestBed.inject(HPManagementService);

    // Create a mock character based on the Character interface
    mockCharacter = {
      id: 'test',
      name: 'Test Character',
      currentHp: 45,
      maxHp: 45,
      baseMaxHp: 45,
      tempHp: 0,
      aidLevel: null,
      ac: 15,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      proficiencyBonus: 2,
      savingThrowProficiencies: {
        strength: false,
        dexterity: false,
        constitution: false,
        intelligence: false,
        wisdom: false,
        charisma: false
      },
      skillProficiencies: {
        acrobatics: false,
        animalHandling: false,
        arcana: false,
        athletics: false,
        deception: false,
        history: false,
        insight: false,
        intimidation: false,
        investigation: false,
        medicine: false,
        nature: false,
        perception: false,
        performance: false,
        persuasion: false,
        religion: false,
        sleightOfHand: false,
        stealth: false,
        survival: false
      },
      weaponProficiencies: [],
      toolProficiencies: [],
      languages: []
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('applyDamage', () => {
    it('should reduce current HP by damage amount', () => {
      service.applyDamage(mockCharacter, 10);
      expect(mockCharacter.currentHp).toBe(35);
    });

    it('should handle decimal damage by rounding down', () => {
      service.applyDamage(mockCharacter, 5.7);
      expect(mockCharacter.currentHp).toBe(40);
    });

    it('should reduce temp HP first', () => {
      mockCharacter.tempHp = 5;
      service.applyDamage(mockCharacter, 3);
      expect(mockCharacter.tempHp).toBe(2);
      expect(mockCharacter.currentHp).toBe(45);
    });
  });

  describe('applyHealing', () => {
    it('should increase current HP by healing amount', () => {
      mockCharacter.currentHp = 35;
      service.applyHealing(mockCharacter, 5);
      expect(mockCharacter.currentHp).toBe(40);
    });

    it('should not heal beyond max HP', () => {
      mockCharacter.currentHp = 40;
      service.applyHealing(mockCharacter, 10);
      expect(mockCharacter.currentHp).toBe(45);
    });
  });

  describe('applyAid', () => {
    it('should increase max and current HP by aid bonus', () => {
      service.applyAid(mockCharacter, 3);
      expect(mockCharacter.maxHp).toBe(55);
      expect(mockCharacter.currentHp).toBe(55);
    });

    it('should remove aid bonus when aid is removed', () => {
      mockCharacter.aidLevel = 3;
      mockCharacter.maxHp = 55;
      mockCharacter.currentHp = 55;
      
      service.applyAid(mockCharacter, null);
      expect(mockCharacter.maxHp).toBe(45);
      expect(mockCharacter.currentHp).toBe(45);
    });
  });
}); 
