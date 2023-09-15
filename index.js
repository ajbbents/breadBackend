const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

// set up db
let dailyBakes = [
  {
    name: 'Two Day Sourdough',
    bakeNumber: 1,
    leavener: 'levian'
  },
  {
    name: 'Saturday White Bread',
    bakeNumber: 2,
    leavener: 'instant yeast'
  },
  {
    name: 'Sourdough Crackers',
    bakeNumber: 3,
    leavener: 'levian'
  },
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to Track that Bake');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/bakes', (req, res) => {
  res.json(dailyBakes);
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Well crap, that did not work.');
});

// listen for requests
app.listen(8080, () => {
  console.log('app is listening on port 8080');
});
