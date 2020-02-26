const db = require('./db')

var Queries = {
  findAll(table, callback) {
    var sql = 'SELECT * FROM ' + table + ' ORDER BY name';
    db.all(sql, [], function(err, rows) {
      if (err) return console.error(err.message)
      
      return callback(rows)
    })
    // close connection
    db.close();
  }
}
