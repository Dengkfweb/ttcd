


var copyright = "©天天充电  4006888919"
Page({
  data: {
    clock: '',
    copyright: copyright,
    HeadPortrait: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/47ba38b9ead76b72962cb894f1a54102_75_75.jpg',
    seconds: 0,
    time: '00:00:00',
    cost: 0,
    time_chuo:''
    
  },
  onLoad: function () {
    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        var h = 'https://t.cd1a.cn/Home/time/timing?code' + code
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
            var HeadPortrait = res.data.avatarUrl
            var nickName = res.data.nickName
            var id = res.data.id
            timing(res)
            function timing(res) {
              var seconds = res.data.seconds
              
              if (seconds > 432000000000) {
                wx.redirectTo({
                  url: '../index/index',
                })
                return;
                
              }
              setTimeout(function () {
                that.setData({
                  seconds: seconds + 1
                });
                timing(that);
              }
                , 1000)
              formatSeconds(that)
            }
            function formatSeconds(that) {
              var mins = 0, hours = 0, seconds = that.data.seconds, time = ''
              if (seconds < 60) {

              } else if (seconds < 3600) {
                mins = parseInt(seconds / 60)
                seconds = seconds % 60
              } else {
                mins = parseInt(seconds / 60)
                seconds = seconds % 60
                hours = parseInt(mins / 60)
                mins = mins % 60
              }
              that.setData({
                time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds)
              });
            }
            function formatTime(num) {
              if (num < 10)
                return '0' + num
              else
                return num + ''
            }
            function charging(that) {
              if (that.data.seconds < 600) {
                cost = 1
              }
            }
            that.setData({
              'HeadPortrait': HeadPortrait,
              'nickName': nickName,
              'id':id
            })
          }
        })
      }
    })


  },
  over_charge: function (options){
    console.log(options)
    var id = options.currentTarget.id
    console.log(id)
    wx.login({
      success: function (res) {
        var code = res['code'];
        console.log(res)
        console.log(id)
        wx.showModal({
          title: '提示',
          content: '您确定结束充电？',
          confirmText: '确定',
          success: function (res) {
            console.log(code)
            if (res.confirm) {
              wx.request({
                url: 'https://t.cd1a.cn/Home/Time/Full?code='+code+'&id='+id, //仅为示例，并非真实的接口地址
                data: {
                  'code':code,
                  'id':id
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  wx.redirectTo({
                    url: '../succ/succ',
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        }) 
      }
    })
  }
});