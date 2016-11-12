var mysql = require('mysql');

var dbConfig = {
  host: 'abc.cdzqam9fqkpc.us-west-2.rds.amazonaws.com',
  user: 'abc',
  password: 'footstamp',
  database: 'abc',
  debug: true
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
