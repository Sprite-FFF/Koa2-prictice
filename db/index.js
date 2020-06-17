const mysql = require('mysql')

const CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  port: '3306',
  multipleStatements: true//允许多条sql同时执行
}

const pool = mysql.createPool(CONFIG)
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((_error, connection) => {
      if(_error) {
        return reject(_error)
      }
      const q = connection.query(sql, values, (_error, rows) => {
        _error ? reject(_error) : resolve(rows)
        connection.release()       
      })
      console.log('sql', q.sql)
    })
  })
}

module.exports = {
  query
}