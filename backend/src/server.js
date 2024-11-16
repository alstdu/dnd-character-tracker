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

// Get all characters (simplified for list view)
app.get('/api/characters', (req, res) => {
    db.all('SELECT id, name, current_hp, max_hp FROM characters', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
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
            SELECT i.*, ci.quantity, ci.equipped, ci.slot
            FROM character_items ci
            JOIN items i ON ci.item_id = i.id
            WHERE ci.character_id = ?
        `, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });

    Promise.all([getCharacter, getSavingThrows, getSkills, getItems])
        .then(([character, savingThrows, skills, items]) => {
            // Format the response to match your interface
            const response = {
                ...character,
                savingThrowProficiencies: savingThrows.reduce((acc, curr) => ({
                    ...acc,
                    [curr.ability]: curr.is_proficient
                }), {}),
                skillProficiencies: skills.reduce((acc, curr) => ({
                    ...acc,
                    [curr.skill]: curr.is_proficient
                }), {}),
                equipment: {
                    armor: items.find(i => i.slot === 'armor'),
                    mainHand: items.find(i => i.slot === 'main_hand'),
                    offHand: items.find(i => i.slot === 'off_hand'),
                    accessories: items.filter(i => i.slot === 'accessory')
                },
                inventory: items.filter(i => i.slot === 'inventory')
            };
            
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
