//recharge.js
var app = getApp()
var color, sucmoney
var money = 0
var b = 0
var yajinid = 0
var copyright = "©天天充电  4006888919"
Page({
  data: {
    mymoney: 0,
    disabled: false,
    curNav: 1,
    copyright: copyright,
    curIndex: 0,
    cart: [],
    cartTotal: 0,
    lockhidden: true,
    yajinhidden: true,
    sucmoney: 0,
    color: "limegreen",
    nocancel: false,
    tajinmodaltitle: "押金充值",
    yajinmodaltxt: "去充值",
    yajinmoney: 0,
    yajintxt: "您是否确定充值押金39.9元？押金充值后可以在点击押金退还全额退款",
    recharge_none:"none",
    navList: [
    
    ],
  },
  //充值金额分类渲染模块
  selectNav(event) {
    let id = event.target.dataset.id,
      index = parseInt(event.target.dataset.index);
    b = parseInt(event.target.dataset.money);
    self = this;
    this.setData({
      curNav: id,
      curIndex: index,
    })
  },
  //页面加载模块
  onLoad: function () {
    
    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        wx.request({
          url: 'https://t.cd1a.cn/Home/Money/OrderNumber', //仅为示例，并非真实的接口地址
          data: {
            "code":code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)

            var newnav = res.data.data
            var recharge_none = res.data.recharge_none
           b = res.data.bsb
            that.setData({
              "navList": newnav,
              "recharge_none": recharge_none
            })
          }
        })
      }
    })
    this.setData({
      mymoney: money,
    })
    
    
  },
  onReady:function(){
    
  }
  ,
  buttonEventHandle: function (event) {
    console.log(event)
  },
  //去充值功能模块
  goblance: function (event) {
    money += b;
    console.log(money)
    wx.redirectTo({ url: '../pay/pay?id=' + money })
    money = 0
    console.log(money)
    
  },
  confirm: function () {
    this.setData({
      lockhidden: true
    });
  }
})
