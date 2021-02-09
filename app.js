const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers() 
    .then((responseFromDB) => {
      res.render('beers/beers.hbs', { beers: responseFromDB });
    })
    .catch((error) => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then((ApiBeers) => {
      res.render('beers/random-beer.hbs', { beers: ApiBeers });
    })
    .catch((error) => console.log(error));
});

app.get('/beers/:beerId', (req, res) => {
  punkAPI
    .getBeer(req.params.beerId)
    .then((ApiBeers) => {
      res.render('beers/beer-details.hbs', { beers: ApiBeers });
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));