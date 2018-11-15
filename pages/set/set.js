// pages/set/set.js
import api from '../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenid: "",
    driver: {},
    imgSrc: "",
    num:1
  },

  myAccount: function () {
    wx.showToast({
      title: '即将开放',
      icon: 'none',
      duration: 10000
    })

    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tokenid: wx.getStorageSync('tokenid')
    })

    this.getUser()
  },
  // 默认渲染事件
  getUser() {
    wx.request({
      url: `${api.baseurl}/driver/driverInfo`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        wx.stopPullDownRefresh()
        if (res.data.success) {

          let lists = res.data.data.driver;
          console.log(lists)
          this.setData({
            driver: lists,
            imgSrc: api.resourceurl + lists.driverPic
          })
        }
      }
    })
  },

  toSetPage() {
    wx.navigateTo({
      url: 'setup/setup',
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
    this.getUser()
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