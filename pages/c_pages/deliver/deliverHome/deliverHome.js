var dateUtil = require('../../../../utils/dateUtil.js')
import api from '../../../../api.js'
var Base64 = require('../../../../utils/base64.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    modal: true,
    isShow:true,
    scanUrl:'',
    signerTel: "",
    signerTimeBegin: "2017-01-01",
    signerTimeEnd: "2019-12-01",
    searchKey: "",
    isInTransit: "",
    isSignedOK: "",
    nonSignedQty: 0,
    completedQty: 0,
    unCompletedQty: 0,

    acticeIndex: 1
  },

  querySum(e) {
    this.setData({
      num: e.target.id,
      modal: true
    })
  },

  more() {
    this.setData({
      modal: (!this.data.modal)
    })
  },

  querySum(e) {
    this.setData({
      num: e.target.id,
      modal: true
    })
    this.clearData()
    this.loadCount(e.target.id)
  },

  clearData(){
    this.setData({
      nonSignedQty: 0,
      completedQty: 0,
      unCompletedQty: 0
    })
  },

  //扫描签单
  scanNo() {
    console.log('开始扫描')
    // 允许从相机和相册扫码
    let that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
        let result = String(res.result) // 当needResult 为 1 时，扫码返回的结果

        let baseUrl = `${api.baseurl}`

        if (result.indexOf(baseUrl) >= 0) {
          //跳转到签发签收页面
          this.setData({
            scanUrl: result,
            isShow:false
          })

        } else {
          wx.showToast({
            title: '未知的扫描结果',
            icon: 'none',
            duration: 1000
          })
        }

      }
    })
  },

  /**
   * 根据选择的时间段查询数据
   */
  loadCount(typeCode) {
    switch (typeCode) {
      case '1':
        this.data.signerTimeBegin = dateUtil.nowDay()
        this.data.signerTimeEnd = dateUtil.nowDay()
        break;
      case '2':
        this.data.signerTimeBegin = dateUtil.addDay(-2)
        this.data.signerTimeEnd = dateUtil.nowDay()
        break;
      case '3':
        this.data.signerTimeBegin = dateUtil.addDay(-6)
        this.data.signerTimeEnd = dateUtil.nowDay()
        break;
      case '4':
        this.data.signerTimeBegin = dateUtil.lastMonFirstDay()
        this.data.signerTimeEnd = dateUtil.lastMonLastDay()
        break;
      case '5':
        this.data.signerTimeBegin = dateUtil.nowMon() + "-01";
        this.data.signerTimeEnd = dateUtil.nowDay()
        break;
      default:
        break;
    }

    let p = { 
      "signerTel": wx.getStorageSync('phone'), 
      "signerTimeBegin": this.data.signerTimeBegin, 
      "signerTimeEnd": this.data.signerTimeEnd, 
      "searchKey": "" 
      }

    let that = this
    wx.request({
      url: `${api.baseurl}/shipment/findCountBydDeliverMob`,
      data: p,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      success: res => {
        console.log(res)
        if (res.data.code == "200") {
          that.data.nonSignedQty = 0;
          that.data.completedQty = 0;
          that.data.unCompletedQty = 0;
          if (res.data.data.result) {
            let j = res.data.data.result;
            if (j.non_signed_count){
              that.setData({
                nonSignedQty: j.non_signed_count
              })
            }

            if (j.is_completed_count){
              that.setData({
                completedQty: j.is_completed_count
              })
            }

            if (j.is_non_completed_count){
              that.setData({
                unCompletedQty: j.is_non_completed_count
              })
            }

          } else {
            // wx.showToast({
            //   title: '暂无数据',
            //   icon: 'none',
            //   duration: 1500
            // })
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }

      }
    });
  },

  queryData(e) {
    let isInTransit = 1
    let isSignedOK = 1
    if (e.currentTarget.id == 1) {
      isInTransit = 1
    }
    if (e.currentTarget.id == 2) {
      isSignedOK = 1
    }
    if (e.currentTarget.id == 3) {
      isSignedOK = 0
    }

    let para = {
      "activeTab": e.currentTarget.id,
      "nonSignedQty": this.data.nonSignedQty,
      "unCompletedQty": this.data.unCompletedQty,
      "completedQty": this.data.completedQty,
      "criteria":
        {
        "signerTel": wx.getStorageSync('phone'),
          "signerTimeBegin":this.data.signerTimeBegin,
          "signerTimeEnd":this.data.signerTimeEnd,
          "searchKey":"",
          "pageNo":1,
          "pageSize":5,
          "isInTransit": isInTransit,
          "isSignedOK": isSignedOK
        }
    }

    var pa = JSON.stringify(para)
    wx.navigateTo({
      url: '../waybill_list/listHome?para=' + pa,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCount('1')
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
    this.setData({
      isShow:true
    })
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