//index.js

Page({
  
  data: {
    Height: 0,
    scale: 17,
    latitude: "",
    longitude: "",
    ind_url:"https://www.ihuanmei.com/image/scan_hd.png",
    markers: [],
    controls: []
    ,


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
              "str": str
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
                if (cmd_type=='dingshi'){
                  wx.redirectTo({
                    url: '../count_down/count_down'
                  })
                } else if (cmd_type=='jishi'){
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
          })

        }
      })
    }

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            // _height: res.windowHeight * 0.24,
            Height: res.windowHeight
          }

        })



      }
    })



    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        var dt = res
        wx.request({
          url: 'https://t.cd1a.cn/index.php/Home/Map/coordinate', //仅为示例，并非真实的接口地址
          data: {
            x: '',
            y: ''
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            var map = res.data.map
            console.log(map)
            that.setData({
              latitude: dt.latitude,
              longitude: dt.longitude,
              markers: map

            })
          }
        })

      }

    })




    
    wx.login({
      success: function (res) {
        var code = res['code'];
        wx.getSystemInfo({
          success: function (res) {
            var t = res.windowHeight * 0.80
            var l = res.windowWidth * 0.03
            var l_my = res.windowWidth * 0.75
            var t_my = res.windowHeight * 0.33
            var l_sm = res.windowWidth * 0.89
            var t_sm = res.windowHeight * 0.18
            wx.request({
              url: 'https://t.cd1a.cn/Home/ScanCode/', //仅为示例，并非真实的接口地址
              data: {
                code:code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res)
                var loe_id = res.data.loe_id
                var loe = res.data.loe
                that.setData({
                  Height: 0,
                  scale: 17,
                  latitude: "",
                  longitude: "",
                  markers: [],
                  controls: [{
                    id: 1,
                    iconPath: '../../images/lg_charge.png',
                    position: {
                      left: 320,
                      top: 100 - 50,
                      width: 20,
                      height: 20
                    },
                    clickable: true
                  },
                  {
                    id: 2,
                    iconPath: '../../images/lg_charge.png',
                    position: {
                      left: 340,
                      top: 100 - 50,
                      width: 20,
                      height: 20
                    },
                    clickable: true
                  }
                  ],
                  controls: [{
                    // 钱包控件
                    id: loe_id,
                    iconPath: loe,
                    position: {
                      left: l_my,
                      top: t,
                      width: 100,
                      height: 60
                    },
                    clickable: true
                  }, {
                    //二维码控件
                    id: 3,
                    iconPath: "../../images/sm_charge.png",

                    position: {
                      left: t_sm,
                      top: l_sm,
                      width: 186,
                      height: 186
                    },
                    clickable: true
                  }]
                })


              }
            })
          }
        })


      }
    })
    
        

    
    

  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },



  //点击缩放按钮动态请求数据
  controltap(e) {
    // 二维码控件处理
    if (e.controlId == 3) {
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
                  if(user == 'null'){
                    wx.showModal({
                      title: '提示',
                      content: '请您删除小程序，允许我们授权。\n删除小程序\n安卓手机长按点击删除\niOS像左滑动点击删除)\n重新进入授权点击允许。',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })  
                  }else{
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
    
    };
    //充值控件处理
    if (e.controlId == 2) {
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
                    wx.showModal({
                      title: '提示',
                      content: '请您删除小程序，允许我们授权。\n删除小程序\n安卓手机长按点击删除\niOS向左滑动点击删除\n重新进入授权点击允许。',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
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
            if(user == 'null'){
              wx.showModal({
                title: '提示',
                content: '请允许我们小程序的获取权限，我们只会获取您的头像和您的微信名称！',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })  
            }else{
              if (user_status == 2) {
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
  }
  




  

})
