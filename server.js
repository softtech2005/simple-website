const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');  // Import the database connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit_form', (req, res) => {
    const { fullname, dob, course, email, phonenumber} = req.body;

    // Insert form data into the SQLite database
    const query = `INSERT INTO users (fullname, dob, course) VALUES (?, ?, ?)`;
    db.run(query, [fullname, dob, course, email, phonenumber], function(err) {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(`Inserted row with ID: ${this.lastID}`);
            res.send('Form submitted successfully!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
