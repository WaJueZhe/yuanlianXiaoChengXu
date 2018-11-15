// pages/c_pages/receive/receiveCom/receiveCom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    'task_criteriaStr':{
      type: Object,
      value: "" 
    },
    pageNo: 1,
    list : [],
    noData : ""
  },

  upper: function (e) {
    console.log('上拉加载')
  },
  lower: function (e) {
    console.log('下拉刷新')
  },
  // scroll: function (e) {
  //   console.log('滚动')
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('卡片加载')
    console.log(this.data.task_criteriaStr)
    showView: (options.showView == "true" ? true : false)
  },

  onChangeShowState() {
    this.setData({
      showView: true
    })
  },

  //接受组件传过来的方法
  _cancelEvent() {
    this.setData({
      showView: false
    })
  },


  query() {
    if ((!this.that.task_criteriaStr) || (!this.that.task_criteriaStr.signerTel)){
      return
    }
      

    this.data.pageNo = 1;
    this.data.list = [];
    this.data.noData = "";
    let that =this
    wx.request({
      url: `${api.baseurl}/shipment/findListBydReceiverMob`,
      data: p,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      success: res => {
        console.log(res)
        if (res.data.success) {
          that.data.list = that.data.list.concat(res.data.data.shipments.records);
          that.data.pages = res.data.data.shipments.pages;
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
    console.log(123123132)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(66666666666)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})