import { Injectable } from '@angular/core';
import { Character } from '../../../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class HPManagementService {
  applyDamage(character: Character, amount: number): void {
    if (amount <= 0) return;
    
    const roundedDamage = Math.floor(amount);
    
    // First reduce temp HP
    if (character.tempHp > 0) {
      if (character.tempHp >= roundedDamage) {
        character.tempHp -= roundedDamage;
        return;
      } else {
        const remainingDamage = roundedDamage - character.tempHp;
        character.tempHp = 0;
        character.currentHp = Math.max(0, character.currentHp - remainingDamage);
      }
    } else {
      character.currentHp = Math.max(0, character.currentHp - roundedDamage);
    }
  }

  applyHealing(character: Character, amount: number): void {
    if (amount <= 0) return;
    character.currentHp = Math.min(character.maxHp, character.currentHp + amount);
  }

  setTempHp(character: Character, amount: number): void {
    if (amount <= 0) return;
    character.tempHp = Math.max(character.tempHp, amount);
  }

  applyAid(character: Character, level: number | null): void {
    // Remove old aid bonus
    if (character.aidLevel) {
      const oldBonus = this.getAidBonus(character.aidLevel);
      character.maxHp = character.baseMaxHp;
      character.currentHp = Math.min(character.currentHp, character.maxHp);
    }
    
    // Apply new aid bonus
    character.aidLevel = level;
    if (level) {
      const bonus = this.getAidBonus(level);
      character.maxHp = character.baseMaxHp + bonus;
      character.currentHp += bonus;
    }
  }

  private getAidBonus(level: number): number {
    return level * 5;
  }
}
