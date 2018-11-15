// pages/c_pages/addVehicle/addVehicle.js
import api from '../../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carTypeList:[
      { val: "H01", lbl: "普通货车" },
      { val: "H02", lbl: "厢式货车" },
      { val: "H04", lbl: "罐式货车" },
      { val: "Q00", lbl: "牵引车" },
      { val: "G01", lbl: "普通挂车" },
      { val: "G03", lbl: "罐式挂车" },
      { val: "G05", lbl: "集装箱挂车" },
      { val: "H09", lbl: "仓栅式货车" },
      { val: "H03", lbl: "封闭货车" },
      { val: "H05", lbl: "平板货车" },
      { val: "H06", lbl: "集装箱车" },
      { val: "H07", lbl: "自卸货车" },
      { val: "H08", lbl: "特殊结构货车" },
      { val: "Z00", lbl: "专项作业车" },
      { val: "G02", lbl: "厢式挂车" },
      { val: "G07", lbl: "仓栅式挂车" },
      { val: "G04", lbl: "平板挂车" },
      { val: "G06", lbl: "自卸挂车" },
      { val: "G09", lbl: "专项作业挂车" },
      { val: "X91", lbl: "车辆运输车" },
      { val: "X92", lbl: "车辆运输车(单排)" }
    ],
    carType:'',
    isShow:false,
    licenseList: [
      { val: "1", lbl: "大型号牌" },
      { val: "2", lbl: "小型号牌" },
      { val: "99", lbl: "其他号牌" }
    ],
    licenseShow:false,
    license:'',

    vehicleNo:'',//车牌号
    vehicleType: '',// 车型
    vehicleNumberType: '',// 牌照类型
    length: '',// 车长

  },

  setVehicleNo(e){
    this.setData({
      vehicleNo: e.detail.value,
    })
  },

  setLength(e) {
    this.setData({
      length: e.detail.value,
    })
  },

  //选择车型
  groupCar(){
    this.setData({
      isShow: true,
    })
  },

  // 车型弹框
  description(e){
    this.setData({
      carType:e.currentTarget.dataset.text,
      vehicleType: e.currentTarget.dataset.id,
      isShow: false,
    })
    console.log(e.currentTarget.dataset.id)
  },

  //选择牌照类型
  groupLicense(){
    this.setData({
      licenseShow: true,
    })
  },

  // 牌照类型弹框
  chooseLicense(e) {
    this.setData({
      license: e.currentTarget.dataset.text,
      vehicleNumberType: e.currentTarget.dataset.id,
      licenseShow: false,
    })
    console.log(e.currentTarget.dataset.id)
  },

  addSubmit(){
    if (this.data.vehicleNo == '') {
      wx.showToast({
        title: '车牌号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.vehicleNo.length != 7) {
      wx.showToast({
        title: '正确车牌号长度为7位',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.license == '') {
      wx.showToast({
        title: '牌照类型不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let addUrl = '';
    switch (wx.getStorageSync('identityType')) {
      case 'pcuser':
        addUrl = `${api.baseurl}/vehicle_driver/createVehicle`
        break;
      case 'customer':
        addUrl = `${api.baseurl}/cuser_vehicle_driver/createVehicle`
        break;
      default:
        break;
    }

    let para = {
      'vehicleNo': this.data.vehicleNo,
      'vehicleNumberType': this.data.vehicleNumberType,
      'vehicleType': this.data.vehicleType,
      'length': this.data.length,
    }

    wx.request({
      url: addUrl,
      data: para,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            url: '../vehicle/vehicle'
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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