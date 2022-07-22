import request from '@/utail/request'
/**
 *获取新闻的详情页
 * @param {String} id //要获取的新闻详情页的新闻id
 * @returns promise
 */

export const getNewsDetail = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}

/**
 * 获取评论
 * @returns promise
 */

export const getCommit = (type, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit: 100
    }
  })
}

/**
 * 发表评论
 * @param {String} target //评论的目标id，评论文章即为文章id,评论评论则为评论id
 * @param {String} content //评论内容
 * @param {String} artId //文章id,对评论内容发表回复时，需要传递此参数，表明所属文章id，对文章进行评论，不要传此参数
 * @returns promise
 */
export const postCommit = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}
