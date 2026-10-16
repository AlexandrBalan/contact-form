// import the express module
import express from 'express';

// create an instance of an express application
const app = express();

// define a port number for our server to listen on
const PORT = 3002;

// enable static file serving
app.use(express.static('public'));

// defining a default route ("/")
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

// start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});