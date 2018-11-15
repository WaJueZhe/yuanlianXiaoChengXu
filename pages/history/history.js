// pages/history/history.js
import api from '../../api.js'
import common from '../../utils/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    pageSize: 5,
    nomore: false,
    pages: 0,
    historyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getHistoryCard()
  },
  // 默认渲染事件
  getHistoryCard() {
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: `${api.loadTaskList}?taskType=10&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      success: res => {
        wx.hideLoading();
        if (res.data.code == 200) {
          let histList = res.data.data.result.records
          this.setData({
            historyList: this.data.historyList.concat(histList),
            pages: res.data.data.result.pages
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
    this.getHistoryCard()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("加载更多...");
    var nowTimestamp = new Date().getTime();
    if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
      return;
    }
    this.data.pageNo += 1;
    this.data.currentTimestamp = nowTimestamp;
    console.log(this.data.pageNo);
    console.log(this.data.pages);
    if (this.data.pageNo > this.data.pages) {
      this.setData({
        nomore: true
      });
      return;
    }else{
      this.getHistoryCard();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})