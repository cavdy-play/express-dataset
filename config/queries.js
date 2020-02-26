const db = require('./db')

var Queries = {
  // Select from db
  findAll(select, sort, callback) {
    var sql = 'SELECT ' + select + ' FROM events ORDER BY ' + sort;
    db.all(sql, [], function(err, rows) {
      if (err) return callback(err)
      return callback(err, rows)
    })
  },

  // Select specific from db
  find(select, where, value, callback) {
    var sql = 'SELECT ' + select + ' FROM events WHERE ' + where + '=' + value;
    db.all(sql, [], function(err, rows) {
      if (err) return callback(err)
      return callback(err, rows)
    })
  },

  // Insert into db
  insert(columns, values, callback) {
    var placeholders = values.map(() => '?').join(',');
    var sql = 'INSERT INTO events(' + columns + ') VALUES(' + placeholders + ')' ;
    db.run(sql, values, function(err) {
      if (err) return callback(err)
      return callback(err, 'Events created')
    })
  },

  // delete from db
  remove(table, callback) {
    var sql = 'DELETE FROM ' + table ;
    db.run(sql, [], function(err) {
      if (err) return callback(err)
      return callback(err, 'Events created')
    })
  }
}

module.exports = Queries;
