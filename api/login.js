import request from '@/utils/request'
//获取code值在那用户信息
export function getCode(code) {
  return request({
    url: 'OAuth2/authorize?name=newReleaseCQ&area=CQ&code='+code,
    method: 'get'
  })
}