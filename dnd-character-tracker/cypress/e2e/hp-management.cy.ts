describe('HP Management', () => {
    beforeEach(() => {
      cy.visit('/character/2')
    })
  
    it('should apply damage correctly', () => {
      cy.get('.hp-display').should('contain', '45/45')
      cy.get('input[placeholder="Damage"]').type('5')
      cy.get('button').contains('Apply Damage').click()
      cy.get('.hp-display').should('contain', '40/45')
    })
  
    it('should handle temp HP when taking damage', () => {
      cy.get('input[placeholder="Temp HP"]').type('10')
      cy.get('button').contains('Set Temp HP').click()
      cy.get('.temp-hp').should('contain', '10 temp HP')
      cy.get('input[placeholder="Damage"]').type('5')
      cy.get('button').contains('Apply Damage').click()
      cy.get('.temp-hp').should('contain', '5 temp HP')
    })
  
    it('should apply healing correctly', () => {
      // First damage the character
      cy.get('input[placeholder="Damage"]').type('10')
      cy.get('button').contains('Apply Damage').click()
      // Then heal
      cy.get('input[placeholder="Healing"]').type('5')
      cy.get('button').contains('Heal').click()
      cy.get('.hp-display').should('contain', '40/45')
    })
  
    it('should increase max HP when Aid is applied', () => {
        // Base HP should be 45/45
        cy.get('.hp-display').should('contain', '45/45')
        
        // Apply level 2 Aid (+5 HP)
        cy.get('.aid-controls select').select('Level 2 (+5)')
        cy.get('.hp-display').should('contain', '50/50')
        cy.get('.aid-bonus').should('contain', '45 + Aid[5]')
      })
      
      it('should handle different Aid spell levels', () => {
        // Try level 3 Aid (+10 HP)
        cy.get('.aid-controls select').select('Level 3 (+10)')
        cy.get('.hp-display').should('contain', '55/55')
        cy.get('.aid-bonus').should('contain', '45 + Aid[10]')
      })
      
      it('should remove Aid effect when set to No Aid', () => {
        // First apply Aid
        cy.get('.aid-controls select').select('Level 2 (+5)')
        cy.get('.hp-display').should('contain', '50/50')
        
        // Then remove it
        cy.get('.aid-controls select').select('No Aid')
        cy.get('.hp-display').should('contain', '45/45')
        cy.get('.aid-bonus').should('not.exist')
      })

    it('should not allow HP to go below 0', () => {
        cy.get('input[placeholder="Damage"]').type('100')
        cy.get('button').contains('Apply Damage').click()
        cy.get('.hp-display').should('contain', '0/45')
    })

    it('should not allow healing beyond max HP', () => {
        cy.get('input[placeholder="Healing"]').type('100')
        cy.get('button').contains('Heal').click()
        cy.get('.hp-display').should('contain', '45/45')
    })

    it('should handle decimal/floating point damage correctly', () => {
        cy.get('input[placeholder="Damage"]').type('5.5')
        cy.get('button').contains('Apply Damage').click()
        cy.get('.hp-display').should('contain', '39/45')
    })

    it('should handle negative input values gracefully', () => {
        cy.get('input[placeholder="Damage"]').type('-10')
        cy.get('button').contains('Apply Damage').click()
        cy.get('.hp-display').should('contain', '45/45') // Should not change HP
    })

    it('should handle temp HP and Aid interaction correctly', () => {
        // Apply Aid first
        cy.get('.aid-controls select').select('Level 2 (+5)')
        // Add temp HP
        cy.get('input[placeholder="Temp HP"]').type('10')
        cy.get('button').contains('Set Temp HP').click()
        // Verify both are showing
        cy.get('.hp-display').should('contain', '50/50')
        cy.get('.temp-hp').should('contain', '10 temp HP')
        cy.get('.aid-bonus').should('contain', '45 + Aid[5]')
        // Apply large damage to remove temp HP and some regular HP
        cy.get('input[placeholder="Damage"]').type('15')
        cy.get('button').contains('Apply Damage').click()
        cy.get('.temp-hp').should('not.exist')
        cy.get('.hp-display').should('contain', '45/50')
    })
})
