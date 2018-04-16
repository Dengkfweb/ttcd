// pages/refund/refund.js
var vip = '会员优惠';
var vip_one = ''
var vip_two = ''
var vip_three = ''
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    vip: vip,
    vip_one: vip_one,
    vip_two: vip_two,
    vip_three: vip_three
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        wx.request({
          url: 'https://t.cd1a.cn/Home/OnLogin/HeadPortrait', //仅为示例，并非真实的接口地址
          data: {
            'code': code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
            var vip_one = res.data.vip_one
            var vip_two = res.data.vip_two
            var vip_three = res.data.vip_three
            
            that.setData({
              'vip_one': vip_one,
              'vip_two': vip_two,
              'vip_three': vip_three
            })
          }
        })
        
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})