import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询订单列表
export function returnsList(data) {
  const url = '/Admin/returnOrder/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'get',
    params: {
      query: data.query
    }
  })
}

// 修改 根据id查询
export function getReturnOrder(data) {
  const url = '/returnOrder/getById/' + data
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'get',
  })
}
// 根据id查询
export function getOrderGoodsById(data) {
  const url = '/returnOrder/getOrderGoodsById/' + data
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'get',
  })
}
// 审核 {id}
export function auditOrder(data) {
  const url = '/Admin/returnOrder/auditOrder/' + data
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'put',
  })
}
//驳回
export function Dismissed(data) {
  const url = '/Admin/returnOrder/Dismissed/' + data
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'put',
  })
}
//收货确认
export function receiving(data) {
  const url = '/Admin/returnOrder/receipt/' + data
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'put',
  })
}
