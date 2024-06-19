const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database. If the database file does not exist, it will be created.
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');
        // Create a table if it does not exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT NOT NULL,
            dob TEXT NOT NULL,
            course TEXT NOT NULL,
            email TEXT NOT NULL,
            phonenumber INTEGER NOT NULL
        )`);
    }
});

module.exports = db;
