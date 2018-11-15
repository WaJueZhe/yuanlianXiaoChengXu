// pages/set/spliceSet/spliceSet.js
import api from '../../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName: options.userName
    })
  },

  setUser(e) {
    this.setData({
      userName: e.detail.value
    })
    console.log(this.data.userName)
  },

  saveUser() {
    wx.request({
      url: `${api.baseurl}/driver/updatedriverInf?driverName=${this.data.userName}`,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      success: res => {
        if (res.data.success) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '保存失败请重试',
            icon: 'none',
            duration: 2000
          })
        }
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