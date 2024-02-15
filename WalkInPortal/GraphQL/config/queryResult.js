import { connection } from "./connectDB.js";

export const getQueryResult = async (query) => {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, res) => {
        if(err) reject(err);
        else resolve(res);
      })
    })
}