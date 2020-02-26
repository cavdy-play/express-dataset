const db = require('./db')

var Queries = {
  findAll(select, sort, callback) {
    var sql = 'SELECT ' + select + ' FROM events ORDER BY ' + sort;
    db.all(sql, [], function(err, rows) {
      if (err) return console.error(err.message)
      
      return callback(rows)
    })
    // close connection
    db.close();
  }
}

module.exports = Queries;
