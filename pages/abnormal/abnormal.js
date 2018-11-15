// pages/abnormal/abnormal.js
import api from '../../api.js';
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
    resourceurl: '',

    isShow: true,
    ActiveShow: false,
    infoBox: true,
    exception:true,
    informationIndex:0,
    showBoxIndex: null,

    haveUnconf:false,
    totalAct:0,
    totalHS : 0,
    totalHC : 0,
    totalQT : 0,
  },

  init() {
    let stopId = {
      stopId: this.data.stopId
    }
    wx.request({
      url: `${api.baseurl}/taskStop/stopExceptionInfo`,
      method: "POST",
      data: stopId,
      success: res => {
        console.log(res)
        if(res.data.code == 200){
          this.setData({
            stopInf: res.data.data.ret,
          })
        }
        if (this.data.stopInf.detailList.length > 0) {
          // let haveUnconf = false;
          this.setData({
            haveUnconf:false
          })
          for (let i = 0; i < this.data.stopInf.detailList.length; i++) {

            let actList = this.data.stopInf.detailList[i].actUnitDetailList;
            console.log(actList)
            for (let j = 0; j < actList.length; j++) {
              this.setData({
                totalAct: parseInt(this.data.totalAct) + parseInt(actList[j].recvActUnits)
              })
            }
            this.data.stopInf.detailList[i].totalAct = this.data.totalAct;
            
            let expList = this.data.stopInf.detailList[i].detailList;
            for (let j = 0; j < expList.length; j++) {
              if (expList[j].exceptionType == 1) {
                this.setData({
                  totalHS: parseInt(this.data.totalHS) + parseInt(expList[j].quantity)
                })
              } else if (expList[j].exceptionType == 2) {
                this.setData({
                  totalHC: parseInt(this.data.totalHC) + parseInt(expList[j].quantity)
                })
              } else {
                this.setData({
                  totalQT: parseInt(this.data.totalQT) + parseInt(expList[j].quantity)
                })
              }
            }
            this.data.stopInf.detailList[i].totalHS = this.data.totalHS;
            this.data.stopInf.detailList[i].totalHC = this.data.totalHC;
            this.data.stopInf.detailList[i].totalQT = this.data.totalQT;

            

            //判断如果没有异常数据直接返回
            let item = this.data.stopInf.detailList[i];
            if (item.confExp > 0 || item.confNumExp > 0 || item.unConfExp > 0 || item.unConfNumExp > 0) {
              this.setData({
                haveUnconf:true
              })
            }
            if (!this.data.haveUnconf) {
              wx.showModal({
                title: '提示',
                content: '无待确认数据',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateBack({
                      url:'../home/checkDetail/checkDetail'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
            this.setData({
              stopInf: res.data.data.ret,
            })
          }
        }
      }
    })
  },

  statusItem(e) {
    this.setData({
      informationIndex: e.currentTarget.dataset.index,
      infoBox: !this.data.infoBox
    })
    if (this.data.showBoxIndex != '' && this.data.showBoxIndex != null) {
      this.setData({
        showBoxIndex : null
      })
    } else {
      this.setData({
        showBoxIndex: e.currentTarget.dataset.index + 1
      })
    }
  },

  statusItem2(){
    this.setData({
      isShow: !this.data.isShow
    })
  },

  statusItem3() {
    this.setData({
      ActiveShow: !this.data.ActiveShow
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
    if (!this.data.stopId) {
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