Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList:[
      
       ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      complete:function (){
        wx.login({
          success: function (res) {
            var code = res['code'];
            wx.request({
              url: 'https://t.cd1a.cn/Home/Money/ChargeRecord', //仅为示例，并非真实的接口地址
              data: {
                'code': code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res)
                that.setData({
                  newList: res.data.newList
                });
              }
            })
          }
        })
      }
    })


    
   
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

