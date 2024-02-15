const {connection} = require('../config/connectDB.js')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

const handleAppliedJob = async (req, res) => {
    const {resume_link, time_slots_id, selected_job_roles, users_id} = req.body;
    let user_applied_job_details = {
        resume_link, 
        time_slots_id,
        users_id
    };
    const tableName = 'user_applied_job_details';
                      
    const columns = Object.keys(user_applied_job_details).join(', ');
    const values = Object.values(user_applied_job_details).map((value) => (typeof value === 'string' ? `'${value}'` : value)).join(', ');
    
    let insertAppliedJobQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    console.log(insertAppliedJobQuery);

    connection.query(insertAppliedJobQuery, async (err, results) => {
        if(err) return res.sendStatus(500);
        console.log(results);
        const {insertId} = results;
        return res.status(201).json({insertId});  
    });
}

const getAppliedJob = async (req, res) => {
    const {id} = req.params;
    const {userID} = req.body;
     const sql = `SELECT
        uajd.users_id,
        ts.time,
        jc.dateandtime
    FROM
        WalkInPortal.user_applied_job_details uajd
    JOIN
        WalkInPortal.time_slots ts ON uajd.time_slots_id = ts.id
    JOIN
        WalkInPortal.job_card jc ON ts.job_card_id = jc.id
    WHERE
        uajd.id = ${id};`

    // Execute your main query with parameters
    connection.query(sql, (err, results) => {
        if (err) console.log(err);
        if(results[0].users_id === userID) {
            res.send(results[0]);
        }
        else {
            res.sendStatus(401);
        }
    });
}



module.exports = { handleAppliedJob, getAppliedJob };