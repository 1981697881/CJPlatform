import request from '@/utils/request' //引入封装好的axios请求

// 租赁类型
export function rentCategoryFormat(data){
    return request({
        url: '/back/lease/rentCategoryFormat.do',
        method: 'post',
        data
    })
}

//用户下拉
export function userFormat(data){
    return request({
        url: '/back/system/user/userFormat.do',
        method: 'post',
        data
    })
}


// 获取字典下拉数据
export function generalFormat(dictType, tableType) {
    const data = {
        dictType: dictType,
        tableType: tableType
    }
    return request({
        url: '/back/dict/general/generalFormat.do',
        method: 'post',
        data
    })
}

// 获取楼盘下拉数据
export function buildFormat() {
    return request({
        url: '/back/base/res/buildFormat.do',
        method: 'post',
    })
}