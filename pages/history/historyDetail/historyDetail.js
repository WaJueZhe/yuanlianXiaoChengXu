// pages/history/historyDetail/historyDetail.js
import api from '../../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskid: "",
    pageNo: 1,
    pageSize: 1000,
    historyList: [],
    historyStats: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskid: options.taskid
    })

    this.getHistoryDetail()
  },

  // 默认渲染事件
  getHistoryDetail() {
    wx.request({
      url: `${api.loadStopList}?taskId=${this.data.taskid}&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      success: res => {
        if (res.data.success) {
          let num = 1;
          let lists = res.data.data.result.records;
          for (var i = 0; i < lists.length; i++) {
            lists[i].number = num++;
            lists[i].totalUnits = lists[i].totalUnits
            lists[i].totalVolume = lists[i].totalVolume
            lists[i].totalWeight = lists[i].totalWeight
            lists[i].historylength = lists.length
          }
          this.setData({
            historyStats: res.data.data.bsTask,
            historyList: lists
          })
        }
      }
    })
  },

  //拨打电话
  callPhone(e) {
    let phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
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