import request from '@/utail/request'
import storage from '@/utail/storage'
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 删除用户频道
 * @param {String|Number} target //要删除用户频道的id
 * @returns   promise
 */
export const deleteChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {Number} id //添加频道的id
 * @param {Number} seq //添加频道的位置索引
 * @returns
 */
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HETMA_TOUTIAO_CHANNELS = 'HETMA_TOUTIAO_CHANNELS'
export const getMyChannelsByLocal = () => storage.get(HETMA_TOUTIAO_CHANNELS)

export const setMyChannelsToLocal = (channel) =>
  storage.set(HETMA_TOUTIAO_CHANNELS, channel)
