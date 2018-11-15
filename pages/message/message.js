var api = require('../../api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTimestamp:0,
    pageNo: 1,
    pageSize: 20,
    nomore: false,
    tokenid: "",
    pages: 0,
    messageList:[],
    StickList:[]
  },

  //列表渲染
  message(){
    wx.showLoading({
      title: '加载中...',
    })
    // console.log(this.data.pageNo)
    wx.request({
      url: `${api.default.messageGl}`,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      data: { isSend: "1", pageNo: this.data.pageNo, pageSize: this.data.pageSize},
      success:res => {
        wx.hideLoading();
        if(res.data.code == 200){
          // console.log(res)
          this.setData({
            messageList: this.data.messageList.concat(res.data.data.generalList.records),
            StickList: this.data.StickList.concat(res.data.data.topList.records)
          })

          if (res.data.data.generalList.records == ''){
            this.setData({
              nomore: true              
            })
          }
         
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   tokenid: wx.getStorageSync('tokenid')
    // })
    this.message()
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var self = this;
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      self.setData({
        pageNo: 1,
        pageSize: 20,
        messageList: [],
        StickList: [],
        nomore:false
      })
      self.message()
    }, 1500);
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    
    var self = this;
    setTimeout(function () {
      self.data.pageNo += 1;
      if (self.data.nomore == true) {
        return false;
      }
      self.message();
      
    }, 2000);
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})