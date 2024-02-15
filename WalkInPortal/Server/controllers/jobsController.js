const {connection} = require('../config/connectDB.js');

const getAllJobs = (req, res) => {
    // let sql = `SELECT
    //     job_card.*,
    //     GROUP_CONCAT(DISTINCT job_roles.id ORDER BY job_roles.id ASC) AS job_roles,
    //     GROUP_CONCAT(DISTINCT time_slots.time ORDER BY time_slots.time ASC) AS time_slots,
    //     GROUP_CONCAT(DISTINCT job_tags.tag ORDER BY job_tags.tag ASC) AS tags
    // FROM
    //     WalkInPortal.job_card
    // LEFT JOIN
    //     WalkInPortal.job_card_job_roles_preference ON job_card.id = job_card_job_roles_preference.job_card_id
    // LEFT JOIN
    //     WalkInPortal.job_roles ON job_card_job_roles_preference.job_roles_id = job_roles.id
    // LEFT JOIN
    //     WalkInPortal.time_slots ON job_card.id = time_slots.job_card_id
    // LEFT JOIN
    //     WalkInPortal.job_tags ON job_card.id = job_tags.job_card_id
    // GROUP BY
    //     job_card.id;`;


    // Set the session variable for the existing connection
    connection.query('SET SESSION group_concat_max_len = 1000000', (setSessionErr) => {
        if (setSessionErr) {
            console.error('Error setting session variable:', setSessionErr);
            connection.end(); // Close the connection if there's an error
            return;
        }
    
        // Your main query
        const sql = `SELECT
            job_card.*,
            CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('id', job_roles.id, 'job_role_icon', job_roles.job_role_icon, 'job_role_title', job_roles.job_role_title, 'gross_compensation_package', job_roles.gross_compensation_package, 'role_description', job_roles.role_description, 'requirements', job_roles.requirements) ORDER BY job_roles.id ASC SEPARATOR ','), ']') AS job_roles,
            CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('id', time_slots.id, 'time', time_slots.time) ORDER BY time_slots.id ASC SEPARATOR ','), ']') AS time_slots,
            GROUP_CONCAT(DISTINCT job_tags.tag ORDER BY job_tags.tag ASC) AS tags
        FROM
            WalkInPortal.job_card
        LEFT JOIN
            WalkInPortal.job_card_job_roles_preference ON job_card.id = job_card_job_roles_preference.job_card_id
        LEFT JOIN
            WalkInPortal.job_roles ON job_card_job_roles_preference.job_roles_id = job_roles.id
        LEFT JOIN
            WalkInPortal.time_slots ON job_card.id = time_slots.job_card_id
        LEFT JOIN
            WalkInPortal.job_tags ON job_card.id = job_tags.job_card_id
        GROUP BY
            job_card.id;`;
    
        // Execute your main query with parameters
        connection.query(sql, (err, results) => {
            if (err) console.log(err);
            const allJobs = results.map(result => {
                return {
                    ...result,
                    job_roles: result.job_roles == null ? [] : JSON.parse(result.job_roles),
                    time_slots: result.time_slots == null ? [] : JSON.parse(result.time_slots),
                    tags: result.tags == null ? [] : result.tags.split(',')
                }
            });
            res.send(allJobs);
        });
    });
}

const getJob = (req, res) => {
    const {id} = req.params;
    // Set the session variable for the existing connection
    connection.query('SET SESSION group_concat_max_len = 1000000', (setSessionErr) => {
        if (setSessionErr) {
            console.error('Error setting session variable:', setSessionErr);
            connection.end(); // Close the connection if there's an error
            return;
        }
    
        // Your main query
        const sql = `SELECT
            job_card.*,
            CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('id', job_roles.id, 'job_role_icon', job_roles.job_role_icon, 'job_role_title', job_roles.job_role_title, 'gross_compensation_package', job_roles.gross_compensation_package, 'role_description', job_roles.role_description, 'requirements', job_roles.requirements) ORDER BY job_roles.id ASC SEPARATOR ','), ']') AS job_roles,
            CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('id', time_slots.id, 'time', time_slots.time) ORDER BY time_slots.id ASC SEPARATOR ','), ']') AS time_slots,
            GROUP_CONCAT(DISTINCT job_tags.tag ORDER BY job_tags.tag ASC) AS tags
        FROM
            WalkInPortal.job_card
        LEFT JOIN
            WalkInPortal.job_card_job_roles_preference ON job_card.id = job_card_job_roles_preference.job_card_id
        LEFT JOIN
            WalkInPortal.job_roles ON job_card_job_roles_preference.job_roles_id = job_roles.id
        LEFT JOIN
            WalkInPortal.time_slots ON job_card.id = time_slots.job_card_id
        LEFT JOIN
            WalkInPortal.job_tags ON job_card.id = job_tags.job_card_id
        WHERE
            job_card.id = ${id}
        GROUP BY
            job_card.id;`;
    
        // Execute your main query with parameters
        connection.query(sql, (err, results) => {
            if (err) console.log(err);
            const job = results.map(result => {
                return {
                    ...result,
                    job_roles: result.job_roles == null ? [] : JSON.parse(result.job_roles),
                    time_slots: result.time_slots == null ? [] : JSON.parse(result.time_slots),
                    tags: result.tags == null ? [] : result.tags.split(',')
                }
            });
            res.send(job);
        });
    });
}


module.exports = {
    getAllJobs,
    getJob
}