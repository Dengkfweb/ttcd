//index.js

Page({

  data: {
   


  },

  onLoad: function () {
    var that = this
    var scene = decodeURIComponent(that.options.q)
    var str = scene
    var index = str .lastIndexOf("\/");
    str = str .substring(index + 1, str .length);
    console.log(str)
    if (str !== 'undefined') {
      wx.login({
        success: function (res) {
          var code = res['code'];
          wx.request({
            url: 'https://t.cd1a.cn/Home/ScanCode/',
            data: {
              "code": code,
              "str": str,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)

              var vip = res.data.vip
              var scan_status = res.data.scan_status
              var user_status = res.data.user_status
              var cmd_type = res.data.cmd_type



              if (user_status == 2) {
                if (cmd_type == 'dingshi') {
                  wx.redirectTo({
                    url: '../count_down/count_down'
                  })
                } else if (cmd_type == 'jishi') {
                  wx.redirectTo({
                    url: '../timing/timing'
                  })
                }
                console.log('11111')

              } else if (user_status == 3) {
                console.log('22222')
                wx.redirectTo({
                  url: '../succ/succ'
                })
              } else {
                //用户处于非充电或结算状态
                if (scan_status == 2) {
                  //提示设备占用
                  wx.showModal({
                    title: '提示',
                    content: '拉倒吧！！此充电口已被占用，请尝试其他!!',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                } else {
                  console.log('55555')
                  if (vip == 2) {
                 
                          wx.redirectTo({
                            url: '../scanvip/scanvip'
                          })
                  
                    
                  } else if (vip == 1) {
                    console.log('66666')
                   
                          wx.redirectTo({
                            url: '../scan/scan'
                          })
                   
                  } else {
                    console.log('88888')
                  }
                }
              }

            }
          })

        }
      })
    }

    



   





    






  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },



  //点击缩放按钮动态请求数据
  controltap(e) {
    // 二维码控件处理
    if (e.controlId == 3) {
      

    };
    //充值控件处理
    if (e.controlId == 2) {
      











    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 扫码开锁弹出层显示隐藏
  confirm: function () {
    this.setData({
      lockhidden: true
    });


  },
  onReady: function () {
    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        console.log(code)
        wx.request({
          url: 'https://t.cd1a.cn/Home/ScanCode/', //仅为示例，并非真实的接口地址
          data: {
            'code': code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
            var user_status = res.data.user_status
            var cmd_type = res.data.cmd_type
            var user = res.data.user
            var ind_url = res.data.ind_url
            that.setData({
              'ind_url': ind_url
            })
            if (user == 'null') {
              console.log(0)
            } else {
              if (user_status == 2) {
                console.log('tiaozhuanshijian')
                if (cmd_type == 'dingshi') {
                  wx.redirectTo({
                    url: '../count_down/count_down'
                  })
                }
              }
            }
          }
        })
      }
    })
  },
  personal:function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000,
      complete: function () {
        wx.login({
          success: function (res) {
            var code = res['code'];
            console.log(code)
            wx.request({
              url: 'https://t.cd1a.cn/Home/ScanCode/', //仅为示例，并非真实的接口地址
              data: {
                'code': code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res)
                var user = res.data.user
                var vip = res.data.vip
                if (user == 'null') {
                  wx.navigateTo({
                    url: '../webview/webview'
                  })
                } else {


                  if (vip == '2') {
                    wx.navigateTo({
                      url: '../personal_center_vip/personal_center_vip'
                    })
                  } else {
                    wx.navigateTo({
                      url: '../personal_center/personal_center'
                    })
                  }
                }

              }
            })
          }
        })
      }
    })

  },
scan_code:function(){
  wx.scanCode({
    success: (res) => {
      console.log(res)
      var scene = res.result
      var str = scene
      var index = str .lastIndexOf("\/");
      str = str .substring(index + 1, str .length);
      wx.login({
        success: function (res) {
          var code = res['code'];
          wx.request({
            url: 'https://t.cd1a.cn/Home/ScanCode/',
            data: {
              "code": code,
              "str": str,
            },

            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)
              var vip = res.data.vip
              var scan_status = res.data.scan_status
              var user_status = res.data.user_status
              var cmd_type = res.data.cmd_type
              var user = res.data.user
              if (user == 'null') {
                wx.navigateTo({
                  url: '../webview/webview'
                }) 
              } else {
                if (user_status == 2) {
                  if (cmd_type == 'dingshi') {
                    wx.redirectTo({
                      url: '../count_down/count_down'
                    })
                  } else if (cmd_type == 'jishi') {
                    wx.redirectTo({
                      url: '../timing/timing'
                    })
                  }
                  console.log('11111')

                } else if (user_status == 3) {
                  console.log('22222')
                  wx.redirectTo({
                    url: '../succ/succ'
                  })
                } else {
                  //用户处于非充电或结算状态
                  if (scan_status == 2) {
                    //提示设备占用
                    wx.showModal({
                      title: '提示',
                      content: '拉倒吧！！\n此充电口已被占用，请尝试其他!!!',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  } else {
                    console.log('55555')
                    if (vip == 2) {
                      console.log('77777')
                      
                      wx.redirectTo({
                        url: '../scanvip/scanvip'
                      })
                          
                    } else if (vip == 1) {
                      console.log('66666')
                      
                        wx.redirectTo({
                          url: '../scan/scan'
                        })
                          
                         
                    } else {
                      console.log('88888')
                    }
                  }
                }


              }



            }
          })

        }
      })


    },
    fail: (res) => {
      this.setData({
        lockhidden: false
      });
    }
  })
},
agreement: function () {
  wx.navigateTo({
    url: '../agreement/agreement',
  })
}






})
