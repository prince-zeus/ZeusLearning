const bcrypt = require('bcrypt');
const {connection} = require('../config/connectDB.js')

const handleNewUser = async (req, res) => {
    let {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        profile_image,
        resume,
        portfolio_url,
        preferred_job_roles,
        reffered_name,
        is_email_notification,
        aggreagate_percentage,
        year_of_passing,
        qualifications_id,
        streams_id,
        colleges_id,
        other_college_name,
        college_location,
        year_of_experience,
        current_ctc,
        expected_ctc,
        experience_technologies,
        other_experience_technologies,
        familiar_technologies,
        other_familiar_technologies,
        on_notice_period,
        notice_period_end_date,
        notice_period_duration,
        test_appearence,
        test_appearence_role,
        applicantType
    } = req.body;

    let registrationTwoTableData = {
        preferred_job_roles,
        experience_technologies,
        familiar_technologies,
        applicantType
    }

    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    let sql = `SELECT id, password FROM users WHERE email = "${email}"`;
    try {

        connection.query(sql, async (err1, results1) => {
            if(err1) res.sendStatus(500);
            if(results1.length == 0) {
                const hashedPwd = await bcrypt.hash(password, 10);
                let users = {
                    first_name,
                    last_name,
                    email,
                    password: hashedPwd,
                    phone_number,
                    profile_image,
                    resume,
                    portfolio_url,
                    reffered_name,
                    is_email_notification
                };

                const tableName = 'users';
                const columns = Object.keys(users).join(', ');
                const values = Object.values(users).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
                const insertUserQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
                connection.execute(insertUserQuery, async (err2, results2) => {
                    if(err2) return res.sendStatus(500);
                    const {insertId} = results2;

                    let registrationTableData =
                    {
                        educational_qualifications: {
                            aggreagate_percentage,
                            year_of_passing,
                            qualifications_id,
                            streams_id,
                            colleges_id,
                            other_college_name,
                            college_location,
                            users_id: insertId,
                        },
                    };
                    if(applicantType === "experienced") {
                        registrationTableData.experienced_professional_qualifications = {
                            year_of_experience,
                            current_ctc,
                            expected_ctc,
                            other_experience_technologies,
                            other_familiar_technologies,
                            on_notice_period,
                            notice_period_end_date,
                            notice_period_duration,
                            test_appearence,
                            test_appearence_role,
                            users_id: insertId
                        }
                    }
                    else {
                        registrationTableData.fresher_professional_qualifications = {
                            other_familiar_technologies,
                            test_appearence,
                            test_appearence_role,
                            users_id: insertId
                        }
                    }

                    const insertQueries = Object.keys(registrationTableData).map(tableName => {
                        const table = registrationTableData[tableName];
                      
                        const columns = Object.keys(table).join(', ');
                        const values = Object.values(table).map((value) => (typeof value === 'string' ? `'${value}'` : value)).join(', ');
                      
                        return `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
                    });
    
                    // Use Promise.all to execute all queries concurrently
                    await Promise.all(
                        insertQueries.map(async (query) => {
                            await connection.execute(query, async (err3, result3) => {
                                if(err3) return res.sendStatus(500);
                                console.log(`Query executed successfully. Rows affected:`);
                            });
                        })
                    );
                    return res.status(201).json({ 'success': `New user ${email} created!` });    
                })
            }
            else {
                return res.sendStatus(401); //Unauthorized 
            }
        });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };