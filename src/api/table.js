import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth' // get token from cookie

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
// 报表
export function productCategory(data) {
  const url = '/Report/productCategory'
  return request({
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}
// 报表
export function product(data) {
  const url = '/Report/product'
  return request({
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}

