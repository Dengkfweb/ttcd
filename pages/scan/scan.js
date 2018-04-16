var vip = '';
var vip_one = ''
var vip_two = ''
var vip_three = ''
var charge_first = ''
var charge_first_a = ''
var charge_second = ''
var charge_second_a = ''
var charge_third = ''
var charge_third_a = ''
var Fast_charge = '1.5'
var Second_charge = '3.5'
var Third_charge = '6.5'
var vip_charge = "0"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip: vip,
    vip_one: vip_one,
    vip_two: vip_two,
    vip_three: vip_three,
    charge_first: charge_first,
    charge_first_a: charge_first_a,
    charge_second: charge_second,
    charge_second_a: charge_second_a,
    charge_third: charge_third,
    charge_third_a: charge_third_a,
    Fast_charge: Fast_charge,
    Second_charge: Second_charge,
    Third_charge: Third_charge,
    vip_charge: vip_charge,
    HeadPortrait: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/47ba38b9ead76b72962cb894f1a54102_75_75.jpg',
    nickName:'',
    f_none: 'none',
    modal:'none',
    show_content_1: '1、加入会员首月免费充电(每天6小时);\r',
    show_content_2: '2、加入会员充电最低至0.33元/小时;\r',
    show_content_3:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        var h = 'https://t.cd1a.cn/Home/OnLogin/StoredValue?code=' + code
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
            var vip = res.data.vip
            var vip_one = res.data.vip_one
            var vip_two = res.data.vip_two
            var vip_three = res.data.vip_three
            console.log(res.data.vip_three)
            var charge_first_a = res.data.charge_first_a
            var charge_first = res.data.charge_first
            var charge_second_a = res.data.charge_second_a
            var charge_second = res.data.charge_second
            var charge_third = res.data.charge_third
            var charge_third_a = res.data.charge_third_a
            var scan = res.data.scan
            var vip_list = res.data.vip_list
            var f_none = res.data.f_none
            var modle = res.data.modle
            var vip_money = res.data.vip_money
            // var vip_moey = getApp().globalData.vip_money
            if(scan == "null"){
              
              wx.redirectTo({
                url: '../index/index',
              })
              console.log('测试数据')
            }else{
              that.setData({
                'HeadPortrait': HeadPortrait,
                'nickName': nickName,
                'vip_one': vip_one,
                'vip_two': vip_two,
                'vip_three': vip_three,
                'charge_first': charge_first,
                'charge_first_a': charge_first_a,
                'charge_second': charge_second,
                'charge_second_a': charge_second_a,
                'charge_third': charge_third,
                'charge_third_a': charge_third_a,
                'f_none': f_none,
                'vip_list': vip_list,
                'modal': modle,
                'vip':vip
              })
              
            }
            
          }
        })
      }
    })

  },
  Fast_charge: function (options) {
    console.log(options.currentTarget.id);
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
  vip_charge: function (options) {
    wx.showModal({
      title: '提示',
      content: '是否加入会员？',
      confirmText:'去充值',
      success: function (res) {
        if (res.confirm) {
          var money = '0'
          wx.redirectTo({ url: '../pay/pay?id=' + money })
        } else if (res.cancel) {
          content('用户点击取消')
        }
      }
    })  
    
  },
  cancel: function () {
    this.setData({
      'modal': "none"
    });
  },
  modalOk:function () {
    var show_con = "是否加入会员？"
    wx.showModal({
      title: '提示',
      content: show_con,
      confirmText: '去充值',
      success: function (res) {
        if (res.confirm) {
          var money = '0'
          wx.redirectTo({ url: '../pay/pay?id=' + money })
        } else if (res.cancel) {
          content('用户点击取消')
        }
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
    setTimeout(function () {
      console.log("测试")
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