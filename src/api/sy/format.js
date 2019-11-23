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