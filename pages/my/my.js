// pages/my/my.js
import api from '../../api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeGain: 1, //控制战绩切换
    tokenid: "",
    imgSrc: "",
    waybillNum: {
      num: "",
      road: ""
    }, //单量与配送里程
    waybillDay: {
      num: "",
      road: ""
    },    //今日运单
    waybillMounth: {
      num: "",
      road: ""
    },  //本月运单
    userinfo: {}, //用户信息
  },
  clkGains(e) {
    let index = e.target.id
    if (index == 1) {
      this.setData({
        activeGain: 1,
        waybillNum: this.data.waybillDay
      })
    } else {
      this.setData({
        activeGain: 2,
        waybillNum: this.data.waybillMounth
      })
    }
  },
  // 默认渲染事件
  getMyadmin() {
    wx.request({
      url: `${api.baseurl}/driver/count`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        if (res.data.success) {
          this.setData({
            userinfo: res.data.data.driver,
            waybillDay: {
              num: res.data.data.todaycount,
              road: res.data.data.todayDistance
            },
            waybillMounth: {
              num: res.data.data.monthcount,
              road: res.data.data.monthDistance
            },
            waybillNum: {
              num: res.data.data.todaycount,
              road: res.data.data.todayDistance
            },
            imgSrc: `${api.resourceurl}${res.data.data.driver.driverPic}`
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tokenid: wx.getStorageSync('tokenid')
    })
    this.getMyadmin();
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