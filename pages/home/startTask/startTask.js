// pages/home/startTask/startTask.js
import api from '../../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stopId: "",
    username: "",
    usercode: "",
    longitudeX: "",
    latitudeY: "",
    driverinf: "",
    unitList: [],
    stopInf: "",
    taskInf: "",
    resourceurl:'',

    fahuo:true
  },

  init(){
    wx.request({
      url: `${api.baseurl}/taskStop/sign/findTaskStopCardInfo?stopId=${this.data.stopId}`,
      method: "POST",
      success: res => {
        console.log(res)
        this.setData({
          driverinf :res.data.data.driver,
          stopInf : res.data.data.stopInf,
          unitList : res.data.data.unitList,
          taskInf : res.data.data.taskInf,
          username : res.data.data.stopInf.contactPerson
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stopId: options.stopId,
      resourceurl: api.resourceurl
    })
    if (!this.data.stopId){
      return;
    }
  },
  // 默认渲染事件
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示   
   */
  onShow: function () {
    this.init()
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