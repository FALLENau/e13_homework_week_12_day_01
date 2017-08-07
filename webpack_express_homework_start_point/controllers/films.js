var express = require('express')
var filmsRouter = new express.Router()

var films = require('../client/src/models/films')();
var Film = require('../client/src/models/film');
var Review = require('../client/src/models/review');


filmsRouter.post('/', function(req, res){
  films.push(req.body.film)
  res.json({data: films})
})//create new film

filmsRouter.post('/:id/reviews/', function(req, res){
  var film = films[req.params.id]
  film.reviews.push(req.body.review)
  res.json({data: film})
})//add review

filmsRouter.put('/:id', function(req, res){
  films[req.params.id] = req.body.film
  res.json({data: films})
})//update film


filmsRouter.delete('/:id', function(req, res){
  films.splice(req.params.id, 1)
  res.json({data: films})
})//delete film by id

filmsRouter.get('/:id', function(req, res){
  res.json({data: films[req.params.id]})
})//get film by id

filmsRouter.get('/', function(req, res){
  res.json(films)
})//get all films


module.exports = filmsRouter
