

export default class GetFindngData {

    getFindngData(data, path) {
        let result = [];
        let tempData = data
        var pathStr = path.split(".");
        console.log("path splitted" + pathStr);

        if (pathStr.includes('id')) {
            for (let i = 0; i < pathStr.length; i++) {
                if (pathStr[i] != 'id') {
                    if (typeof (tempData) == "object" && Array.isArray(tempData) != true) {
                        tempData = tempData[pathStr[i]]
                    } else if (typeof (tempData) == "object" && Array.isArray(tempData) == true) {
                        let tempData2 = tempData;
                        tempData = []
                        for (let ii = 0; ii < tempData2.length; ii++) {
                            Object.entries(tempData2[ii][pathStr[i]]).map(([key, val]) =>
                                tempData.push(val)
                            )
                            //tempData.push(tempData2[ii][pathStr[i]])

                        }
                    }

                } else {
                    if (typeof (tempData) == "object" && Array.isArray(tempData) != true) {
                        let tempData2 = tempData;
                        tempData = []
                        Object.entries(tempData2).map(([key, val]) =>
                            tempData.push(val)
                        )

                    } else if (typeof (tempData) == "object" && Array.isArray(tempData) == true) {

                    }
                }
            }
        } else {
        }


        return tempData
    }
}
