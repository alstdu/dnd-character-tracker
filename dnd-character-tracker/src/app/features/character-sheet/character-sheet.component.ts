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
import { HPManagementService } from './hp-management/hp-management.service';
import { InventoryComponent } from './inventory/inventory.component';
import { EquipmentComponent } from './equipment/equipment.component';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AbilityScoresComponent,
    SavingThrowsComponent,
    SkillsComponent,
    InventoryComponent,
    EquipmentComponent
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
  showProficiencies = false;

  constructor(
    private route: ActivatedRoute,
    private hpService: HPManagementService
  ) {
    this.character$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      map(id => CHARACTERS.find(char => char.id === id))
    );
  }

  applyDamage(character: Character, amount: number): void {
    this.hpService.applyDamage(character, amount);
    this.damageAmount = 0;
  }

  applyHealing(character: Character, amount: number): void {
    this.hpService.applyHealing(character, amount);
    this.healAmount = 0;
  }

  setTempHp(character: Character, amount: number): void {
    this.hpService.setTempHp(character, amount);
    this.tempHpAmount = 0;
  }

  applyAid(character: Character, level: number | null): void {
    this.hpService.applyAid(character, level);
  }

  getAidBonus(level: number): number {
    return (level - 1) * 5;
  }

  getModifierString(modifier: number): string {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }

  toggleProficiencies(): void {
    this.showProficiencies = !this.showProficiencies;
  }
}
