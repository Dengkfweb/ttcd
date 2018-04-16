Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var j_zm = setTimeout(function () {
      wx.showModal({
        title: '提示',
        content: '开启设备失败。如果设备已开启供电，您可以正常使用。为您带来不顺畅的开启体验我们深感抱歉!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {

            wx.redirectTo({
              url: '../index/index',
            })
          }
        }
      })
    }, 30000);
    var time = options.id
    console.log(time)
    this.setData({
      time: options.id
    }) 
    wx.login({
      success: function (res) {
        var code = res['code'];
        console.log(time)
        //发起请求
        wx.request({
          url: 'https://t.cd1a.cn/Home/Command/start', //接口地址
          data: {
            "time": time,
            "code": code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
            var cj = res.data.cj
            var user_status = res.data.user_status
            var recharge_vip = res.data.vip
            clearTimeout(j_zm)

            
            if (user_status == 2) {
              console.log('11111')
              wx.redirectTo({
                url: '../count_down/count_down'
              })
            } else if (user_status == 3) {
              console.log('22222')
              wx.redirectTo({
                url: '../succ/succ'
              })
            } else {
                //用户处于非充电或结算状态
              if (cj == 0) {
                if (recharge_vip == 1){
                  wx.showModal({
                    title: '提示',
                    content: '您的余额不足，请充值!',
                    confirmText: '去充值',
                    success: function (res) {
                      console.log(res)
                      if (res.confirm) {
                        wx.redirectTo({
                          url: '../recharge/recharge'

                        })


                      } else if (res.cancel) {
                        content('用户点击取消')
                      }
                    }
                  })
                }else{
                  wx.showModal({
                    title: '提示',
                    content: '您的余额不足，请充值!',
                    confirmText: '去充值',
                    success: function (res) {
                      console.log(res)
                      if (res.confirm) {
                        wx.redirectTo({
                          url: '../recharge/recharge'

                        })


                      } else if (res.cancel) {
                        content('用户点击取消')
                      }
                    }
                  })
                }
                

              } else {
                //弹出窗口
                //发送成功 发起请求
                wx.request({
                  url: 'https://t.cd1a.cn/Home/Command/end', //接口地址
                  data: {
                    "cj": cj
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    //发送成功
                    console.log(res)
                    var status = res.data.status
                    console.log(status)
                    if (status == 1) {
                      // if (time == 0) {
                      //   wx.redirectTo({
                      //     url: '../timing/timing',
                      //   })
                      // } else {
                        wx.redirectTo({
                          url: '../count_down/count_down',
                        })
                      // }

                    }
                  }
                })
                //结束
              }
            }
          }

        })
        //结束
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