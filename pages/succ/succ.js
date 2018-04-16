// index.js
var my_balance = "我的余额"
var my_consumption = "本次消费"
var my_consumption_btn = "{{金额}}"
var my_recharge = "本次充电时长"
var my_recharge_btn = "{{时长}}"
var my_card = "我的卡券"
var my_card_btn = "查看"
var copyright = "©天天充电  4006888919"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_balance: my_balance,
    my_money: '',
    my_consumption: my_consumption,
    my_consumption_btn: my_consumption_btn,
    my_recharge: my_recharge,
    my_recharge_btn: my_recharge_btn,
    my_card: my_card,
    my_card_btn: my_card_btn,
    copyright: copyright,
    avatarUrl: '',
    avatarUrl_vip: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        var h = 'https://t.cd1a.cn/Home/Money/consumption?code=' + code
        //发起请求
        wx.request({
          url: h, //接口地址
          data: {
            "code": code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
            var my_money = res.data.money
            var avatarUrl = res.data.avatarUrl
            var avatarUrl_vip = res.data.avatarUrl_vip
            var nickName = res.data.nickName
            var time = res.data.time
            var consumption = res.data.consumption
            that.setData({
              'my_money': my_money,
              'avatarUrl': avatarUrl,
              'avatarUrl_vip': avatarUrl_vip,
              'nickName': nickName,
              'my_recharge_btn': time,
              'my_consumption_btn': consumption,
            })
          }
        })
      }
    })
  },
  succ_but:function(){
    wx.login({
      success: function (res) {
        var code = res['code'];
        var h = 'https://t.cd1a.cn/Home/Money/goBack?code' + code
        //发起请求
        wx.request({
          url: h, //接口地址
          data: {
            "code": code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
          console.log(res)
            var status = res.data.status
            if (status == 2){
              console.log('213213213')
             wx.redirectTo({            
               url: '../index/index',
             })
           }
          
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