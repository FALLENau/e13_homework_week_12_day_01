#####e13 homework week 12 day 1
# Express + Webpack Homework

Server API Tasks

Create an api for the films app using an /api/films restful route pattern and Express Router Index route to show all films Get film by id (id is just an array index fo rnow, until we hook up a database)
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

### Adding your dynamic public folder

Now that your server is dynamic we will need to add some features so it can keep up with the changes.
<br>
First create a 'index.html' file in your project folder and add this code to it
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <title>my express</title>
  </head>
  <body>
    <h1>woah dude</h1>
  </body>
</tml>
```
It's important to notice that (link rel="stylesheet" href="style.css") in the (head) tag is required to call the "style.css" file we will make shortly.

<br>
next step is to create a 'public' folder within your project folder. It must be called 'public' other wise Express won't understand it.
<br>

Then change your server.js code to take into count the changes we have made, this is what it will look like

```js
var express = require('express')
var app = express()

// app.get('/', function(req, res){
//   res.json({data: 'Sup!'})
// })//remove this block from your file

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000, function(){
  console.log('App running on port: ' + this.address().port)
})

//add this
app.use(express.static('public'))//here is where we see the *magic*!
```
now create a 'style.css' within the public folder. open us you css file and add this code
```css
body {
  background-color: #333;
  color: orange;
}
```
go back to your webpage and refresh and see the magic!

your page will change to the css input, but wait thats not all!

if you change any parts of your included html, css, js and other files within your project, your server will pickup any changes and add them for you, and all you need to do is refresh your page.

#### Part One of learning objectives done!
---
## Understanding RESTful Objects

Ok unzip the "express_restful_start_cats.zip" file as your startpoint.


### Startpoint
Make sure you do these in order(see [7 RESTful ROUTS](http://restfulrouting.com/#introduction) for details)

Make an array for testing
```js
var cats = ["Billy Tiger", "British Shorthair", "Siamese"]
```
[Billy Tiger](https://www.instagram.com/p/BNSD8svg-ug/) is my cat :)

then make your first requestful route, which looks like this!

```js
catRouter.post('/cats', function(req, res){
  cats.push(req.body.cat)
  res.json({data: cats})
})
```
This will allow you to create a cat and push him onto the 'cats' array
<br>

```js
catRouter.put('/cats/:id', function(req, res){
  cats[req.params.id] = req.body.cat
  res.json({date: cats})
})
```
This will allow you to update a cat by id
<br>


```js
catRouter.delete('/cats/:id', function(req, res){
  cats.splice(req.params.id, 1)
  res.json({date: cats})
})
```
This will allow you to delete a cat by id on the cats array
<br>


```js
catRouter.get('/cats/:id', function(req, res){
  res.json({data: cats[req.params.id]})
})
```
This will allow you to get a cat by id on the cats array
<br>

```js
catRouter.get('/cats', function(req, res){
  res.json(cats)
})
```
This will allow you to get all the cats on the cats array
<br>

## Make controllers for your Routes
Start by making a foulder in your project folder called 'controllers', then touch 3 files into it called "cats.js", "dogs.js" and "index.js".

first things first, collect the data related to cats in the server.js file and put

```js

```
blah blah

```js

```
blah blah

```js

```
blah blah

```js

```
blah blah

```js

```

## Web bundles!
To get started we need to open the bundle.zip then cd into 'bundled'

install npm webpack
```sh
npm i --save-dev webpack
```



add webpack install updates to package.json file by adding
```json
, "bundle": "webpack -w"
```
just under(don't forget the ',')
```json
"scripts": {
  "start": "node server.js"
  |--!put code here--|
}
```
so it will look like this
```json
{
  "name": "review_site",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "bundle": "webpack -w"
  }
}
```
make webpack.config.js file in bundle folder
<br>
webpack.config file
```js
var config = {
  entry: __dirname + '/client/src/app.js',
  output: {
      filename: 'bundle.js',
      path: __dirname + '/client/build'
  }
}

module.exports = config
```
bundle file with webpack
```sh
npm run bundle
```
and load your localhost:3000!
<br>

## Deployment



```js

```

Add additional notes about how to deploy this on a live system

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
