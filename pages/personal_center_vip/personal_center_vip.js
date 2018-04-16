var copyright = "©天天充电  4006888919"
var vip = '会员优惠';
var vip_one = ''
var vip_two = ''
var vip_three = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mine_width: '',
    mine_height: '',
    my_money: '',
    avatarUrl: '',
    avatarUrl_vip: '',
    nickName: '',
    refund: '',
    copyright: copyright,
    vip: vip,
    vip_one: vip_one,
    vip_two: vip_two,
    vip_three: vip_three
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            mine_width: res.windowWidth * 0.3333333,
            mine_height: res.windowHeight * 0.5
          }

        })



      }
    })


    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        var h = 'https://t.cd1a.cn/Home/Money/wallet?' + code
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
            var refund = res.data.deposit
            var vip_one = res.data.vip_one
            var vip_two = res.data.vip_two
            var vip_three = res.data.vip_three
            that.setData({
              'my_money': my_money,
              'avatarUrl': avatarUrl,
              'avatarUrl_vip': avatarUrl_vip,
              'nickName': nickName,
              'refund': refund,
              'vip_one': vip_one,
              'vip_two': vip_two,
              'vip_three': vip_three
            })
          }
        })
      }
    })

  },
  consumption: function () {
    wx.navigateTo({
      url: '../consumption/consumption',
    })
  },
  details: function () {
    wx.navigateTo({
      url: '../details/details',
    })
  },
  agreement: function () {
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  },
  Recharge_jump: function () {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  refund: function () {
    wx.showModal({
      title: '提示',
      content: '充值88.8元,可成为天天充电会员,并享受会员优惠!',
      confirmText: '去充值',
      success: function (res) {
        if (res.confirm) {
          var money = '88.8'
          wx.redirectTo({ url: '../pay/pay?id=' + money })
        } else if (res.cancel) {
          content('用户点击取消')
        }
      }
    })
  }
  ,

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