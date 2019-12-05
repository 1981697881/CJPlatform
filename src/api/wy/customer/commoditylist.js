import request from '@/utils/request' // 引入封装好的axios请求
import { jsonp } from '@/utils/jsonp' // 引入封装好的jsonp

// 根据房产获取客户列表
export function rxCustomerList(data) {
    
    return request({
        url: '/back/base/cus/rxCustomerList.do',
        method: 'post',
        data
    })
}
export function customerList(data) {
    return jsonp('/back/base/cus/customerList.do', data)
}

// 主键获取客户信息 getCustomerById
export function getCustomerById(fid) {
    const data = {
        fid: fid,
    }
    return request({
        url: '/back/base/cus/getCustomerById.do',
        method: 'post',
        data
    })
}

// 新增/修改客户信息
export function saveCustomer(form) {
    const data = form
    return request({
        url: '/back/base/cus/saveCustomer.do',
        method: 'post',
        data
    })
}
