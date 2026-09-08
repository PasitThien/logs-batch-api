import express from 'express';
import cors from 'cors';
import DbLogServices from './dbLogServices.js';
import DbLogRepository from './dbLogRepository.js';

const PORT = 3000;

const app = express();
const dbLogServices = new DbLogServices();
const dbLogRepository = new DbLogRepository();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/get-all-summarized-reports", (req, res) => {
    try {        
        if (!req.body || req.body.dateIp === "" || req.body.dateIp === undefined) {
            return res.status(400).json({
                status: "error",
                message: "Invalid request body, dateIp are required" 
            });
        }

        const resultsData =  dbLogServices.getLogsByDate(req.body.dateIp);

        res.status(200).json({
            dateIp: req.body.dateIp,
            results: resultsData
        })
    } catch(error) {
        res.status(500).json(
            { 
                status: "error",
                message: `Internal server error: ${error.message}`
            }
        )
    }

});


app.post('/insert-log', (req, res) => {
    try {
        if (!req.body || !req.body.logDetail) {
            res.status(400).json({
                status: "error",
                message: "Invalid request body, logDetail are required" 
            })
        }

        console.dir(req.body)

        dbLogRepository.insertBatchLog(req.body.logDetail);
        res.status(200).json({ 
            status: "success",
            message: "Insert has been completed."
         });
    } catch (error) {
        console.log(`Error with: ${error.message}`);
        res.status(500).json(
            { 
                status: "error",
                message: `Internal server error: ${error.message}`
            }
        )
    }
})


// CREATE TABLE IF NOT EXISTS PROCCESS_SUMMARIZED_DATALOGS(
//     LOG_ID INTEGER PRIMARY KEY AUTOINCREMENT,
//     TIME TEXT,
//     PROCESS_NAME TEXT,
//     MESSAGE TEXT,
//     ERROR_MESSAGE TEXT
// );