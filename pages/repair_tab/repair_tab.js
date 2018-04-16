// Page({
//   data: {
//     items: [
//       { name: 'bright', value_name: '插排指示灯不亮', value: '插排指示灯不亮', checked: 'true'  },
//       { name: 'bright',value_name: '插排指示灯正常插排没电', value: '插排指示灯正常插排没电'},
//       { name: 'bright',value_name: '其他', value: '其他' },
//     ],
//     height: 20,
//     focus: false
//   },
//   radioChange: function (e) {
//     console.log('radio发生change事件，携带value值为：', e.detail.value)
//   },
//   bindButtonTap: function () {
//     this.setData({
//       focus: true
//     })
//   },
//   bindTextAreaBlur: function (e) {
//     console.log(e.detail.value)
//   },
//   bindFormSubmit: function (e) {
    
//     wx.login({
//       success: function (res) {
//         var code = res['code'];
//         var that = this
//         wx.request({
//           url: 'https://t.cd1a.cn/index.php/Hme/Port/Repair?code=' + code,
//           data: {
//             'bright': e.detail.value.input,
//             'formId': e.detail.formId,

//           },
//           method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//           // header: {}, // 设置请求的 header
//           success: function (res) {
//             // success
//             wx.redirectTo({ url: '../index/index' })
//             console.log(e);
//           },
//           fail: function (err) {
//             // fail
//             console.log('失败' + err);
//           },
//           complete: function () {
//             // complete
//           }
//         })
//       }
        
//     })

    
//   }
// })
var app = getApp();
Page({
  data: {
    // text:"这是一个页面"
    array: ["中国", "美国", "巴西", "日本"],
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    index: 0
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  formSubmit: function (e) {
    console.log(e)
    var formData = e.detail.value;
    wx.login({
      success: function (res) {
        var code = res['code'];
        var that = this
        wx.request({
          url: 'https://t.cd1a.cn/index.php/Home/Port/Repair?code=' + code,
          data: formData,
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            wx.redirectTo({ url: '../index/index'})
          
          }
        })
      }
    })
  },
  formReset: function () {
    
  }
})
