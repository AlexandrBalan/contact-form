// import the express module
import express from 'express';

// create an instance of an express application
const app = express();

// define a port number for our server to listen on
const PORT = process.env.PORT || 3002;

// array to store all the form submissions
const contacts = [];

// enable static file serving
app.use(express.static('public'));

// lets the server read the form data
app.use(express.urlencoded({ extended: true }));

// defining a default route ("/")
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

// save the form data and show the confirmation page
app.post('/submit', (req, res) => {
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

    contacts.push(contact);
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// admin route that shows all the submissions
app.get('/admin', (req, res) => {
    res.send(`<h1>All Submissions</h1><pre>${JSON.stringify(contacts, null, 2)}</pre>`);
});

// start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});