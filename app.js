const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express')
const session = require('express-session');
const parseurl = require('parseurl')
const bodyParser = require('body-parser')
const validator = require('express-validator')

let username = "green"
let password = "riverdrink"

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))

app.use(validator())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    if(req.session.views){
        req.session.views += 1
    } else {
        req.session.views = 1
    }
    next()
})

app.get("/", function(req, res, next){
    if(req.session.isloggedIn === true){
      res.render("index", { username: username, views: req.session.views})
    } else{
      res.redirect("/login")
    }
})

app.get("/login", function(req, res, next){
    res.render("login")
})

app.post("/login", function(req, res, next){
    if(req.body.username === username && req.body.password === password){
      req.session.isloggedIn === true
        res.redirect("/")
    } else {
      res.redirect("/login")
    }
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
