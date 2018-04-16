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
    navList: [{
      id: 1,
      chongzhi: '充￥500',
      money: "500"
    },
    {
      id: 2,
      chongzhi: '充￥400',
      money: "400"
    },
    {
      id: 3,
      chongzhi: '充￥300',
      money: "300"
    },
    {
      id: 4,
      chongzhi: '充￥200',
      money: "200"
    },
    {
      id: 5,
      chongzhi: '充￥150',
      song: '',
      money: "150"
    }
      ,
    {
      id: 6,
      chongzhi: '充￥100',
      song: '',
      money: "100"
    }
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
    b = 500;
    console.log(b)
    this.setData({
      mymoney: money,
    })
    
    
  },
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
