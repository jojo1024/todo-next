import * as mysql from 'mysql';

// Chargement des variables d'environnement depuis le fichier .env
require("dotenv").config();


const mysqlDB = mysql.createPool({
  connectionLimit: 40,
  host: process.env.MYSQL_HOST!,
  //   port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME!,
  password: process.env.MYSQL_PASSWORD!,
  database: process.env.MYSQL_DB!
});

// Récupérer une connexion depuis mysqlDB
mysqlDB.getConnection((err: any, connection: any) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    } else if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    } else if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    } else console.error("Impossible de se connecter à la base");
  } else {
    console.info("Sucessfully connected to the mySQL database!");
  }

  if (connection) connection.release();
  return;
});

// Export a helper function to execute database queries
export async function _executeSql(sql: string, values: any[]) {
  return new Promise((resolve, reject) => {
    mysqlDB.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}


export default mysqlDB;