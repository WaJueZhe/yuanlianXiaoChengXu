// pages/c_pages/createHistoryDetail/createHistoryDetail.js
import api from '../../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: '',
    pages: 0,
    pageNo: 1,
    pageSize: 1000,
    nomore:false,

    list: [],
    bsTask: {},
    deliverPlanDate: "",
    unloadPlanDate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskId: options.taskid
    })
    console.log(this.data.taskId)
  },

  init(){
    wx.request({
      url: `${api.baseurl}/taskStop/findTaskStopByTaskId?taskId=${this.data.taskId}&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          this.setData({
            list: res.data.data.result.records,
            pages: res.data.data.result.pages,
            bsTask: res.data.data.bsTask,
            deliverPlanDate: res.data.data.bsTask.deliverPlanDate.slice(5),
            unloadPlanDate: res.data.data.bsTask.unloadPlanDate.slice(5),
          })
          console.log(this.data.pages)
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
    this.init();
    // if (this.data.pageNo >= this.data.pages) {
    //   this.setData({
    //     nomore: true
    //   })
    //   return;
    // }
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
    wx.showLoading({
      title: '加载中...',
      duration: 3000
    });
    let that = this;
    setTimeout(function () {
      that.setData({
        pageNo: 1,
        list: []
      })
      that.init();
    }, 3000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNo: this.data.pageNo + 1,
    })
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    });
    let that = this;
    setTimeout(function () {
      if (that.data.pageNo >= that.data.pages) {
        that.setData({
          nomore: true
        })
        return;
      }
      that.init();
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})