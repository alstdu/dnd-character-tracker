import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../../../models/character.interface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HPManagementService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  applyDamage(character: Character, amount: number): Observable<Character> {
    if (amount <= 0) return of(character);
    
    const roundedDamage = Math.floor(amount);
    let newTempHp = character.tempHp;
    let newCurrentHp = character.currentHp;
    
    // First reduce temp hp
    if (newTempHp > 0) {
      if (newTempHp >= roundedDamage) {
        newTempHp -= roundedDamage;
      } else {
        const remainingDamage = roundedDamage - newTempHp;
        newTempHp = 0;
        newCurrentHp = Math.max(0, newCurrentHp - remainingDamage);
      }
    } else {
      newCurrentHp = Math.max(0, newCurrentHp - roundedDamage);
    }

    return this.updateHp(character.id, {
      currentHp: newCurrentHp,
      tempHp: newTempHp,
      aidLevel: character.aidLevel
    });
  }

  applyHealing(character: Character, amount: number): Observable<Character> {
    if (amount <= 0) return of(character);
    const newCurrentHp = Math.min(character.maxHp, character.currentHp + amount);
    
    return this.updateHp(character.id, {
      currentHp: newCurrentHp,
      tempHp: character.tempHp,
      aidLevel: character.aidLevel
    });
  }

  setTempHp(character: Character, amount: number): Observable<Character> {
    if (amount <= 0) return of(character);
    const newTempHp = Math.max(character.tempHp, amount);
    
    return this.updateHp(character.id, {
      currentHp: character.currentHp,
      tempHp: newTempHp,
      aidLevel: character.aidLevel
    });
  }

  applyAid(character: Character, level: number | null): Observable<Character> {
    let newCurrentHp = character.currentHp;
    
    if (!character.aidLevel && level) {
        // Adding Aid when there was none - increase current HP
        newCurrentHp += this.getAidBonus(level);
    }
    
    // Calculate new max HP and truncate if necessary
    const newMaxHp = character.baseMaxHp + (level ? this.getAidBonus(level) : 0);
    newCurrentHp = Math.min(newCurrentHp, newMaxHp);
    
    return this.updateHp(character.id, {
        currentHp: newCurrentHp,
        tempHp: character.tempHp,
        aidLevel: level
    });
  }

  private updateHp(characterId: string, updates: {
    currentHp: number,
    tempHp: number,
    aidLevel: number | null
  }): Observable<Character> {
    return this.http.patch<Character>(`${this.apiUrl}/characters/${characterId}/hp`, updates)
      .pipe(
        map(response => ({
          ...response,
          maxHp: this.calculateMaxHp(response.baseMaxHp, response.aidLevel)
        }))
      );
  }

  private getAidBonus(level: number | null): number {
    return level ? (level - 1) * 5 : 0;
  }

  private calculateMaxHp(baseMaxHp: number, aidLevel: number | null): number {
    return baseMaxHp + this.getAidBonus(aidLevel);
  }
}
