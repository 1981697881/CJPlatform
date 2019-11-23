import request from '@/utils/request' //引入封装好的axios请求

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

// 获取楼栋下拉数据
export function towerFormat(prId) {
    const data = {
        prId: prId
    }
    return request({
        url: '/back/base/res/towerFormat.do',
        method: 'post',
        data
    })
}

// 获取楼层下拉数据
export function floorFormat(prId) {
    const data = {
        prId: prId
    }
    return request({
        url: '/back/base/res/floorFormat.do',
        method: 'post',
        data
    })
}
