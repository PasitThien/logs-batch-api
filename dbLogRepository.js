import Database from "better-sqlite3";
import DbQueryStorage from './model/dbQueryStroage.js';


class DbLogRepository {
    constructor() {
        this.dbQueryStorage = new DbQueryStorage();
        this.dbSourcePath = "./db/db_log_proccess.db";
    }

    getLogsByDate = (dateInput) => {
        const db = new Database(this.dbSourcePath);
        console.log("Connected successfully");

        let results = {}

        try {
            const statementSql = this.dbQueryStorage.getLogByDateQuery;
          
            console.log("Start get with date: " + dateInput);
            let resultsRaw = db.prepare(statementSql).all([dateInput, dateInput]);

            results = {
                data: resultsRaw
            }

            console.log("Results from query is successfully retrived")

        } catch (error) {
            console.log(`Error occurred from query: ${error.message}`)
            results = {
                status: "error",
                message: `Error occurred from query: ${error.message}`
            };

        } finally {
            db.close();
        };
        return results;
    }

    insertBatchLog(logDetails) {
        const db = new Database(this.dbSourcePath);
        console.log("Start insert batch logs");

        try {
            const preparedStatement = db.prepare(this.dbQueryStorage.insertBatchLog);
            const paramIndexDetails = {
                time: logDetails.time, 
                processName: logDetails.processName, 
                message: logDetails.message, 
                errorMessage: logDetails.errorMessage 
            };

            console.log()
            const info = preparedStatement.run(paramIndexDetails);
            console.log("Insert successfully" + info);

        } catch(error) {
            throw new Error(`Error insert with : ${error}`)
        } finally {
            db.close();
        }
    }
}

export default DbLogRepository;






// const testQueryDB = async () => {



// const db = new Database("./db/db_log_proccess.db");
// console.log("Connected successfully")


// try {
//     let statementSql = `
//     WITH START_BAT AS (
//         SELECT ROW_NUMBER() OVER (PARTITION BY S.PROCESS_NAME ORDER BY S.TIME ) AS ROW_NUM, S.PROCESS_NAME,
//             S.TIME AS START_TIME
//         FROM PROCCESS_SUMMARIZED_DATALOGS S
//         WHERE DATE(S.TIME) = DATE(?) 
//         AND S.MESSAGE IN ('START_BATCH')
//     ), END_BAT AS (
//         SELECT ROW_NUMBER() OVER (PARTITION BY E.PROCESS_NAME ORDER BY E.TIME ) AS ROW_NUM, E.PROCESS_NAME,
//             E.TIME AS END_TIME,
//             E.ERROR_MESSAGE AS ERROR_MESSAGE
//         FROM PROCCESS_SUMMARIZED_DATALOGS E
//         WHERE DATE(E.TIME) = DATE(?) 
//         AND E.MESSAGE IN ('END_BATCH')
//     )
//     SELECT S.ROW_NUM, 
//         COALESCE(S.PROCESS_NAME, E.PROCESS_NAME) AS PROCESS_NAME,
//         S.START_TIME,
//         E.END_TIME,
//         TIME(STRFTIME('%s', E.END_TIME) - STRFTIME('%s', S.START_TIME), 'unixepoch') AS DURATION,
//         CASE WHEN E.ERROR_MESSAGE = 'ERROR' THEN 'FAILED' ELSE 'SUCCESS' END AS STATUS
//     FROM START_BAT S 
//     FULL OUTER JOIN END_BAT E
//     ON S.ROW_NUM = E.ROW_NUM AND S.PROCESS_NAME = E.PROCESS_NAME`;

//     // await db.all(statementSql, ['2026-07-01', '2026-07-01'], (err, rows) => {
//     //     console.log(rows)
//     // });

//     const results = db.prepare(statementSql).all(['2026-07-02', '2026-07-02']);

//     console.log(results)

// } catch (error) {
//     console.log(`Error occurred from query: ${error.message}`);
// } finally {
//     db.close();
// }
// }



// testQueryDB()

// // try {
// //   const db = new sqlite3.Database("./db/db_log_proccess.db");
// //   console.log("Connected successfully")
// // } catch (error) {
// //   console.error("Error occurred while connecting to the database:", error);
// // } finally {
// //     db.close();
// // }
