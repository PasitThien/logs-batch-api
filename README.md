# Logs Batch API
This API provided for logs retrival from database which would stored as tables

## APIs
### 1. get-all-summarized-logs          
Request body:
```JSON
{
    "dateIp": "2026-07-01"
}
```

Example response
```JSON
{
    "dateIp": "2026-07-02",
    "results": {
        "status": "success",
        "message": "Successfully Retrive logs",
        "allProcessList": [
            {
                "processName": "PROCESS_1",
                "totalBatch": 2,
                "batchList": [
                    {
                        "rowNum": 1,
                        "startTime": "2026-07-02 12:00:09",
                        "endTime": "2026-07-02 12:00:30",
                        "duration": "00:00:21",
                        "status": "FAILED"
                    },
                    {
                        "rowNum": 2,
                        "startTime": "2026-07-02 13:00:09",
                        "endTime": "2026-07-02 13:00:30",
                        "duration": "00:00:21",
                        "status": "SUCCESS"
                    }
                ]
            },
            {
                "processName": "PROCESS_2",
                "totalBatch": 3,
                "batchList": [
                    {
                        "rowNum": 1,
                        "startTime": "2026-07-02 14:00:00",
                        "endTime": "2026-07-02 14:10:00",
                        "duration": "00:10:00",
                        "status": "SUCCESS"
                    },
                    {
                        "rowNum": 2,
                        "startTime": "2026-07-02 14:20:00",
                        "endTime": "2026-07-02 14:25:00",
                        "duration": "00:05:00",
                        "status": "SUCCESS"
                    },
                    {
                        "rowNum": 3,
                        "startTime": "2026-07-02 14:30:00",
                        "endTime": "2026-07-02 14:35:00",
                        "duration": "00:05:00",
                        "status": "SUCCESS"
                    }
                ]
            }
        ]
    }
}
```
### 2. insert-log          
Request body:
```JSON
{
    "logDetail": {
        "time": "2026-09-16 08:00:00",
        "processName": "PROCESS_1", 
        "message": "START_BATCH", 
        "errorMessage": null
    }
}
```
Example response
```JSON
{
    "status": "success",
    "message": "Insert has been completed."
}
```

1. time must be in format **YYYY-MM-DD HH24:MI:SS**
2. message must be only `START_BATCH` or `END_BATCH`