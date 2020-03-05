const db = require('./db')

var Queries = {
  // Select from db
  findAll(select, sort, type, callback) {
    var sql = 'SELECT '
    sql += select
    sql += ' FROM events ORDER BY '
    sql += sort
    sql += ' '
    sql += type

    db.all(sql, [], function(err, rows) {
      if (err) return callback(err)
      return callback(err, rows)
    })
  },

  // Select specific from db
  find(select, where, value, callback) {
    var sql = 'SELECT '
    sql += select
    sql += ' FROM events WHERE '
    sql += where
    sql += '='
    sql += value

    db.all(sql, [], function(err, rows) {
      if (err) return callback(err)
      return callback(err, rows)
    })
  },

  // Insert into db
  insert(columns, values, callback) {
    var placeholders = values.map(() => '?').join(',');
    var sql = 'INSERT INTO events(' ;
    sql += columns
    sql += ') VALUES('
    sql += placeholders
    sql += ')'
    
    db.run(sql, values, function(err) {
      if (err) return callback(err)
      return callback(err, 'Events created')
    })
  },

  // update from db
  update(value, condVal, callback) {
    var sql = 'UPDATE events SET avatar_url=(?) WHERE actor_id='
    sql += condVal;

    db.run(sql, [value], function(err) {
      if (err) return callback(err)
      return callback(err, 'Updated')
    })
  },

  // delete from db
  remove(table, callback) {
    var sql = 'DELETE FROM '
    sql += table

    db.run(sql, [], function(err) {
      if (err) return callback(err)
      return callback(err, 'Events created')
    })
  }
}

module.exports = Queries;
