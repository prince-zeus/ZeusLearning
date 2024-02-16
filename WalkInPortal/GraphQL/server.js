import dotenv from 'dotenv';
import { connection } from './config/connectDB.js';
import {typeDefs} from './model/schema.js';
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import { getQueryResult, getQueryResultWithParams } from './config/queryResult.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const PORT = process.env.PORT || 7555;

dotenv.config();
// Connect to MySQL
connection.connect(async (err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    
    const { url } = await startStandaloneServer(server, {
        listen: {port: PORT},
    });
    console.log(`GraphQL Server running on port ${PORT}`);
});
  
  const resolvers = {
    Query: {
      async users() {
        const users = await getQueryResult(`SELECT * FROM users`);
        return users;
      },
      async user(_, args) {
        const user = await getQueryResult(`SELECT * FROM users WHERE id = ${args.id}`);
        return user[0];
      },
      async jobs() {
        const jobs = await getQueryResult(`SELECT * FROM job_card`);
        return jobs;
      },
      async job(_, args) {
        const job = await getQueryResult(`SELECT * FROM job_card WHERE id = ${args.id}`);
        return job[0];
      },
      async appliedJobs() {
        const appliedJobs = await getQueryResult(`SELECT * FROM user_applied_job_details`);
        return appliedJobs;
      },
      async appliedJob(_, args) {
        const appliedJob = await getQueryResult(`SELECT * FROM user_applied_job_details WHERE id = ${args.id}`);
        return appliedJob[0];
      },
      async jobRoles() {
        const jobRoles = await getQueryResult(`SELECT * FROM job_roles`);
        return jobRoles;
      },
      async qualifications() {
        const qualifications = await getQueryResult(`SELECT * FROM qualifications`);
        return qualifications;
      },
      async colleges() {
        const colleges = await getQueryResult(`SELECT * FROM colleges`);
        return colleges;
      },
      async streams() {
        const streams = await getQueryResult(`SELECT * FROM streams`);
        return streams;
      },
      async technology() {
        const technology = await getQueryResult(`SELECT * FROM technology`);
        return technology;
      },
      async tags() {
        const tags = await getQueryResult(`SELECT * FROM job_tags`);
        return tags;
      }
    },
    Users: {
      async preferred_job_roles(parent) {
        const result = await getQueryResult(`SELECT * FROM job_roles WHERE id IN (SELECT job_roles_id FROM user_job_roles_preference WHERE users_id = ${parent.id})`);
        return result;
      },
      async educational_qualifications(parent) {
        const result = await getQueryResult(`SELECT * FROM educational_qualifications WHERE users_id = ${parent.id}`);
        return result[0];
      },
      async fresher_professional_qualifications(parent) {
        const result = await getQueryResult(`SELECT * FROM fresher_professional_qualifications WHERE users_id = ${parent.id}`);
        return result[0];
      },
      async experienced_professional_qualifications(parent) {
        const result = await getQueryResult(`SELECT * FROM experienced_professional_qualifications WHERE users_id = ${parent.id}`);
        console.log(result);
        return result[0];
      },
      async user_applied_job_details(parent) {
        const result = await getQueryResult(`SELECT * FROM user_applied_job_details WHERE users_id = ${parent.id}`);
        return result;
      }
    },
    EducationalQualifications: {
      async qualifications(parent) {
        const result = await getQueryResult(`SELECT * FROM qualifications WHERE id = ${parent.qualifications_id}`);
        return result[0];
      },
      async streams(parent) {
        const result = await getQueryResult(`SELECT * FROM streams WHERE id = ${parent.streams_id}`);
        return result[0];
      },
      async colleges(parent) {
        const result = await getQueryResult(`SELECT * FROM colleges WHERE id = ${parent.colleges_id}`);
        return result[0];
      }
    },
    FresherProfessionalQualifications: {
      async familiar_technologies(parent) {
        const result = await getQueryResult(`SELECT * FROM technology WHERE id IN (SELECT technology_id FROM familiar_technologies WHERE users_id = ${parent.users_id})`);
        return result;
      }
    },
    ExperiencedProfessionalQualifications: {
      async familiar_technologies(parent) {
        const result = await getQueryResult(`SELECT * FROM technology WHERE id IN (SELECT technology_id FROM familiar_technologies WHERE users_id = ${parent.users_id})`);
        return result;
      },
      async experience_technologies(parent) {
        const result = await getQueryResult(`SELECT * FROM technology WHERE id IN (SELECT technology_id FROM experience_technologies WHERE users_id = ${parent.users_id})`);
        return result;
      }
    },
    UserAppliedJobDetails: {
      async time_slots(parent) {
        const result = await getQueryResult(`SELECT * FROM time_slots WHERE id = ${parent.time_slots_id}`);
        return result[0];
      },
      async user_applied_job_roles_preference(parent) {
        const result = await getQueryResult(`SELECT * FROM job_roles WHERE id IN (SELECT job_roles_id FROM user_applied_job_roles_preference WHERE user_applied_job_details_id = ${parent.id})`);
        return result;
      }
    },
    JobCard: {
      async job_card_job_roles_preference(parent) {
        const result = await getQueryResult(`SELECT * FROM job_roles WHERE id IN (SELECT job_roles_id FROM job_card_job_roles_preference WHERE job_card_id = ${parent.id})`);
        return result;
      },
      async time_slots(parent) {
        const result = await getQueryResult(`SELECT * FROM time_slots WHERE job_card_id = ${parent.id}`);
        return result;
      },
      async tags(parent) {
        const result = await getQueryResult(`SELECT * FROM job_tags WHERE job_card_id = ${parent.id}`);
        return result;
      }
    },
    Mutation: {
      async login(_, args) {
        try {
          const {
            email, 
            pwd
          } = args.loginFormData;

          const res = await getQueryResult(`SELECT id, password FROM users WHERE email = "${email}"`);
          if(res.length != 1) throw new Error("UnAuthorized");
          const {id, password} = res[0];
          const match = await bcrypt.compare(pwd, password);
            if (match) {
              const roles = [];
              // Create JWTs
              const accessToken = jwt.sign(
                  {
                      "UserInfo": {
                          "userID": id,
                          "roles": roles
                      }
                  },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: '1h' }
              );
              return { userID: id, accessToken, roles };
            } else {
              throw new Error("UnAuthorized");
            }
        } catch ({message}) {
          throw new Error("Login Error: " + message);
        }
      },
      async register(_, args) {
        try {
          return await new Promise((resolve, reject) => {
            connection.beginTransaction(async (err) => {
              if(err) {
                reject(err);
                return;
              }

              try {
                const {
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
                } = args.registrationFormData;

                // Insert First Table Data and Get User Id to use further
                const hashedPwd = await bcrypt.hash(password, 10);
                const response = await getQueryResultWithParams(`INSERT INTO users (first_name, last_name, email, password, phone_number, profile_image, resume, portfolio_url, reffered_name, is_email_notification) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [first_name, last_name, email, hashedPwd, phone_number, profile_image, resume, portfolio_url, reffered_name, is_email_notification]);
                
                const {insertId} = response;

                // Insert Data into Educational Table
                await getQueryResultWithParams(`INSERT INTO educational_qualifications (aggreagate_percentage, year_of_passing, qualifications_id, streams_id, colleges_id, other_college_name, college_location, users_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [aggreagate_percentage, year_of_passing, qualifications_id, streams_id, colleges_id, other_college_name, college_location, insertId]);
                
                if(applicantType === "experienced") {
                  // Insert Data into Experienced Professional Qualifications Table
                  await getQueryResultWithParams(`INSERT INTO experienced_professional_qualifications (year_of_experience, current_ctc, expected_ctc, other_experience_technologies, other_familiar_technologies, on_notice_period, notice_period_end_date, notice_period_duration, test_appearence, test_appearence_role, users_id) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [year_of_experience, current_ctc, expected_ctc, other_experience_technologies, other_familiar_technologies, on_notice_period, new Date(notice_period_end_date), notice_period_duration, test_appearence, test_appearence_role, insertId]);

                  // Insert Data into Experience Technologies Table
                  await getQueryResult(`INSERT INTO experience_technologies (technology_id, users_id) VALUES 
                  ${experience_technologies.map((technology_id) => `('${technology_id}', '${insertId}')`).join(',\n')}`);
                }
                else {
                  // Insert Data into Fresher Professional Qualifications Table
                  await getQueryResultWithParams(`INSERT INTO fresher_professional_qualifications (other_familiar_technologies, test_appearence, test_appearence_role, users_id) 
                  VALUES (?, ?, ?, ?)`, [other_familiar_technologies, test_appearence, test_appearence_role, insertId]);
                }

                // Insert Data into Familiar Technologies Table
                await getQueryResult(`INSERT INTO familiar_technologies (technology_id, users_id) VALUES 
                ${familiar_technologies.map((technology_id) => `('${technology_id}', '${insertId}')`).join(',\n')}`);

                // Insert Data into User Job Roles Preference Table
                await getQueryResult(`INSERT INTO user_job_roles_preference (job_roles_id, users_id) VALUES 
                ${preferred_job_roles.map((job_roles_id) => `('${job_roles_id}', '${insertId}')`).join(',\n')}`);

                // Commit Transaction
                connection.commit((error) => {
                  if (error) reject(error);
                  else resolve("Registration Successfully Completed!");
                });
              } catch (error) {
                // Rollback on error
                connection.rollback(() => {
                  reject(error);
                });     
              }
            });


          });
        } catch ({message}) {
          throw new Error("Registration Error: " + message);
        }
      },
      async applyJob(_, args) {
        try {
          const {
            resume_link, 
            time_slots_id,
            selected_job_roles,
            users_id
          } = args.appliedFormData;
          // Insert Data into Fresher Professional Qualifications Table
          const {insertId} = await getQueryResultWithParams(`INSERT INTO user_applied_job_details (resume_link, time_slots_id, users_id) 
          VALUES (?, ?, ?)`, [resume_link, time_slots_id, users_id]);

          // Insert Data into User Applied Job Roles Preference Table
          await getQueryResult(`INSERT INTO user_applied_job_roles_preference (job_roles_id, user_applied_job_details_id) VALUES 
          ${selected_job_roles.map((job_roles_id) => `('${job_roles_id}', '${insertId}')`).join(',\n')}`);

          return insertId;
        } catch ({message}) {
          throw new Error("AppliedJob Error: " + message);
        }
      }
    }
  };