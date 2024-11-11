import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CHARACTERS, Character } from '../../models/character.interface';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.sass'
})
export class CharacterSheetComponent {
  character$!: Observable<Character | undefined>;

  constructor(private route: ActivatedRoute) {
    this.character$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      map(id => CHARACTERS.find(char => char.id === id))
    );
  }

  adjustHp(character: Character, amount: number): void {
    const newHp = character.currentHp + amount;
    character.currentHp = Math.min(Math.max(0, newHp), character.maxHp);
  }
}
