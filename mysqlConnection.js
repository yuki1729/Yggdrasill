var mysql = require('mysql');

var dbConfig = {
  host: 'yggdrasill.mysql.database.azure.com',
  user: 'geniusroots@yggdrasill',
  password: 'Yggdrasill170717',
  database: 'mydb',
  debug: false
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
