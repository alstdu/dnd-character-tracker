import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Add this utility function at the top
function snakeToCamel(obj) {
  if (!obj) return obj;
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamel(v));
  } else if (typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = snakeToCamel(obj[key]);
      return result;
    }, {});
  }
  return obj;
}

function calculateMaxHp(baseMaxHp, aidLevel) {
    // Aid is a 2nd level spell that gives +5 hp at level 2 and +5 more for each level thereafter
    const aidBonus = aidLevel ? (aidLevel - 1) * 5 : 0;
    return baseMaxHp + aidBonus;
}

// Get all characters (simplified for list view)
app.get('/api/characters', (req, res) => {
    db.all('SELECT id, name, current_hp, base_max_hp, aid_level FROM characters', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        rows.forEach(row => {
            row.maxHp = calculateMaxHp(row.base_max_hp, row.aid_level);
        });
        const camelRows = snakeToCamel(rows);
        res.json(camelRows);
    });
});

// Get single character with all details
app.get('/api/characters/:id', (req, res) => {
    const id = req.params.id;
    
    // Using Promise to handle nested queries more cleanly
    const getCharacter = new Promise((resolve, reject) => {
        db.get('SELECT * FROM characters WHERE id = ?', [id], (err, character) => {
            if (err) reject(err);
            else if (!character) reject(new Error('Character not found'));
            else resolve(character);
        });
    });

    const getSavingThrows = new Promise((resolve, reject) => {
        db.all('SELECT ability, is_proficient FROM character_saving_throws WHERE character_id = ?', 
            [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
    });

    const getSkills = new Promise((resolve, reject) => {
        db.all('SELECT skill, is_proficient FROM character_skills WHERE character_id = ?',
            [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
    });

    const getItems = new Promise((resolve, reject) => {
        db.all(`
            SELECT 
                i.id,
                i.name,
                i.weight,
                i.value,
                i.description,
                ci.quantity,
                ci.equipped,
                ci.slot
            FROM character_items ci
            JOIN items i ON ci.item_id = i.id
            WHERE ci.character_id = ?
        `, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });

    const getWeaponProficiencies = new Promise((resolve, reject) => {
        db.all('SELECT proficiency FROM character_weapon_proficiencies WHERE character_id = ?',
            [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => row.proficiency));
            });
    });

    const getToolProficiencies = new Promise((resolve, reject) => {
        db.all('SELECT proficiency FROM character_tool_proficiencies WHERE character_id = ?',
            [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => row.proficiency));
            });
    });

    const getLanguages = new Promise((resolve, reject) => {
        db.all('SELECT language FROM character_languages WHERE character_id = ?',
            [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => row.language));
            });
    });

    Promise.all([
        getCharacter, 
        getSavingThrows, 
        getSkills, 
        getItems,
        getWeaponProficiencies,
        getToolProficiencies,
        getLanguages
    ])
        .then(([
            character, 
            savingThrows, 
            skills, 
            items,
            weaponProficiencies,
            toolProficiencies,
            languages
        ]) => {
            const response = {
                ...snakeToCamel(character),
                maxHp: calculateMaxHp(character.base_max_hp, character.aid_level),
                savingThrowProficiencies: savingThrows.reduce((acc, curr) => ({
                    ...acc,
                    [curr.ability]: Boolean(curr.is_proficient)
                }), {}),
                skillProficiencies: skills.reduce((acc, curr) => ({
                    ...acc,
                    [snakeToCamel(curr.skill)]: Boolean(curr.is_proficient)
                }), {}),
                weaponProficiencies,
                toolProficiencies,
                languages,
                equipment: {
                    armor: snakeToCamel(items.find(i => i.slot === 'armor')),
                    mainHand: snakeToCamel(items.find(i => i.slot === 'main_hand')),
                    offHand: snakeToCamel(items.find(i => i.slot === 'off_hand')),
                    accessories: snakeToCamel(items.filter(i => i.slot === 'accessory'))
                },
                inventory: snakeToCamel(items.filter(i => i.slot === 'inventory'))
            };
            
            response.id = response.id.toString();
            
            res.json(response);
        })
        .catch(err => {
            if (err.message === 'Character not found') {
                res.status(404).json({ error: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        });
});

app.patch('/api/characters/:id/hp', (req, res) => {
    const id = req.params.id;
    const { currentHp, tempHp, aidLevel } = req.body;

    db.run(
        `UPDATE characters 
         SET current_hp = ?, temp_hp = ?, aid_level = ?
         WHERE id = ?`,
        [currentHp, tempHp, aidLevel, id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ currentHp, tempHp, aidLevel });
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
