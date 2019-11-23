import fetchJsonp from "fetch-jsonp";
// 封装jsonp 方法
export function jsonp(url, data) {
    return new Promise((resolve, reject) => {

        let objKey = [];// 存key
        for (let key in data) {
            objKey.push(key)
        }
        let param = ''// 拼接url参数
        for (var i = 0; i < objKey.length; i++) {
            const key = objKey[i]
            param += '&' + key + '=' + data[key]
        }
        fetchJsonp(
            apiUrl + url + '?' + param, { method: "GET", })
            .then(response => {
                return response.json();
            })
            .then(json => {
                resolve(json)
            })
            .catch(ex => {
                console.log("parsing failed", ex);
            });
    })
    


    
}