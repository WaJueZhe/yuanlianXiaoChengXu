// pages/query/queryDetail/queryDetail.js
import api from '../../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intValue: "", //输入框中的默认值
    tokenid: "",
    taskList: [],
    pageNo: 1,
    pageSize: 5,
    pages: 0,
    nomore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      intValue: options.serchCode
    })

    //获取tokenid
    this.setData({
      tokenid: wx.getStorageSync('tokenid')
    })

    this.getNewTask(true)
  },

  // 双向数据绑定
  makeValue(e) {
    this.setData({
      intValue: e.detail.value
    })
  },
  getNewTask(isinit) {
    if (isinit) {
      this.setData({
        pageNo: 1,
        pageSize: 5,
        taskList: [],
        nomore: false
      })
    }
    wx.request({
      url: `${api.baseurl}/task/searchTask?taskType=0&searchStr=${this.data.intValue}&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        console.log(res);
        if (res.data.code == 200) {
          let tList = res.data.data.result.records;
          if (isinit) {
            console.log("初始化")
            this.setData({
              taskList: tList,
              pages: res.data.data.result.pages
            })
            if(tList==null||tList==[]||tList.length==0){
              this.setData({
                nomore:true
              })
            }
          } else {
            this.setData({
              taskList: this.data.taskList.concat(tList),
              pages: res.data.data.result.pages
            })
          }
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
    var nowTimestamp = new Date().getTime();
    if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
      return;
    }
    this.data.pageNo += 1;
    this.data.currentTimestamp = nowTimestamp;
    console.log(this.data.pageNo);
    if (this.data.pageNo > this.data.pages) {
      this.setData({
        nomore: true
      })
      this.data.nomore = true;
      return;
    }
    this.getNewTask(false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})