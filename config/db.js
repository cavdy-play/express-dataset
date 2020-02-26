var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./config/dataset.db', function(err) {
  if (err) return console.error(err.message)

  console.log('Connected to dataset db');
})

db.run('CREATE TABLE IF NOT EXIST actors ( id INTEGER PRIMARY KEY UNIQUE, login VARCHAR NOT NULL, avatar_url VARCHAR NOT NULL)')

module.exports = db;
