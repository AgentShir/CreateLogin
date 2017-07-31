const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express')
const session = require('express-session');

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function(req, res, next){
  res.render("index", {appType:"Express"})
})

var html = '<form action="/" method="post">' +
          '<input type="text" name="username" placeholder="Username" />' +
          '<input type="password" name="password" placeholder="Password" />' +
          '<button type="submit">Submit</button>' +
      '</form>';
res.send(html);
})

// var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
