var mysql = require('mysql');

var dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mydb'
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
