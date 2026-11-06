// import the express module
import express from 'express';

// create an instance of an express application
const app = express();

// define a port number for our server to listen on
const PORT = process.env.PORT || 3002;

// array to store all the form submissions
const contacts = [];

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
    res.render('confirmation', { contact });
});

// admin route that shows all the submissions
app.get('/admin', (req, res) => {
    res.render('admin', { contacts });
});

// start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});