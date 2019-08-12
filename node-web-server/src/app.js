const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Paths
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/partials');

// Configurations
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Index',
    name: 'Alex'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Alex'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Alex'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.city) {
    return res.send({
      error: "Please specify city and country"
    })
  }

  const weatherData = geocode(req.query.city,
    (error, {
      latitude,
      longitude,
      location
    } = {}) => {

      if (error) {
        return res.send({
          error
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          })
        }

        res.send({
          forecastData
        });
      })
    }
  )

  return
  // res.send(weatherData);
})

app.get('*', (req, res) => {
  res.send('404');
})

app.listen(3000, () => {
  console.log('running')
});