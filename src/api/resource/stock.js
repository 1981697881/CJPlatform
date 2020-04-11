import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询库存
export function stockList(data,query) {
  //查询分页数据
  const url = '/cjsh-stock-info/list/' + data.pageNum + '/' + data.pageSize
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
// 导出
export function exportStockData(data) {
  const url = '/excel/export/stockData/' + data
  return request({
    headers: {
      'authorization': getToken('plrx'),
    },
    responseType: 'blob',
    url: url,
    method: 'get',
  })
}
