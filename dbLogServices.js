import DbLogRepository from './dbLogRepository.js';

class DbLogServices {
    constructor() {
        this.dbLogRepository = new DbLogRepository();
        this.proccessNameList = [];
    }

    getLogsByDate = (dateInput) => {
        let results = this.dbLogRepository.getLogsByDate(dateInput);

        if (results.status === "error") {
            throw new Error(`Error query with : ${results.message}`)
        }

        let restructuredData = {};
        let processList = [];

        results.data.forEach((item) => {
            if (!restructuredData[item.PROCESS_NAME]) {
                restructuredData[item.PROCESS_NAME] = {
                    processName: item.PROCESS_NAME,
                    totalBatch: 0,
                    batchList: []
                };
            }

            restructuredData[item.PROCESS_NAME] = 
            {
                processName: item.PROCESS_NAME,
                totalBatch: restructuredData[item.PROCESS_NAME].totalBatch + 1,
                batchList: [
                    ...restructuredData[item.PROCESS_NAME].batchList, 
                    {
                        rowNum: item.ROW_NUM,
                        startTime: item.START_TIME,
                        endTime: item.END_TIME,
                        duration: item.DURATION,
                        status: item.STATUS
                    }
                ]
            }
        });


        Object.keys(restructuredData).forEach((key) => {
            processList.push(restructuredData[key]);
        })

        let response = { 
            status: "success",
            message: "Successfully Retrive logs",
            allProcessList: processList
        }

        return response;
    }
}

export default DbLogServices;