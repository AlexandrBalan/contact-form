import express from 'express';

const app = express();

const PORT = process.env.PORT || 3002;

const contacts = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

app.post('/submit', (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        linkedin: req.body.linkedin,
        howMet: req.body.howMet,
        mailingList: req.body.mailingList === 'on',
        submittedAt: new Date().toLocaleString()
    };

    contacts.push(contact);
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req, res) => {
    res.send(`<h1>All Submissions</h1><pre>${JSON.stringify(contacts, null, 2)}</pre>`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});