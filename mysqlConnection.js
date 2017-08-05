var mysql = require('mysql');

var dbConfig = {
  host: 'yggdrasill.mysql.database.azure.com',
  user: 'geniusroots@yggdrasill',
  password: 'Yggdrasill170717',
  database: 'mydb',
  Port: 3306,
  ssl:{ca:fs.readFileSync({ca-cert filename})},
  debug: false,
  insecureAuth: true
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
