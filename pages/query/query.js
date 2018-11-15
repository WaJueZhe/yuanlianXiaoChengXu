// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serchCode: ""
  },
  // 修改文本框的内容
  makeInput(e) {
    // console.log(e.detail.value)
    this.setData({
      serchCode: e.detail.value
    })
  },
  // 点击查询运单
  serchTask(e) {
    console.log(this.data.serchCode)
    // let value = this.data.serchCode;
    wx.navigateTo({
      url: `queryDetail/queryDetail?serchCode=${this.data.serchCode}`,
    })
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