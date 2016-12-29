var mysql = require('mysql');

var dbConfig = {
  host: 'yggdrasill.database.windows.net',
  user: 'geniusroots',
  password: 's58910Gr',
  database: 'mydb',
  debug: true
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
