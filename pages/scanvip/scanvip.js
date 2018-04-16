var vip = '会员优惠';
var vip_one = ''
var vip_two = ''
var vip_three = ''
var charge_one = ''
var charge_one_a = ''
var charge_two = ''
var charge_two_a = ''
var charge_three = ''
var charge_three_a = ''
var charge_four = ''
var charge_four_a = ''
var vip_charge = "39.9"
var copyright = "©天天充电  4006888919"

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    back_bg:'',
    col_co:'',
    vip: vip,
    vip_one: vip_one,
    vip_two: vip_two,
    vip_three: vip_three,
    charge_one: charge_one,
    charge_one_a: charge_one_a,
    charge_two: charge_two,
    charge_two_a: charge_two_a,
    charge_three: charge_three,
    charge_three_a: charge_three_a,
    vip_charge: vip_charge,
    charge_four: charge_four,
    charge_four_a: charge_four_a,
    vip_one: vip_one,
    vip_two: vip_two,
    vip_three: vip_three,
    copyright: copyright,
    HeadPortrait: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/47ba38b9ead76b72962cb894f1a54102_75_75.jpg',
    nickName: '',
    f_none:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.login({
      success: function (res) {
        var code = res['code'];
        var h = 'https://t.cd1a.cn/Home/OnLogin/PressKey?code='+code
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
            var HeadPortrait = res.data.portrait
            var nickName = res.data.nickName
            
            var charge_one = res.data.charge_one
            var charge_one_a = res.data.charge_one_a
            var charge_two = res.data.charge_two
            var charge_two_a = res.data.charge_two_a
            var charge_three = res.data.charge_three
            var charge_three_a = res.data.charge_three_a
            var charge_four = res.data.charge_four
            var charge_four_a = res.data.charge_four_a
            var vip_one = res.data.vip_one
            var vip_two = res.data.vip_two
            var vip_three = res.data.vip_three
            var back_bg = res.data.back_bg
            var col_co = res.data.col_co
            var vip_list = res.data.vip_list
            var f_none = res.data.f_none

            that.setData({
              'HeadPortrait': HeadPortrait,
              'nickName': nickName,
              'charge_one': charge_one,
              'charge_one_a': charge_one_a,
              'charge_two': charge_two,
              'charge_two_a': charge_two_a,
              'charge_three': charge_three,
              'charge_three_a': charge_three_a,
              'charge_four': charge_four,
              'charge_four_a': charge_four_a,
              'vip_one': vip_one,
              'vip_two': vip_two,
              'vip_three': vip_three,
              'back_bg': back_bg,
              'col_co': col_co,
              'vip_list': vip_list,
              'f_none': f_none
            })
          }
        })
      }
    })
  },
  Fast_charge: function (options) {
    
    var time = options.currentTarget.id
    //请求
    wx.redirectTo({ url: '../bar/bar?id=' + time })
    //请求结束
  },
  Second_charge: function (options) {
    var time = options.currentTarget.id
    //请求
    wx.redirectTo({ url: '../bar/bar?id=' + time })
  },
  Third_charge: function (options) {
    var time = options.currentTarget.id
    //请求
    wx.redirectTo({ url: '../bar/bar?id=' + time })
  },
  Fourd_charge: function (options) {
    console.log(options.currentTarget.id);
    var time = options.currentTarget.id
    wx.redirectTo({ url: '../bar/bar?id=' + time })
  },
  Four_charge: function (options) {
    console.log(options.currentTarget.id);
    var time = options.currentTarget.id
    wx.redirectTo({ url: '../bar/bar?id=' + time })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _that = this
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _that.setData({
          view: {
            Height: res.windowHeight
          }

        })



      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout(function () {
      wx.redirectTo({ url: '../index/index' })
    }, 600000);
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