/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */
/* 毫秒级倒计时 */

var copyright = "©天天充电  4006888919"
Page({
  data: {
    clock: '',
    copyright: copyright,
    total_micro_second:'3600',
    avatarUrl:'',
    avatarUrl_vip:'',
    nickName:''
    
  },
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        wx.request({
          url: 'https://t.cd1a.cn/Home/time/countdown', //仅为示例，并非真实的接口地址
          data: {
            'code':code

            
          },
           header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
            var total_micro_second = res.data.time_chuo
            var avatarUrl = res.data.avatarUrl
            var avatarUrl_vip = res.data.avatarUrl_vip
            var nickName = res.data.nickName
            function count_down(that) {
              // 渲染倒计时时钟
              that.setData({
                clock: date_format(total_micro_second),
                avatarUrl: avatarUrl,
                avatarUrl_vip: avatarUrl_vip,
                nickName: nickName
              });

              if (total_micro_second <= 0) {
                that.setData({
                  clock:'结束'
                })
                wx.redirectTo({
                  // url: '../index/index',
                })
                 
                // timeout则跳出递归
                return;
              }
              setTimeout(function () {
                // 放在最后--
                total_micro_second -= 1000;
                count_down(that);
              }, 1000)
            }

            // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
            function date_format(micro_second) {
              // 秒数
              var second = Math.floor(micro_second / 1000);
              // 小时位
              var hr = Math.floor(second / 3600);
              // 分钟位
              var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
              // 秒位
              var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
              // 毫秒位，保留2位

              if (hr < 10) {
                return '0' + hr + ":" + min + ":" + sec + " ";
              } else {
                return hr + ":" + min + ":" + sec + " ";
              }

            }

            // 位数不足补零
            function fill_zero_prefix(num) {
              return num < 10 ? "0" + num : num
            }


            count_down(that);

          }
        })

        }  
      })
    

   
    
  },
  fault:function(){
    wx.navigateTo({
      url: '../repair_tab/repair_tab',
    })
  }
});
