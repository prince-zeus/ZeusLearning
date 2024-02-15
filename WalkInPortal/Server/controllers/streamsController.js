const {connection} = require('../config/connectDB.js');

const getAllStreams = (req, res) => {
    let sql = `SELECT * FROM streams`;
    connection.query(sql, (err, results) => {
        if (err) console.log(err);
        
        res.send(results);
    });
}

module.exports = {
    getAllStreams
}