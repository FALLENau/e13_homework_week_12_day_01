# Express + Webpack Homework
#### e13 homework week 12 day 1

Server API Tasks

Create an api for the films app using an /api/films restful route pattern and Express Router Index route to show all films Get film by id (id is just an array index for now, until we hook up a database)
1. Create film
2. Update film
3. Delete film

Don't forget to get your app to use the controllers/index.js!

Use Insomnia to test your CREATE, UPDATE and DELETE routes

If you are feeling brave, add a new review to a film.

REMEMBER to use nodemon server.js so that you're changes are picked up

Webpack Front End Tasks

Add a genre to a film and render it in the UI on the home page
Remember to run webpack -w using an npm script


### Prerequisites

What things you need to install the software and how to install them

1. npm + nodejs
2. text editor
3. JSON Formatter (install on your browser)
4. npm body-parser
5. Insomnia REST Client

#### Tips for terminal
in your terminal you can use the alias 'i' for install on npm and other program frameworks like so
```sh
npm i --save express
```
#### Tips of debugging

```js
function = function(event) {
  console.log(event)
}
```
also works in RESTful requests with body-parser(npm)
```js
filmsRouter.post('/', function(req, res){
  console.log(req.body)
  films.push(req.body.film)
  res.json({data: films})
})
```
<br>
Remember if stuff double check your webpack and server terminal, while there running you will get feedback
```sh
throw er; // Unhandled 'error' event
      ^
Error: listen EADDRINUSE 'error' event
    at errnoExecption (net.js:901:11)
```
ect

## Getting Started Part1

Open startpoint.zip then cd into webpack_express_homework_start_point and open your ['package.json'](./webpack_express_homework_start_point/package.json) and read through(hint: write down the dependencies on a page to reference).

Once your ready open your terminal and then install the package.json dependencies with
```sh
npm i
```
<br>
once done you'll need to add [Nodemon](https://www.npmjs.com/package/nodemon) to your computer.

## Nodemon install
```sh
npm i nodemon -g
```
-g refers to installing the dependencies in your golbal file network so it can be used anywhere.
<br>
#### Start server
Once nodemon is installed you can start it by
```sh
nodemon server.js
```
Nodemon will now update your page dynamically(i.e it will pickup any saves within your file system that is being used)


Your should get the msg
```sh
App running on port: 3000
```
And tada! go to your url:

[localhost 3000](http://localhost:3000)

and see your code world!

##Setting up your routes
Firstly open to ['server.js'](./webpack_express_homework_start_point/server.js) and add the code at line '9'

```js
app.use(express.static('client/build'))
//line 9 put new code here
```
<br>
add the second line
```js
app.use(express.static('client/build'))
app.use(require('./controllers/index.js'))
```
and thats all thats needed for 'server.js' file

Next you need to open ['index.js'](day_01_hw/webpack_express_homework_start_point/controllers/index.js) and fill in the whole file.

Start with requiring the server 'express' provided by npm install, we did this at the start of the lesion it used the [package.json](./webpack_express_homework_start_point/package.json) to install what we needed express.
```js
var express = require('express')
```
now create a var Router to interact with express
```js
var router = new express.Router()
```
this will manage our backend
<br>

now use the router var to require the films.js file (which we will be making our RESTful routes within).
```js

router.use('/films', require('./films.js'))
```

```js
router.get('/', function(req, res){
  res.json({data: 'Welcome'})
})
```

```js
router.get('/about', function(req, res){
  res.json({data: 'All about us'})
})
```

```js
module.exports = router

```

### Adding your RESTful Routes
Now open ['films.js'](./webpack_express_homework_start_point/controllers/films.js) and add you RESTful routes

```js
var express = require('express')
var filmsRouter = new express.Router()

var films = require('../client/src/models/films')();
var Film = require('../client/src/models/film');
var Review = require('../client/src/models/review');
```

```js
filmsRouter.post('/', function(req, res){
  films.push(req.body.film)
  res.json({data: films})
})//create new film
```

```js
filmsRouter.post('/:id/reviews/', function(req, res){
  var film = films[req.params.id]
  film.reviews.push(req.body.review)
  res.json({data: film})
})//add review
```

```js
filmsRouter.put('/:id', function(req, res){
  films[req.params.id] = req.body.film
  res.json({data: films})
})//update film
```

```js
filmsRouter.delete('/:id', function(req, res){
  films.splice(req.params.id, 1)
  res.json({data: films})
})//delete film by id
```

```js
filmsRouter.get('/:id', function(req, res){
  res.json({data: films[req.params.id]})
})//get film by id
```

```js
filmsRouter.get('/', function(req, res){
  res.json(films)
})//get all films
```

```js
module.exports = filmsRouter
```
close your server down with ^c in terminal (" ^ " refers the the control key on mac) once server is stopped do the next step in terminal
<br>

## Built With

* [atom](https://atom.io/) - the lightweight text editor
* [npm](https://www.npmjs.com/) - package manager for JavaScript
* [Json Formatter](https://github.com/callumlocke/json-formatter) - a great little formatting extension for browsers
* [Insomnia](https://insomnia.rest/) - a platform to test your RESTful routes with

## Authors

* **Reece Jones**  - [lost-in-Code](https://github.com/lost-in-Code-au)

See also the list of [contributors](https://github.com/lost-in-Code-au/JS_sever_prac/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to guys who maintain JavaScript and for allowing there code to be Opensauce
* Thanks to the instructors at Codeclan for your instruction
* Inspiration: Billy my cat making me work hate to bring home the cat food
* and my wife for just being her
