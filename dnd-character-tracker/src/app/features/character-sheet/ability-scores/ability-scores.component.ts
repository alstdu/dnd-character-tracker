import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ability-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ability-scores.component.html',
  styleUrl: './ability-scores.component.sass',
})
export class AbilityScoresComponent {
  @Input() strength!: number;
  @Input() dexterity!: number;
  @Input() constitution!: number;
  @Input() intelligence!: number;
  @Input() wisdom!: number;
  @Input() charisma!: number;

  get abilities() {
    return [
      { name: 'Strength', score: this.strength },
      { name: 'Dexterity', score: this.dexterity },
      { name: 'Constitution', score: this.constitution },
      { name: 'Intelligence', score: this.intelligence },
      { name: 'Wisdom', score: this.wisdom },
      { name: 'Charisma', score: this.charisma }
    ];
  }

  getModifierString(score: number): string {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }
}
