# scoreboard

##Setup:
In the directory of the project run `npm install`

In scoreboard.js and test.js, update MySql username, password and database desired to reflect local dev environment
Run `node scoreboard.js` to start the application

##To populate starting test data:
`node test.js`

##To show scoreboard:
`http://localhost:8080/`

##To add new player:
`http://localhost:8080/update/:player/:score`

##To update players score:
`http://localhost:8080/add/:player/:score`
