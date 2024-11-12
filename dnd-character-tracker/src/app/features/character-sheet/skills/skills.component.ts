import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../models/character.interface';

interface Skill {
  name: string;
  ability: 'STR' | 'DEX' | 'INT' | 'WIS' | 'CHA';
  key: keyof Character['skillProficiencies'];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'skills.component.html',
  styleUrl: 'skills.component.sass'
})
export class SkillsComponent {
  @Input() character!: Character;

  readonly skills: Skill[] = [
    { name: 'Athletics', ability: 'STR', key: 'athletics' },
    { name: 'Acrobatics', ability: 'DEX', key: 'acrobatics' },
    { name: 'Sleight of Hand', ability: 'DEX', key: 'sleightOfHand' },
    { name: 'Stealth', ability: 'DEX', key: 'stealth' },
    { name: 'Arcana', ability: 'INT', key: 'arcana' },
    { name: 'History', ability: 'INT', key: 'history' },
    { name: 'Investigation', ability: 'INT', key: 'investigation' },
    { name: 'Nature', ability: 'INT', key: 'nature' },
    { name: 'Religion', ability: 'INT', key: 'religion' },
    { name: 'Animal Handling', ability: 'WIS', key: 'animalHandling' },
    { name: 'Insight', ability: 'WIS', key: 'insight' },
    { name: 'Medicine', ability: 'WIS', key: 'medicine' },
    { name: 'Perception', ability: 'WIS', key: 'perception' },
    { name: 'Survival', ability: 'WIS', key: 'survival' },
    { name: 'Deception', ability: 'CHA', key: 'deception' },
    { name: 'Intimidation', ability: 'CHA', key: 'intimidation' },
    { name: 'Performance', ability: 'CHA', key: 'performance' },
    { name: 'Persuasion', ability: 'CHA', key: 'persuasion' }
  ];

  private readonly abilityMap: Record<Skill['ability'], keyof Character> = {
    'STR': 'strength',
    'DEX': 'dexterity',
    'INT': 'intelligence',
    'WIS': 'wisdom',
    'CHA': 'charisma'
  };

  getModifierForAbility(abilityShort: Skill['ability']): number {
    const ability = this.abilityMap[abilityShort];
    const score = this.character[ability] as number;
    return Math.floor((score - 10) / 2);
  }

  getSkillModifier(skill: Skill): string {
    const baseModifier = this.getModifierForAbility(skill.ability);
    const proficiencyBonus = this.character.skillProficiencies[skill.key] 
      ? this.character.proficiencyBonus 
      : 0;
    const total = baseModifier + proficiencyBonus;
    return total >= 0 ? `+${total}` : `${total}`;
  }

  isProficient(skill: Skill): boolean {
    return this.character.skillProficiencies[skill.key];
  }
} 
