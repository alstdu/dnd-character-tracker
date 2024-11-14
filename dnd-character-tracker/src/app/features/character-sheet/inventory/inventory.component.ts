import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../models/character.interface';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.sass'
})
export class InventoryComponent {
  @Input() character!: Character;

  getTotalWeight(): number {
    return this.character.inventory.reduce((total, item) => 
      total + (item.weight * item.quantity), 0);
  }

  getTotalValue(): number {
    return this.character.inventory.reduce((total, item) => 
      total + ((item.value || 0) * item.quantity), 0);
  }
}
