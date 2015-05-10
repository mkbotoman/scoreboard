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


var leaderboard = function() {
  connection.query('SELECT * from players ORDER BY score DESC LIMIT 10', function(err, rows, fields) {
  connection.end();
    if (!err) {
      console.log('Leaderboard');
      for(i = 0; i < rows.length; i++) {
        console.log((i+1) + ' ' + rows[i].name + ' ' +  rows[i].score + ' points' );
      }
    } else {
      console.log('Error while performing Query.');
      console.log(err);
    }});
};

var addPlayer = function() {
  var post  = {name: args[1], score: args[2]};
  connection.query('INSERT INTO players SET ?', post, function(err, rows, fields) {
  connection.end();
    if (!err) {
      console.log('Successfully added ' + post.name + ' with ' + post.score + ' points!');
    } else {
      console.log('Error while performing Query.');
      console.log(err);
    }});
};

var updatePlayer = function() {
  var post  = [args[2], args[1]];
  connection.query('UPDATE players SET score = ? WHERE name = ?', post, function(err, rows, fields) {
  connection.end();
    if (!err) {
      console.log(args[1] + ' now has ' + args[2] + ' points!');
      
    } else {
      console.log('Error while performing Query.');
      console.log(err);
    }
  });
};

var args = process.argv.slice(2);

if(args[0] == "scoreboard"){
  leaderboard();
} else if (args[0] == "new"){
  addPlayer();
} else if (args[0] === "update"){
  updatePlayer();
} else {
  console.log("Please enter a request")
}
