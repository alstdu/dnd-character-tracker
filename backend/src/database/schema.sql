CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    current_hp INTEGER NOT NULL,
    max_hp INTEGER NOT NULL,
    base_max_hp INTEGER NOT NULL,
    temp_hp INTEGER NOT NULL DEFAULT 0,
    aid_level INTEGER,
    ac INTEGER NOT NULL,
    strength INTEGER NOT NULL,
    dexterity INTEGER NOT NULL,
    constitution INTEGER NOT NULL,
    intelligence INTEGER NOT NULL,
    wisdom INTEGER NOT NULL,
    charisma INTEGER NOT NULL,
    proficiency_bonus INTEGER NOT NULL,
    spell_save_dc INTEGER,
    spell_attack_modifier INTEGER,
    gold INTEGER NOT NULL DEFAULT 0,
    silver INTEGER NOT NULL DEFAULT 0,
    copper INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS character_saving_throws (
    character_id INTEGER NOT NULL,
    ability TEXT CHECK(ability IN ('strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma')) NOT NULL,
    is_proficient BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (character_id, ability),
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_skills (
    character_id INTEGER NOT NULL,
    skill TEXT CHECK(skill IN (
        'acrobatics', 'animal_handling', 'arcana', 'athletics',
        'deception', 'history', 'insight', 'intimidation',
        'investigation', 'medicine', 'nature', 'perception',
        'performance', 'persuasion', 'religion', 'sleight_of_hand',
        'stealth', 'survival'
    )) NOT NULL,
    is_proficient INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (character_id, skill),
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_weapon_proficiencies (
    character_id INTEGER NOT NULL,
    proficiency TEXT NOT NULL,
    PRIMARY KEY (character_id, proficiency),
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_tool_proficiencies (
    character_id INTEGER NOT NULL,
    proficiency TEXT NOT NULL,
    PRIMARY KEY (character_id, proficiency),
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_languages (
    character_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    PRIMARY KEY (character_id, language),
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    weight REAL NOT NULL,
    value REAL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS character_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    equipped BOOLEAN NOT NULL DEFAULT FALSE,
    slot TEXT CHECK(slot IN ('armor', 'main_hand', 'off_hand', 'accessory', 'inventory')),
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE INDEX idx_character_items_character_id ON character_items(character_id);
CREATE INDEX idx_character_skills_character_id ON character_skills(character_id);

CREATE TRIGGER IF NOT EXISTS update_character_timestamp 
AFTER UPDATE ON characters
FOR EACH ROW
BEGIN
    UPDATE characters 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;
