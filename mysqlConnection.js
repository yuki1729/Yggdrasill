var mysql = require('mysql');

var dbConfig = {
  host: 'mydb.cdzqam9fqkpc.us-west-2.rds.amazonaws.com',
  user: 'root',
  password: 'password08',
  database: 'mydb',
  debug: false
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
