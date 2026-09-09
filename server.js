import express from 'express';
import cors from 'cors';
import DbLogServices from './dbLogServices.js';
import DbLogRepository from './dbLogRepository.js';

const PORT = process.env.PORT || 3000;

const app = express();
const dbLogServices = new DbLogServices();
const dbLogRepository = new DbLogRepository();

app.use(express.json());
app.use(cors());


const mockupEmptyLogs = {
        "dateIp": "2026-09-14",
            "results": {
                "status": "success",
                "message": "Successfully Retrive logs",
                "allProcessList": []
            }
        }

const mockupGetAllSummarizedLogResponse = [
    {
        dateIp: "2026-09-16",
        responseBodyMock: {
            "dateIp": "2026-09-16",
            "results": {
                "status": "success",
                "message": "Successfully Retrive logs",
                "allProcessList": [
                    {
                        "processName": "PROCESS_1",
                        "totalBatch": 3,
                        "batchList": [
                            {
                                "rowNum": 1,
                                "startTime": "2026-09-16 08:00:00",
                                "endTime": "2026-09-16 08:30:00",
                                "duration": "00:30:00",
                                "status": "SUCCESS"
                            },
                            {
                                "rowNum": 2,
                                "startTime": "2026-09-16 09:33:10",
                                "endTime": "2026-09-16 09:58:17",
                                "duration": "00:25:07",
                                "status": "SUCCESS"
                            },
                            {
                                "rowNum": 3,
                                "startTime": "2026-09-16 22:00:17",
                                "endTime": "2026-09-16 22:50:17",
                                "duration": "00:50:00",
                                "status": "FAILED"
                            }
                        ]
                    },
                    {
                        "processName": "PROCESS_2",
                        "totalBatch": 2,
                        "batchList": [
                            {
                                "rowNum": 1,
                                "startTime": "2026-09-16 08:25:00",
                                "endTime": "2026-09-16 08:50:00",
                                "duration": "00:25:00",
                                "status": "FAILED"
                            },
                            {
                                "rowNum": 2,
                                "startTime": "2026-09-16 13:45:12",
                                "endTime": "2026-09-16 14:55:00",
                                "duration": "01:09:48",
                                "status": "SUCCESS"
                            }
                        ]
                    },
                    {
                        "processName": "PROCESS_3",
                        "totalBatch": 1,
                        "batchList": [
                            {
                                "rowNum": 1,
                                "startTime": "2026-09-16 12:11:00",
                                "endTime": "2026-09-16 12:55:00",
                                "duration": "00:44:00",
                                "status": "SUCCESS"
                            }
                        ]
                    }
                ]
            }
        }
    },
    {
        dateIp: "2026-09-15",
        responseBodyMock: {
            "dateIp": "2026-09-15",
            "results": {
                "status": "success",
                "message": "Successfully Retrive logs",
                "allProcessList": [
                    {
                        "processName": "PROCESS_1",
                        "totalBatch": 1,
                        "batchList": [
                            {
                                "rowNum": 1,
                                "startTime": "2026-09-15 10:00:17",
                                "endTime": "2026-09-15 10:30:17",
                                "duration": "00:30:00",
                                "status": "SUCCESS"
                            }
                        ]
                    },
                    {
                        "processName": "PROCESS_2",
                        "totalBatch": 4,
                        "batchList": [
                            {
                                "rowNum": 1,
                                "startTime": "2026-09-15 06:30:00",
                                "endTime": "2026-09-15 07:00:00",
                                "duration": "00:30:00",
                                "status": "SUCCESS"
                            },
                            {
                                "rowNum": 2,
                                "startTime": "2026-09-15 07:20:00",
                                "endTime": "2026-09-15 07:27:13",
                                "duration": "00:07:13",
                                "status": "SUCCESS"
                            },
                            {
                                "rowNum": 3,
                                "startTime": "2026-09-15 07:30:00",
                                "endTime": "2026-09-15 07:35:00",
                                "duration": "00:05:00",
                                "status": "SUCCESS"
                            },
                            {
                                "rowNum": 4,
                                "startTime": "2026-09-15 11:20:00",
                                "endTime": "2026-09-15 11:30:00",
                                "duration": "00:10:00",
                                "status": "FAILED"
                            }
                        ]
                    },
                    {
                        "processName": "PROCESS_3",
                        "totalBatch": 1,
                        "batchList": [
                            {
                                "rowNum": 1,
                                "startTime": "2026-09-15 20:30:00",
                                "endTime": "2026-09-15 21:10:00",
                                "duration": "00:40:00",
                                "status": "FAILED"
                            }
                        ]
                    }
                ]
            }
        }
    },
    {
        dateIp: "2026-09-14",
        responseBodyMock: {
            "dateIp": "2026-09-14",
            "results": {
                "status": "success",
                "message": "Successfully Retrive logs",
                "allProcessList": [
                    {
                        "processName": "PROCESS_1",
                        "totalBatch": 1,
                        "batchList": [
                            {
                                "rowNum": 1,
                                "startTime": "2026-09-14 07:20:00",
                                "endTime": "2026-09-14 09:00:00",
                                "duration": "01:40:00",
                                "status": "SUCCESS"
                            }
                        ]
                    },
                    {
                        "processName": "PROCESS_2",
                        "totalBatch": 1,
                        "batchList": [
                            {
                                "rowNum": 1,
                                "startTime": "2026-09-14 08:20:00",
                                "endTime": "2026-09-14 08:40:00",
                                "duration": "00:20:00",
                                "status": "SUCCESS"
                            }
                        ]
                    }
                ]
            }
        }
    }   
]

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/get-all-summarized-logs", (req, res) => {
    try {       
        if (!req.query || req.query.dateIp === "" || req.query.dateIp === undefined) {
            return res.status(400).json({
                status: "error",
                message: "Invalid request body, dateIp are required" 
            });
        }

        // const resultsData =  dbLogServices.getLogsByDate(req.query.dateIp);
        // let response = {
        //     dateIp: req.query.dateIp,
        //     results: resultsData
        // };
        // res.status(200).json(response);

        // Mockup response
        const responseRaw = mockupGetAllSummarizedLogResponse.find(
            (dateList) => dateList.dateIp === req.query.dateIp
        );
        let response = !responseRaw ? { ...mockupEmptyLogs, dateIp: req.query.dateIp }: responseRaw.responseBodyMock;
        res.status(200).json(response);
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