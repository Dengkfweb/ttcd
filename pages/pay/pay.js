// pages/pay/pay.js
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
    console.log(options)+5
    var money = options.id
    this.setData({  
        
      money: options.id
    }) 
    wx.login({
      success: function (res) {
        var code = 'https://t.cd1a.cn/pay/payfee.php?code=' + res['code'] + '&fee=' + money;
        //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.request({
          url: code,//改成你自己的链接
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            var id = res.data.id;
            console.log(res.data.id);
            
            wx.requestPayment({
              'timeStamp': res.data.timeStamp,
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'signType': 'MD5',
              'paySign': res.data.paySign,
              'success': function (res) {
                console.log(res);
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 3000
                })
                wx.login({
                  success: function (res) {
                    console.log(id+'a123')
                    var user = id ;
                    console.log(user)
                    var code = 'https://t.cd1a.cn/Home/Money/pay?id=' + user ;
                    wx.request({
                      url: code,//改成你自己的链接
                      header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      data:{
                        'id': user
                      },
                      method: 'POST',
                      success: function (res) {
                        console.log(res)
                        var vip_1 = res.data.vip
                        if(vip_1 == '1'){
                          wx.redirectTo({
                            url: '../scan/scan'
                          })
                        }else if(vip_1 == '2'){
                          wx.redirectTo({
                            url: '../scanvip/scanvip'
                          })
                        }else{
                          wx.redirectTo({
                            url: '../index/index'
                          })
                        }
                        



                        
                      }
                    })
                  }
                })
              
              },
              'fail': function (res) {
                console.log('fail');
              },
              'complete': function (res) {
                console.log('complete');
              }
            });
          },
          fail: function (res) {
            console.log(res.data)
          }
        });
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