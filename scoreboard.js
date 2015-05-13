var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1800Mission',
  database : 'test'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected');
});

app.get('/', function(req, res) {
  var output = [];
  var leaderboard = function() {
      connection.query('SELECT * from players ORDER BY score DESC LIMIT 10', function(err, rows, fields) {
        if (!err) {
          for(i = 0; i < rows.length; i++) {
            var player = (i+1) + ' ' + rows[i].name + ' ' +  rows[i].score + ' points' ;
            output.push(player);
          }
          res.send(output);
        } else {
          res.send(err);
        }});
    };
    leaderboard();
});
app.get('/update/:player/:points', function(req, res) {
  var updatePlayer = function() {
  var post  = [req.params.points, req.params.player];
    connection.query('UPDATE players SET score = ? WHERE name = ?', post, function(err, rows, fields) {
      if (!err) {
        res.send(req.params.player + ' now has ' + req.params.points + ' points!');
      } else {
        res.send(err);
      }
    });
  };
  updatePlayer();
});
app.get('/add/:player/:points', function(req, res) {
  var addPlayer = function() {
    var post  = {name: req.params.player, score: req.params.points};
    connection.query('INSERT INTO players SET ?', post, function(err, rows, fields) {
      if (!err) {
        res.send('Successfully added ' + post.name + ' with ' + post.score + ' points!');
      } else {
        res.send(err);
      }});
  };
  addPlayer();
});
app.listen(port);
console.log('Magic happens on port ' + port);
