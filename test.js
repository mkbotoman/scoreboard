var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.query('CREATE TABLE players (name VARCHAR(20) UNIQUE, score INT)', 
	function(err, result){
    if(err) {
        console.log(err);
    }
    else{
        console.log("score table created");
    }
});

var sql = "INSERT INTO players (name, score) VALUES ?";
var values = [
	['demian', 7],
    ['john', 14],
    ['mark', 11111],
    ['pete', 4],
    ['kate', 358],
    ['miley', 99],
    ['persie', 0],
    ['molly', 77],
    ['julia', 1590],
    ['salmon', 1776],
    ['bro', 9999],
    ['albi', 12],
    ['wayne', 16],
    ['snoop', 11],
    ['jesse', 9],
    ['todd', 124563]
];
connection.query(sql, [values], function(err) {
    if (err) throw err;
    connection.end();
});