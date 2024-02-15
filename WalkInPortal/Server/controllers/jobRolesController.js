const {connection} = require('../config/connectDB.js');

const getAllJobRoles = (req, res) => {
    let sql = `SELECT id, job_role_title FROM job_roles`;
    connection.query(sql, (err, results) => {
        if (err) console.log(err);
        
        res.send(results);
    });
}

module.exports = {
    getAllJobRoles
}