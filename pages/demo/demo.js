// pages/demo/demo.js
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
wx.getSystemInfo({
  success: function (res) {
    canvasw = res.screenWidth;//设备宽度
    canvash = 300;
  }
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('canvas', this);
    context.beginPath()
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');

  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  //开始绘制
  canvasStart: function (event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
  },
  // 手指开始移动
  canvasMove: function (event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
    };
    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);
    context.stroke();
    context.draw(true);
  },
  // 手指离开屏幕
  canvasEnd: function (event) {
    isButtonDown = false;
  },
  // 清除画布
  cleardraw: function () {
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },
  // 保存图片
  getimg: function () {
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false;
    };
    var that = this;
    //生成图片 ----> 图片截取失败
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      fileType: 'jpg',
      destWidth: 100,
      destHeight: 100,
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
        console.log('******成功截取******')
        console.log(res)
        console.log(res.tempFilePath)
      },
      fail: function () {
        console.log('********失败截取*********')
      }
    }, this)
    // context.draw(true, () => {
    //   wx.canvasToTempFilePath({
    //     canvasId: 'canvas',
    //     fileType: 'png',
    //     quality: 0.2,
    //     success: function () {
    //       console.log('成功获取')
    //     },
    //     fail: function (res) {
    //       console.log(res)
    //       console.log('失败截取')
    //     }
    //   })

    // })

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