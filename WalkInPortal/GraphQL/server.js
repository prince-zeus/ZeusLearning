import dotenv from 'dotenv';
import { connection } from './config/connectDB.js';
import {typeDefs} from './model/schema.js';
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import { getQueryResult } from './config/queryResult.js';
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
      async getUsers() {
        const users = await getQueryResult(`SELECT * FROM users`);
        return users;
      },
      async getUser(_, args) {
        const users = await getQueryResult(`SELECT * FROM users WHERE id = ${args.id}`);
        console.log(users)
         const foundUser =  users.find( (user) => String(user.id)  === args.id);
         console.log(foundUser)
         return foundUser;
      },
      async getJobs() {

      },
      async getJob() {

      },
      async getJobRoles() {

      },
      async getQualifications() {

      },
      async getColleges() {

      },
      async getStreams() {

      }
    },
  };