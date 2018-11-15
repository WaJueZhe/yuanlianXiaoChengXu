// pages/c_pages/spliceSet/spliceSet.js
import api from '../../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userType:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName: options.userName,
      userType: options.userType
    })
  },

  setUser(e) {
    this.setData({
      userName: e.detail.value
    })
    console.log(this.data.userName)
  },
  /**
   * 保存信息
   */
  save(){
    if (this.data.userType =="customer"){
      this.saveCuser()
    } else if (this.data.userType == "pcuser"){

    }else{
      this.saveDriver()
    }
  },

  /**
   * 司机保存姓名
   */
  saveDriver() {
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
   * cuser保存
   */
  saveCuser() {
    wx.request({
      url: `${api.baseurl}/sysCUser/updateCUserInfh5`,
      method: "POST",
      data: { 'userName': this.data.userName},
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