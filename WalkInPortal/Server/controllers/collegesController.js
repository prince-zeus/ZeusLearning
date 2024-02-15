const {connection} = require('../config/connectDB.js');

const getAllColleges = (req, res) => {
    let sql = `SELECT * FROM colleges`;
    connection.query(sql, (err, results) => {
        if (err) console.log(err);
        
        res.send(results);
    });
}

module.exports = {
    getAllColleges
}