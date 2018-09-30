export default {
    isEmpty(obj) {
        if (obj == null || obj == undefined)
            return true;
        else if (obj.length == null || obj.length == undefined) {
            for (var key in obj)
                return false; //返回false，不为空对象}
            return true; //返回true，为空对象
        } else if (typeof obj.trim === 'function') {
            if (obj.trim().length == 0 || obj == '')
                return true;
            else
                return false;
        } else
            return false;
    },

    str2Int(arr) {
        let tempArr = [];
        for (let i of arr) {
            tempArr.push(parseInt(i))
        }
        return tempArr;
    }

}
