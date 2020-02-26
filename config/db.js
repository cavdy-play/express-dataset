var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./config/dataset.db', function(err) {
  if (err) return console.error(err.message)

  console.log('Connected to dataset db');
})

db.run('CREATE TABLE IF NOT EXISTS events ( event_id INTEGER PRIMARY KEY UNIQUE, type VARCHAR NOT NULL, actor_id INTEGER UNIQUE, login VARCHAR NOT NULL, avatar_url VARCHAR NOT NULL, repo_id INTEGER UNIQUE, name VARCHAR NOT NULL, url VARCHAR NOT NULL, created_at VARCHAR NOT NULL)')

module.exports = db;
