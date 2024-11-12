import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../models/character.interface';

@Component({
  selector: 'app-ability-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ability-scores.component.html',
  styleUrl: './ability-scores.component.sass',
})
export class AbilityScoresComponent {
  @Input() character!: Character;

  getModifierString(score: number): string {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }

  get abilityScores() {
    return [
      { name: 'Strength', score: this.character.strength },
      { name: 'Dexterity', score: this.character.dexterity },
      { name: 'Constitution', score: this.character.constitution },
      { name: 'Intelligence', score: this.character.intelligence },
      { name: 'Wisdom', score: this.character.wisdom },
      { name: 'Charisma', score: this.character.charisma }
    ];
  }
}
