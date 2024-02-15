const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});


// connection.end((err) => {
//   if (err) {
//     console.error('Error disconnecting from MySQL:', err);
//     return;
//   }
//   console.log('Disconnected from MySQL');
// });


module.exports = { connection }