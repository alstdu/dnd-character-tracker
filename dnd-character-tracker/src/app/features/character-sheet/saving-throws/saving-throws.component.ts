import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../models/character.interface';

@Component({
  selector: 'app-saving-throws',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'saving-throws.component.html',
  styleUrl: 'saving-throws.component.sass',
})
export class SavingThrowsComponent {
  @Input() character!: Character;

  get saves() {
    return [
      { 
        name: 'Strength', 
        score: this.character.strength, 
        proficient: this.character.savingThrowProficiencies.strength 
      },
      { 
        name: 'Dexterity', 
        score: this.character.dexterity, 
        proficient: this.character.savingThrowProficiencies.dexterity 
      },
      { 
        name: 'Constitution', 
        score: this.character.constitution, 
        proficient: this.character.savingThrowProficiencies.constitution 
      },
      { 
        name: 'Intelligence', 
        score: this.character.intelligence, 
        proficient: this.character.savingThrowProficiencies.intelligence 
      },
      { 
        name: 'Wisdom', 
        score: this.character.wisdom, 
        proficient: this.character.savingThrowProficiencies.wisdom 
      },
      { 
        name: 'Charisma', 
        score: this.character.charisma, 
        proficient: this.character.savingThrowProficiencies.charisma 
      }
    ];
  }

  getSaveModifier(score: number, isProficient: boolean): string {
    const baseModifier = Math.floor((score - 10) / 2);
    const totalModifier = isProficient ? baseModifier + this.character.proficiencyBonus : baseModifier;
    return totalModifier >= 0 ? `+${totalModifier}` : `${totalModifier}`;
  }
} 
