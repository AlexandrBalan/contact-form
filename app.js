import 'dotenv/config';
import mysql from 'mysql2/promise';
// import the express module
import express from 'express';

// create an instance of an express application
const app = express();

// define a port number for our server to listen on
const PORT = process.env.PORT || 3002;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

// tell express to use ejs
app.set('view engine', 'ejs');

// enable static file serving
app.use(express.static('public'));

// lets the server read the form data
app.use(express.urlencoded({ extended: true }));

// defining a default route ("/")
app.get('/', (req, res) => {
    res.render('resume');
});

// contact form page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// save the form data and show the confirmation page
app.post('/submit', async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        howMet: req.body.howMet,
        other: req.body.other,
        message: req.body.message,
        mailingList: req.body.mailingList === 'on',
        emailFormat: req.body.emailFormat,
        submittedAt: new Date().toLocaleString()
    };

    await pool.execute(
        `INSERT INTO contacts
        (first_name, last_name, job_title, company, linkedin, email, how_met, other, message, mailing_list, email_format)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            contact.firstName,
            contact.lastName,
            contact.jobTitle,
            contact.company,
            contact.linkedin,
            contact.email,
            contact.howMet,
            contact.other,
            contact.message,
            contact.mailingList,
            contact.emailFormat
        ]
    );

    res.render('confirmation', { contact });
});

// admin route that shows all the submissions
app.get('/admin', async (req, res) => {
    const [rows] = await pool.execute(
        `SELECT
            first_name AS firstName,
            last_name AS lastName,
            job_title AS jobTitle,
            company,
            linkedin,
            email,
            how_met AS howMet,
            other,
            message,
            mailing_list AS mailingList,
            email_format AS emailFormat,
            submitted_at AS submittedAt
        FROM contacts
        ORDER BY submitted_at DESC`
    );

    const contacts = rows.map(function (row) {
        return {
            ...row,
            mailingList: Boolean(row.mailingList),
            submittedAt: new Date(row.submittedAt).toLocaleString()
        };
    });

    res.render('admin', { contacts });
});

// start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});