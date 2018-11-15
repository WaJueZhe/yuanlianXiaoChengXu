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
    isShow: true,
    scanUrl: '',
    signerTel: "",
    signerTimeBegin: "2017-01-01",
    signerTimeEnd: "2019-12-01",
    searchKey: "",
    isInTransit: "",
    isSignedOK: "",
    intransitQty: 0,
    signedOK: 0,
    signedNonOK: 0,
    acticeIndex: 1,

    userType:""
  },

  querySum(e) {
    this.setData({
      num: e.target.id,
      modal: true,
      intransitQty: 0,
      signedOK: 0,
      signedNonOK: 0,
    })
    this.loadCount(e.target.id)
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
            isShow: false
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

  loadCount(typeCode){
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

    let p = { "signerTel": wx.getStorageSync('phone'), "signerTimeBegin": this.data.signerTimeBegin, "signerTimeEnd": this.data.signerTimeEnd, "searchKey": "" };
    let that = this
    wx.request({
      url: `${api.baseurl}/shipment/findCountBydReceiverMob`,
      data: p,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      success: res => {
        console.log(res)
        if (res.data.code == "200") {
          that.data.intransitQty = 0
          that.data.signedOK = 0
          that.data.signedNonOK = 0
          if (res.data.data.result) {
            let j = res.data.data.result;
            that.setData({
              intransitQty: j.non_signed_count,
              signedOK: j.signed_ok_count,
              signedNonOK: j.signed_ng_count
            })
          } else {
            wx.showToast({
              title: '暂无数据',
              icon: 'none',
              duration: 1500
            })
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

  more() {
    this.setData({
      modal: (!this.data.modal)
    })
  },

  queryData(e){
    console.log(e)
    let isInTransit = 1
    let isSignedOK = 1
    if (e.currentTarget.id == 1) {
      isInTransit=1
    }
    if (e.currentTarget.id == 2) {
      isSignedOK = 1
    }
    if (e.currentTarget.id == 3) {
      isSignedOK = 0
    }
    let para = {
      "activeTab": e.currentTarget.id,
      "intransitQty":this.data.intransitQty,
      "signedOK": this.data.signedOK,
      "signedNonOK":this.data.signedNonOK,
      "criteria":
        {
          "signerTel": wx.getStorageSync('phone'),
          "signerTimeBegin":this.data.signerTimeBegin,
          "signerTimeEnd": this.data.signerTimeEnd,
          "searchKey":"",
          "pageNo":1,
          "pageSize":5,
          "isInTransit": isInTransit,
          "isSignedOK": isSignedOK
        }
    }

    // var pa = Base64.CusBASE64.encoder(para);
    var pa = JSON.stringify(para)
    wx.navigateTo({
      url: '../receive_list/receive_list?para=' + pa,
    })
  },

/**
 * 扫描
 */
  scan() {
    let that = this;
    //调用微信接口
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
        var result = String(res.result); // 当needResult 为 1 时，扫码返回的结果
        let baseUrl = api.baseurl;
        console.log(baseUrl)
        if (result.indexOf(baseUrl) >= 0) {
          window.location.href = result;
        } else {
          wx.showToast({
            title: '扫描的二维码不合法',
            icon: 'none',
            duration: 1500
          })
        }
      }
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
      userType: wx.getStorageSync("identityType")
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