const {connection} = require('../config/connectDB.js');

const getAllQualifications = (req, res) => {
    let sql = `SELECT * FROM qualifications`;
    connection.query(sql, (err, results) => {
        if (err) console.log(err);
        
        res.send(results);
    });
}

module.exports = {
    getAllQualifications
}