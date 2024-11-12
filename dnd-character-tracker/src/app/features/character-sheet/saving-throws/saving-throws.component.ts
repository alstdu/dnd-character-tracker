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
      // ... repeat for other abilities
    ];
  }

  getSaveModifier(score: number, isProficient: boolean): string {
    const baseModifier = Math.floor((score - 10) / 2);
    const totalModifier = isProficient ? baseModifier + this.character.proficiencyBonus : baseModifier;
    return totalModifier >= 0 ? `+${totalModifier}` : `${totalModifier}`;
  }
} 
