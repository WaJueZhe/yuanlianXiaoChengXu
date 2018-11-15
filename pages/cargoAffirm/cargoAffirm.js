// pages/cargoAffirm/cargoAffirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView:false,
  },

  amend(){
    this.setData({
      showView: true
    })
  },

  _cancelEvent(e){
    console.log(e.detail)//这是组件修改后的数量
    this.setData({
      showView: false
    })
  },

  _toggle(e) {
    this.setData({
      showView: false
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