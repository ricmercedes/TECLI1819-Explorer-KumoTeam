const ACME_EXPLORER_APP_DIR = '/dist/ACME-Explorer';

var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path');

var app = express();
var port = (process.env.PORT || 3500);
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, ACME_EXPLORER_APP_DIR + '/assets/json-files/acme-explorer.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, ACME_EXPLORER_APP_DIR)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, ACME_EXPLORER_APP_DIR, '/index.html'));
    console.log(path.join(__dirname, ACME_EXPLORER_APP_DIR, '/index.html'));
    console.log(Date() + " - GET /");
    res.sendStatus(200);
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, ACME_EXPLORER_APP_DIR, '/index.html'));
    console.log(path.join(__dirname, ACME_EXPLORER_APP_DIR, '/index.html'));
    console.log(Date() + " - GET /register");
    res.sendStatus(200);
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, ACME_EXPLORER_APP_DIR, '/index.html'));
    console.log(path.join(__dirname, ACME_EXPLORER_APP_DIR, '/index.html'));
    console.log(Date() + " - GET /login");
    res.sendStatus(200);
});

app.get("/logout", (req, res) => {
    res.sendFile(path.join(__dirname, ACME_EXPLORER_APP_DIR, '/index.html'));
    console.log(path.join(__dirname, ACME_EXPLORER_APP_DIR, '/index.html'));
    console.log(Date() + " - GET /logout");
    res.sendStatus(200);
});


console.log("Starting API server...");

app.listen(port);

console.log("Server ready on port " + port + " !!");

