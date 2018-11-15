// pages/messageDetail/messageDetail.js
var api = require('../../api.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    tokenid: "",
    article: '',
    title:'',
    sendTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.messageDetail();
  },

  //默认渲染事件
  messageDetail(){
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    wx.request({
      url: `${api.default.messageDetail}`,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      data:{id: that.data.id},
      success: res => {
        wx.hideLoading();
        // console.log(res);
        if(res.data.code ==200){
          this.setData({
            article: res.data.data.result.articleContent,
            title: res.data.data.result.articleTitle,
            sendTime: res.data.data.result.sendDate
          })
          //解析富文格式
          var that = this;
          var temp = WxParse.wxParse('article', 'html', that.data.article, that, 5);
          that.setData({
            article: temp
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