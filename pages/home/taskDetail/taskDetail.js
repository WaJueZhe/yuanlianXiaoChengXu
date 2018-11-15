// pages/home/taskDetail/taskDetail.js
import api from '../../../api.js';
import common from '../../../utils/common.js'
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    taskid: "",
    pageNo: 1,
    pageSize: 20,
    taskList: [],
    statusPage: {},
    tokenid: "",
    latitude:'',
    longitude:''
  },
  //  拒绝接单事件
  noTask() {
    wx.showModal({
      title: '提示',
      content: '你要拒绝该任务单？',
      success: (res) => {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: `${api.refuseTask}?taskId=${this.data.taskid}`,
            method: "POST",
            header: { tokenId: this.data.tokenid },
            success: res => {
              if (res.data.success) {
                wx.showToast({
                  title: '任务已拒绝',
                  icon: 'none',
                  duration: 1500,
                  complete:function(){
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '../me/me?active=0'
                      })
                    }, 1500)
                  }
                })

              } else {
                wx.showToast({
                  title: '拒绝失败',
                  icon: 'none',
                  duration: 1500
                })
              }
            }
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },
  // 接单事件
  yesTask() {
    wx.request({
      url: `${api.confirmTask}?taskId=${this.data.taskid}`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        if (res.data.success) {
          wx.showToast({
            title: '接单成功',
            icon: 'success',
            duration: 2000,
            complete: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '../me/me?active=1'
                })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: '接单失败',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },

  //默认渲染事件
  gettaskList() {
    var that = this;
    wx.request({
      url: `${api.loadStopList}?taskId=${this.data.taskid}&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => { 
        if (res.data.success) {
          let cordList = res.data.data.result.records;
          let num = 1;
          console.log("stopList:")
          console.log(cordList)
 
          // 拓展,修改数据对象
          for (var i = 0; i < cordList.length; i++) {
            cordList[i].length = cordList.length;
            cordList[i].number = num++;
            cordList[i].totalUnits = cordList[i].totalUnits;
            cordList[i].totalVolume = cordList[i].totalVolume;
            cordList[i].totalWeight = cordList[i].totalWeight;
            // 计算两点之间的距离
            cordList[i].alldistance = common.GetDistance(that.data.longitude,that.data.latitude,  cordList[i].longitudeX, cordList[i].lantitudeY)
          }
          this.setData({
            taskList: cordList,
            statusPage: res.data.data.bsTask
          })
        }
      }
    })
},
  
//获取位置信息
getLocation(){
  var that = this;
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      that.setData(
        {
          latitude: res.latitude,
          longitude: res.longitude
        }
      )
      that.gettaskList();
    },
    fail: function (res) {
      console.log(res);
    }
  })
},
  // 拒绝接单事件
  refuseTask(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
    // console.log(options)
    this.setData({
      taskid: options.taskid,
      tokenid: wx.getStorageSync('tokenid')
    });
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
    this.gettaskList();
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