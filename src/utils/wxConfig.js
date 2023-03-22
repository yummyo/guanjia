/* eslint-disable */
import { getJsApiConfig } from '@/api/home'

// 初始化微信配置
export function wxInitConfig(params = {}) {
  const _appid = 'wx466d3bf40e0c26fe'
  // 参数默认值
  const defaultParams = {
    title: '知识库',
      desc: '知识库',
      link: window.location.href,
      imgUrl: 'https://hyyxboss.oss-cn-shenzhen.aliyuncs.com/kd/20220811/390a9105-cc2d-4483-98e0-0f2c8b99afd7_wiki.png'
  }
  const baseParams = Object.assign(defaultParams,params)

  getJsApiConfig({
    'appId': _appid,
    'url': location.href.split('#')[0]
  }).then(res => {
    console.log('res', res)

    if (res.code == 0) {
      const { timestamp, nonceStr, signature, appId } = res.data

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsApiList: [ // 用的方法都要加进来
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareAppMessage', //旧的接口，即将废弃
          'onMenuShareTimeline'
        ]
      })
      wx.ready(function(res) {
        console.log('初始化成功',res)
        // 分享给朋友
        wx.updateAppMessageShareData({
          title: baseParams.title, // 分享标题
          desc: baseParams.desc, // 分享描述
          link: baseParams.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: baseParams.imgUrl, // 分享图标
          success: function(res) {
            // 设置成功
            if (baseParams.success) {
              baseParams.success(res)
            } else {
              // console.log('分享给朋友成功,返回的信息为:', res)
            //   this.$Message.message("设置成功!");
            }
          }
        })
        //分享到朋友圈
        wx.updateTimelineShareData({
          title: baseParams.title, // 分享标题
          link: baseParams.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: baseParams.imgUrl, // 分享图标
          success: function () {
            // 设置成功
            if (baseParams.success) {
              baseParams.success(res)
            } else {
              // console.log('分享到朋友圈成功,返回的信息为:', res)
            //   this.$Message.message("设置成功!");
            }
          }
        })
      })
      wx.error(function(res) {
        console.log('验证失败返回的信息:', res)
      })
    }
  })
}
