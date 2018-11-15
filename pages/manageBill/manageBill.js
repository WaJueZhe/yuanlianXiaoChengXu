// pages/manageBill/manageBill.js
import api from '../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    pageSize: 5,
    nomore: false,
    pages: 0,
    allWill: [],
    showFlag: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getwayBill()
  },

  // 默认渲染事件
  getwayBill(e) {
    if (e) {
      this.setData({
        showFlag: e.target.id,
        nomore: false,
        allWill: [],
        pageNo: 1,
        pages: 0
      })
    }

    this.init();
  },

  // 未签收
  notWill(e) {
    this.setData({
      showFlag: e.target.id,
      nomore: false,
      allWill: [],
      pageNo: 1,
      pages: 0
    });
    this.init();
  },

  //已签收
  yesWill(e) {
    this.setData({
      showFlag: e.target.id,
      nomore: false,
      allWill:[],
      pageNo:1,
      pages:0
    });
    this.init();
  },

  /**
   * 加载数据
   */
  init(){
    var status = '1';
    
    if (this.data.showFlag=='1'){
      status = '-1'
    }
    if (this.data.showFlag == '2') {
      status = '0'
    }
    if (this.data.showFlag == '3') {
      status = '1'
    }
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: `${api.baseurl}/shipment/findShipmentByDriverId?pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}&status=${status}`,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      success: res => {
        wx.hideLoading();
        if (res.data.success) {
          this.setData({
            allWill: this.data.allWill.concat(res.data.data.shipments.records),
            pages: res.data.data.shipments.pages
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
    this.setData({
      nomore: false,
      allWill: [],
      pageNo: 1,
      pages: 0
    });
    this.init();
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
      // wx.showToast({
      //   title: '没有更多数据了',
      //   icon:'none',
      //   duration: 3000
      // });
      this.setData({
        nomore: true
      });
      return;
    } else {
      this.init();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})