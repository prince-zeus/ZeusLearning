const {connection} = require('../config/connectDB.js');

const getAllTechnologies = (req, res) => {
    let sql = `SELECT * FROM technology`;
    connection.query(sql, (err, results) => {
        if (err) console.log(err);
        
        res.send(results);
    });
}

module.exports = {
    getAllTechnologies
}