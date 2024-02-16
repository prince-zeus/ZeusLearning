import { connection } from "./connectDB.js";

export const getQueryResult = async (query) => {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, res) => {
        if(err) reject(err);
        else resolve(res);
      })
    })
}

export const getQueryResultWithParams = async (query, queryParams) => {
    return new Promise((resolve, reject) => {
      connection.query(query, queryParams, (err, res) => {
        if(err) reject(err);
        else resolve(res);
      })
    })
}