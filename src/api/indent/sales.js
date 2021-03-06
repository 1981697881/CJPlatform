import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询订单列表
export function salesList(data) {
  const url = '/Admin/Order/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('plrx'),
    },
    url: url,
    method: 'get',
    params: {
      query: data.query
    }
  })
}
// 查询订单列表
export function salesListT(data, query) {
  const url = '/Admin/Order/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 根据id查询单据详情
export function saleInfo(data) {
  const url = '/order/getOrderGoodsById/' + data
  return request({
    headers: {
      'authorization': getToken('plrx'),
    },
    url: url,
    method: 'get',
  })
}
// 重新下推
export function saleReset(data) {
  const url = '/order/reSync/' + data
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
  })
}
// 审核
export function auditOrder(data) {
  const url = '/Admin/order/auditOrder'
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    transformRequest: [function (data) {
      data = JSON.stringify(data)
      return data
    }],
    url: url,
    method: 'put',
    data:data
  })
}
// 驳回
export function Dismissed(data) {
  const url = '/Admin/order/Dismissed/'
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'put',
    data: data
  })
}
// 订单发货
export function delivery(data) {
  const url = '/Admin/order/ship/' + data
  return request({
    headers: {
      'authorization': getToken('plrx'),
    },
    url: url,
    method: 'put',
  })
}
// 导出订单明细
export function exportData(data) {
  const url = '/excel/Admin/export/orderData'
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: url,
    method: 'post',
    data: data
  })
}
// 修改保存单据
export function updateSale(data) {
  const url = '/Admin/orderUpdate'
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'put',
    data: data
  })
}
// 取消审核
export function cancelAuditSale(data) {
  const url = '/Admin/order/cancelAuditOrder/' + data
  return request({
    headers: {
      'authorization': getToken('plrx'),
    },
    url: url,
    method: 'put'
  })
}// 修改保存单据
export function updateSales(data) {
  const url = '/order/update'
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'put',
    data: data
  })
}
// 删除订单
export function delSaleOrder(data) {
  const url = '/Admin/deleteOrder/' + data
  return request({
    headers: {
      'authorization': getToken('plrx'),
    },
    url: url,
    method: 'delete',
  })
}
