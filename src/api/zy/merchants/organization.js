import request from '@/utils/request' //引入封装好的axios请求

// 主键获取部门
export function selectStaffList(data) {
  return request({
    url: '/back/staff/selectStaffList.do',
    method: 'post',
    data
  })
}