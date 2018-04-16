// index.js
var my_balance = "我的余额"
var my_consumption = "消费记录"
var my_consumption_btn = "查看"
var my_recharge = "充值记录"
var my_recharge_btn = "查看"
var my_card = "我的卡券"
var my_card_btn = "查看"
var copyright = "©天天充电  4006888919"
var agreement= "用户协议"
var agreement_ck = "查看"

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
    agreement: agreement,
    agreement_ck: agreement_ck,
    avatarUrl:'',
    avatarUrl_vip:'',
    refund:'',
    nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
            that.setData({
              'my_money': my_money,
              'avatarUrl': avatarUrl,
              'avatarUrl_vip': avatarUrl_vip,
              'nickName': nickName,
              'refund': refund
            })
          }
        })
      }
    })
  },
  consumption:function(){
    wx.navigateTo({
      url: '../consumption/consumption',
    })
  },
  details:function(){
    wx.navigateTo({
      url: '../details/details',
    })
  },
  agreement:function(){
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  },
  Recharge_jump: function () {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  }
  ,
  // refund: function () {
  //   wx.login({
  //     success: function (res) {
  //       var code = res['code'];
  //       var h = 'https://t.cd1a.cn/Home/Money/wallet?' + code
  //       //发起请求
  //       wx.request({
  //         url: h, //接口地址
  //         data: {
  //           "code": code
  //         },
  //         header: {
  //           'content-type': 'application/json' // 默认值
  //         },
  //         success: function (res) {
  //           console.log(res)
  //           var refund = res.data.deposit
            
  //           if (refund == '加入') {
  //             wx.showModal({
  //               title: '提示',
  //               content: '充值88.8元,可成为天天充电会员,并享受会员优惠,本费用可退!',
  //               confirmText: '去充值',
  //               success: function (res) {
  //                 if (res.confirm) {
  //                   var money = '88.8'
  //                   wx.redirectTo({ url: '../pay/pay?id=' + money })
  //                 } else if (res.cancel) {
  //                   content('用户点击取消')
  //                 }
  //               }
  //             })
  //           } else if (refund == '退款'){
  //             wx.showModal({
  //               title: '提示',
  //               content: '您确定退出会员吗？退出会员将无法享受本平台会员优惠',
  //               confirmText: '确定',
  //               success: function (res) {
  //                 if (res.confirm) {
  //                   wx.login({
  //                     success: function (res) {
  //                       var code = res['code'];
  //                       wx.request({
  //                         url: 'https://t.cd1a.cn/Home/Money/deposit', //仅为示例，并非真实的接口地址
  //                         data: {
  //                           'code': code
  //                         },
  //                         header: {
  //                           'content-type': 'application/json' // 默认值
  //                         },
  //                         success: function (res) {
  //                           wx.redirectTo({ url: '../refund/refund' })
  //                         }
  //                       })

  //                     }
  //                   })



  //                 } else if (res.cancel) {
  //                   content('用户点击取消')
  //                 }
  //               }
  //             })
  //           } else if (refund == '查看'){
  //             wx.navigateTo({
  //               url: '../refund/refund',
  //             })
  //           }



  //         }
  //       })
  //     }
  //   })
    
    
    

  // },
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