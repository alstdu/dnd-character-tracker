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
    const inventoryWeight = this.character.inventory.reduce((total, item) => 
      total + (item.weight * item.quantity), 0);
    
    const equipmentWeight = this.getEquipmentWeight();
    
    return inventoryWeight + equipmentWeight;
  }

  private getEquipmentWeight(): number {
    let weight = 0;
    
    // Add armor weight if equipped
    if (this.character.equipment.armor) {
      weight += this.character.equipment.armor.weight;
    }
    
    // Add main hand weapon weight if equipped
    if (this.character.equipment.mainHand) {
      weight += this.character.equipment.mainHand.weight;
    }
    
    // Add off hand item weight if equipped
    if (this.character.equipment.offHand) {
      weight += this.character.equipment.offHand.weight;
    }
    
    // Add accessories weight
    weight += this.character.equipment.accessories.reduce((total, item) => 
      total + (item?.weight || 0), 0);
    
    return weight;
  }

  getTotalValue(): number {
    const inventoryValue = this.character.inventory.reduce((total, item) => 
      total + ((item.value || 0) * item.quantity), 0);
    
    const equipmentValue = this.getEquipmentValue();
    
    return inventoryValue + equipmentValue;
  }

  private getEquipmentValue(): number {
    let value = 0;
    
    if (this.character.equipment.armor) {
      value += this.character.equipment.armor.value || 0;
    }
    
    if (this.character.equipment.mainHand) {
      value += this.character.equipment.mainHand.value || 0;
    }
    
    if (this.character.equipment.offHand) {
      value += this.character.equipment.offHand.value || 0;
    }
    
    value += this.character.equipment.accessories.reduce((total, item) => 
      total + (item?.value || 0), 0);
    
    return value;
  }
}
