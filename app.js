//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: function (res) {
        var code = res['code'];
        //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.getUserInfo({
          success: function (info) {

            var rawData = info['rawData'];
            var jsonString = rawData;
            var jsObject = JSON.parse(jsonString);    //转换为json对象
            console.log(jsObject)

            var nickName = jsObject.nickName
            var gender = jsObject.gender
            var language = jsObject.language
            var city = jsObject.city
            var province = jsObject.province
            var country = jsObject.country
            var avatarUrl = jsObject.avatarUrl
            var signature = info['signature'];
            var encryptData = info['encryptData'];
            var encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData...坑啊
            var iv = info['iv'];
            //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
            wx.request({
              url: 'https://t.cd1a.cn/Home/OnLogin',
              data: {
                "code": code,
                "nickName": nickName,
                "gender": gender,
                "language": language,
                "city": city,
                "province": province,
                "country": country,
                "avatarUrl": avatarUrl,
                "rawData": rawData,
                "signature": signature,
                "encryptData": encryptData,
                'iv': iv,
                'encryptedData': encryptedData
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode != 200) {
                  wx.showModal({
                    title: '登录失败'
                  });
                } else {

                }
                typeof func == "function" && func(res.data);
              }
            });
          },
          fail:function(){
            wx.redirectTo({ url: '../webview/webview' })
          }
        });
        
      }
    });
  }
})

