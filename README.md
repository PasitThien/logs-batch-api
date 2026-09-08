# Logs Batch API
This API provided for logs retrival from database which would stored as tables

## APIs
### 1. get-all-summarized-reports           
Request body:
```JSON
{
    "dateIp": "2026-07-01"
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

1. time must be in format **YYYY-MM-DD HH24:MI:SS**
2. message must be only `START_BATCH` or `END_BATCH`