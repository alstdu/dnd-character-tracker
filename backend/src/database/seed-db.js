import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

// Character data
const characters = [
    {
        id: '1',
        name: 'Euphraxia',
        currentHp: 38,
        maxHp: 38,
        baseMaxHp: 38,
        tempHp: 0,
        aidLevel: null,
        ac: 16,
        strength: 8,
        dexterity: 12,
        constitution: 14,
        intelligence: 12,
        wisdom: 14,
        charisma: 18,
        proficiencyBonus: 3,
        spellSaveDC: 16,
        spellAttackModifier: 8,
        gold: 243,
        silver: 91,
        copper: 159
    },
    {
        id: '2',
        name: 'Willora',
        currentHp: 45,
        maxHp: 45,
        baseMaxHp: 45,
        tempHp: 0,
        aidLevel: null,
        ac: 16,
        strength: 8,
        dexterity: 12,
        constitution: 14,
        intelligence: 12,
        wisdom: 14,
        charisma: 18,
        proficiencyBonus: 3,
        spellSaveDC: 15,
        spellAttackModifier: 7,
        gold: 10,
        silver: 0,
        copper: 0
    }
];

// Items data
const items = [
    // Euphraxia's items
    {
        id: '1', name: 'Cloak of the Mildengrove', weight: 1, value: 0,
        description: 'The cloak is made of high quality fabric that adapts to the suroundings of the forest. Adv. on stealth checks while in the wild, and grants a +1 bonus to Spell Attacks and Spell DCs.'
    },
    {
        id: '2', name: 'Quarterstaff', weight: 4, value: 2,
        description: 'A quarterstaff made of wood. 1d6 bludgeoning damage.'
    },
    {
        id: '3', name: 'Band of Whispers', weight: 0.1, value: 0,
        description: 'A silver band with blue stones taken off the body of a bandit. Grants the message cantrip. 1 charge = 1 use. 1 minute per recharge.'
    },
    {
        id: '4', name: 'Herbalism Kit', weight: 0.5, value: 5,
        description: 'A kit for gathering herbs and plants.'
    },
    {
        id: '5', name: 'Rations', weight: 1, value: 0.5,
        description: 'Daily rations of dried food.'
    },
    {
        id: '6', name: 'Bedroll', weight: 5, value: 1,
        description: 'A bedroll for sleeping.'
    },
    {
        id: '7', name: 'Find Familiar Kit', weight: 1, value: 10,
        description: 'A small pouch of ingredients for summoning Chestnut.'
    },
    {
        id: '8', name: 'Bonsai', weight: 3, value: 0,
        description: 'The life source of Euphraxia.'
    },
    {
        id: '9', name: 'Waterskin', weight: 5, value: 0.5,
        description: 'Refillable waterskin.'
    },
    {
        id: '10', name: 'Mess Kit', weight: 5, value: 0.5,
        description: 'A small kit for preparing food.'
    },
    {
        id: '11', name: 'Torch', weight: 3, value: 0.5,
        description: 'A torch with a flint and steel.'
    },
    {
        id: '12', name: 'Small Knife', weight: 1, value: 0.5,
        description: 'A small knife.'
    },
    {
        id: '13', name: 'Sling', weight: 1, value: 0.5,
        description: 'A sling for throwing stones. 1d6 + spell casting modifier of bludgeoning damage. Range is 60/120 feet'
    },
    // Willora's items
    {
        id: '14', name: 'Leather Armor', weight: 10, value: 10,
        description: 'A sturdy leather armor.'
    },
    {
        id: '15', name: 'Longsword', weight: 5, value: 15,
        description: 'A longsword with a hilt of silver.'
    },
    {
        id: '16', name: 'Shield', weight: 5, value: 5,
        description: 'A sturdy wooden shield.'
    },
    {
        id: '17', name: 'Silver Ring', weight: 0.1, value: 2,
        description: 'A silver ring with a small gem.'
    }
];

// Character-Items relationships
const characterItems = [
    // Euphraxia's equipment
    { character_id: '1', item_id: '1', quantity: 1, equipped: true, slot: 'armor' },
    { character_id: '1', item_id: '2', quantity: 1, equipped: true, slot: 'main_hand' },
    { character_id: '1', item_id: '3', quantity: 1, equipped: true, slot: 'accessory' },
    // Euphraxia's inventory
    { character_id: '1', item_id: '4', quantity: 1, equipped: true, slot: 'inventory' },
    { character_id: '1', item_id: '5', quantity: 5, equipped: false, slot: 'inventory' },
    { character_id: '1', item_id: '6', quantity: 2, equipped: false, slot: 'inventory' },
    { character_id: '1', item_id: '7', quantity: 2, equipped: false, slot: 'inventory' },
    { character_id: '1', item_id: '8', quantity: 1, equipped: false, slot: 'inventory' },
    { character_id: '1', item_id: '9', quantity: 1, equipped: false, slot: 'inventory' },
    { character_id: '1', item_id: '10', quantity: 1, equipped: false, slot: 'inventory' },
    // ... all other Euphraxia's items ...
    
    // Willora's equipment
    { character_id: '2', item_id: '14', quantity: 1, equipped: true, slot: 'armor' },
    { character_id: '2', item_id: '15', quantity: 1, equipped: true, slot: 'main_hand' },
    { character_id: '2', item_id: '16', quantity: 1, equipped: true, slot: 'off_hand' },
    { character_id: '2', item_id: '17', quantity: 1, equipped: true, slot: 'accessory' }
];

// Saving throw proficiencies
const savingThrows = [
    // Euphraxia
    { character_id: '1', ability: 'wisdom', is_proficient: true },
    { character_id: '1', ability: 'charisma', is_proficient: true },
    // Willora
    { character_id: '2', ability: 'wisdom', is_proficient: true },
    { character_id: '2', ability: 'charisma', is_proficient: true }
];

// Skill proficiencies
const skills = [
    // Euphraxia
    { character_id: '1', skill: 'animal_handling', is_proficient: true },
    { character_id: '1', skill: 'nature', is_proficient: true },
    { character_id: '1', skill: 'persuasion', is_proficient: true },
    { character_id: '1', skill: 'survival', is_proficient: true },
    // Willora (same proficiencies)
    { character_id: '2', skill: 'animal_handling', is_proficient: true },
    { character_id: '2', skill: 'nature', is_proficient: true },
    { character_id: '2', skill: 'persuasion', is_proficient: true },
    { character_id: '2', skill: 'survival', is_proficient: true }
];

// Weapon proficiencies
const weaponProficiencies = [
    // Euphraxia
    { character_id: '1', proficiency: 'Quarterstaff' },
    { character_id: '1', proficiency: 'Shortbow' },
    { character_id: '1', proficiency: 'Daggers' },
    { character_id: '1', proficiency: 'Spears' },
    { character_id: '1', proficiency: 'Longbows' },
    // Willora (same proficiencies)
    { character_id: '2', proficiency: 'Quarterstaff' },
    { character_id: '2', proficiency: 'Shortbow' },
    { character_id: '2', proficiency: 'Daggers' },
    { character_id: '2', proficiency: 'Spears' },
    { character_id: '2', proficiency: 'Longbows' }
];

// Tool proficiencies
const toolProficiencies = [
    { character_id: '1', proficiency: 'Herbalism Kit' },
    { character_id: '2', proficiency: 'Herbalism Kit' }
];

// Languages
const languages = [
    // Euphraxia
    { character_id: '1', language: 'Common' },
    { character_id: '1', language: 'Sylvan' },
    { character_id: '1', language: 'Elvish' },
    { character_id: '1', language: 'Druidic' },
    { character_id: '1', language: 'Beast Speak' },
    { character_id: '1', language: 'Plant Speak' },
    // Willora (same languages)
    { character_id: '2', language: 'Common' },
    { character_id: '2', language: 'Sylvan' },
    { character_id: '2', language: 'Elvish' },
    { character_id: '2', language: 'Druidic' },
    { character_id: '2', language: 'Beast Speak' },
    { character_id: '2', language: 'Plant Speak' }
];

db.serialize(() => {
    // Insert characters
    const charStmt = db.prepare(`
        INSERT OR REPLACE INTO characters (
            id, name, current_hp, max_hp, base_max_hp, temp_hp, aid_level,
            ac, strength, dexterity, constitution, intelligence, wisdom, charisma,
            proficiency_bonus, spell_save_dc, spell_attack_modifier,
            gold, silver, copper
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    characters.forEach(char => {
        charStmt.run(
            char.id, char.name, char.currentHp, char.maxHp, char.baseMaxHp,
            char.tempHp, char.aidLevel, char.ac, char.strength, char.dexterity,
            char.constitution, char.intelligence, char.wisdom, char.charisma,
            char.proficiencyBonus, char.spellSaveDC, char.spellAttackModifier,
            char.gold, char.silver, char.copper
        );
    });
    charStmt.finalize();

    // Insert items
    const itemStmt = db.prepare('INSERT OR REPLACE INTO items (id, name, weight, value, description) VALUES (?, ?, ?, ?, ?)');
    items.forEach(item => {
        itemStmt.run(item.id, item.name, item.weight, item.value, item.description);
    });
    itemStmt.finalize();

    // Insert character items
    const charItemStmt = db.prepare('INSERT OR REPLACE INTO character_items (character_id, item_id, quantity, equipped, slot) VALUES (?, ?, ?, ?, ?)');
    characterItems.forEach(item => {
        charItemStmt.run(item.character_id, item.item_id, item.quantity, item.equipped, item.slot);
    });
    charItemStmt.finalize();

    // Insert saving throws
    const saveStmt = db.prepare('INSERT OR REPLACE INTO character_saving_throws (character_id, ability, is_proficient) VALUES (?, ?, ?)');
    savingThrows.forEach(save => {
        saveStmt.run(save.character_id, save.ability, save.is_proficient);
    });
    saveStmt.finalize();

    // Insert skills
    const skillStmt = db.prepare('INSERT OR REPLACE INTO character_skills (character_id, skill, is_proficient) VALUES (?, ?, ?)');
    skills.forEach(skill => {
        skillStmt.run(skill.character_id, skill.skill, skill.is_proficient);
    });
    skillStmt.finalize();

    // Insert weapon proficiencies
    const weaponStmt = db.prepare('INSERT OR REPLACE INTO character_weapon_proficiencies (character_id, proficiency) VALUES (?, ?)');
    weaponProficiencies.forEach(prof => {
        weaponStmt.run(prof.character_id, prof.proficiency);
    });
    weaponStmt.finalize();

    // Insert tool proficiencies
    const toolStmt = db.prepare('INSERT OR REPLACE INTO character_tool_proficiencies (character_id, proficiency) VALUES (?, ?)');
    toolProficiencies.forEach(prof => {
        toolStmt.run(prof.character_id, prof.proficiency);
    });
    toolStmt.finalize();

    // Insert languages
    const langStmt = db.prepare('INSERT OR REPLACE INTO character_languages (character_id, language) VALUES (?, ?)');
    languages.forEach(lang => {
        langStmt.run(lang.character_id, lang.language);
    });
    langStmt.finalize();

    console.log('Seed data inserted successfully');
    db.close();
});
