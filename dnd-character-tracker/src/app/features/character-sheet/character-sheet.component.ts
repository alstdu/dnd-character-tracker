import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CHARACTERS, Character } from '../../models/character.interface';
import { AbilityScoresComponent } from './ability-scores/ability-scores.component';
import { SavingThrowsComponent } from './saving-throws/saving-throws.component';
import { SkillsComponent } from './skills/skills.component';


@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AbilityScoresComponent,
    SavingThrowsComponent,
    SkillsComponent
  ],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.sass'
})
export class CharacterSheetComponent {
  character$!: Observable<Character | undefined>;
  damageAmount: number = 0;
  healAmount: number = 0;
  tempHpAmount: number = 0;
  spellLevels = [2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private route: ActivatedRoute) {
    this.character$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      map(id => CHARACTERS.find(char => char.id === id))
    );
  }

  applyDamage(character: Character, amount: number): void {
    if (amount <= 0) return;
    
    // First reduce temp HP
    if (character.tempHp > 0) {
      if (character.tempHp >= amount) {
        character.tempHp -= amount;
        amount = 0;
      } else {
        amount -= character.tempHp;
        character.tempHp = 0;
      }
    }

    // Then reduce regular HP
    if (amount > 0) {
      character.currentHp = Math.max(0, character.currentHp - amount);
    }
    
    this.damageAmount = 0;
  }

  applyHealing(character: Character, amount: number): void {
    if (amount <= 0) return;
    character.currentHp = Math.min(character.maxHp, character.currentHp + amount);
    this.healAmount = 0;
  }

  setTempHp(character: Character, amount: number): void {
    if (amount <= 0) return;
    character.tempHp = Math.max(character.tempHp, amount);
    this.tempHpAmount = 0;
  }

  applyAid(character: Character, level: number | null): void {
    // Remove old aid bonus
    if (character.aidLevel) {
      const oldBonus = this.getAidBonus(character.aidLevel);
      character.maxHp = character.baseMaxHp;
      // Only reduce current HP if it exceeds the new maximum
      character.currentHp = Math.min(character.currentHp, character.maxHp);
    }
    
    // Apply new aid bonus
    character.aidLevel = level;
    if (level) {
      const bonus = this.getAidBonus(level);
      character.maxHp = character.baseMaxHp + bonus;
      character.currentHp += bonus;  // Aid increases both max AND current HP
    }
  }

  getAidBonus(level: number): number {
    return (level - 1) * 5;
  }
}
