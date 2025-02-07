import request from '@/utils/request'

// 查询电子放行列表
export function listReleaseapply(query) {
  return request({
    url: '/system/releaseapplycq/list',
    method: 'get',
    params: query
  })
}

// 查询电子放行详细
export function getReleaseapply(id) {
  return request({
    url: '/system/releaseapplycq/' + id,
    method: 'get'
  })
}

// 新增电子放行
export function addReleaseapply(data) {
  return request({
    url: '/system/releaseapplycq',
    method: 'post',
    data: data
  })
}

// 修改电子放行
export function updateReleaseapply(data) {
  return request({
    url: '/system/releaseapplycq',
    method: 'put',
    data: data
  })
}

// 删除电子放行
export function delReleaseapply(id) {
  return request({
    url: '/system/releaseapplycq/' + id,
    method: 'delete'
  })
}

// 导出电子放行
export function exportReleaseapply(query) {
  return request({
    url: '/system/releaseapplycq/export',
    method: 'get',
    params: query
  })
}