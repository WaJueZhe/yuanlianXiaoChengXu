var pickerFile = require("../../../utils/timePicker.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView:false,
    shipment:false,
    unload: false,
    numTime:0,
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,

    startDate: '',//发货时间
    endDate: '',//收货时间

    collectionMoney:'',//代收金额

    shpTemp:{
      id: '',
      referId: '',
      categoryDesc:null,
      isPaidToDriver:'0',
      PaidDriverAmount:'0',
      isUseEsign:'Y',
      tempDeiverInfo: '',
      tempUnloadInfo: "",
      tempTotalCount: 0,
      tempTotalVol: 0,
      tempTotalWeight: 0,
      tempTotalDesc: '',
      deliverPlanDate: '',
      unloadPlanDate: '',
      shipmentUnitList: []
    },

    deliverItem:{},
    unloadItem:{}
  },

  //点击发货时间
  startPicker: function (e) {
    this.datetimePicker.setPicker('startDate')
  },

  //点击收货时间
  endPicker: function (e) {
    this.datetimePicker.setPicker('endDate')
  },

  //原始单号
  setNumbers(e){
    let temp = "shpTemp.referId"
    this.setData({
      [temp]: e.detail.value
    })
  },

  //扫描
  scanNo() {
    console.log('开始扫描')
    // 允许从相机和相册扫码
    let that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
        let result = String(res.result) // 当needResult 为 1 时，扫码返回的结果
        if (result.length > 40) {
          result = result.substring(0, 40)
        }
        let temp = "shpTemp.referId"
        that.setData({
          [temp]: result
        })
      }
    })
  },

  switchChange(e){
    if (e.detail.value == true) {
      this.setData({
        showView: true
      })
    }else {
      this.setData({
        showView: false
      })
    }
  },

  //选择发货单位/发货人
  deliver(){
    wx.navigateTo({
      url: './address/address?isChoose=true&num=1'
    })
  },

  //选择收货网点/收货人
  unload(){
    wx.navigateTo({
      url: './address/address?isChoose=true&num=2'
    })
  },

  //取消
  cancle(){
    wx.navigateTo({
      url: '../createTask/createTask',
    })
  },

  //删除
  delete(e){
    console.log(e)
    var cargoArr = this.data.shpTemp.shipmentUnitList;
    cargoArr.splice(e.currentTarget.dataset.index, 1);
    let temp = 'shpTemp.shipmentUnitList'
    this.setData({
      [temp]: cargoArr
    })
  },

  //代收金额
  setCollectionMoney(e){
    this.setData({
      collectionMoney: e.detail.value
    })
  },

  //确定
  confirm(){
    if (!this.data.deliverItem.id){
      wx.showToast({
        title: '请选择发货单位/发货人',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.startDate == '') {
      wx.showToast({
        title: '请选择计划发货时间',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!this.data.unloadItem.id) {
      wx.showToast({
        title: '请选择收货网点/收货人',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.endDate == '') {
      wx.showToast({
        title: '请选择计划收货时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (this.data.showView){
      if (this.data.collectionMoney == null || this.data.collectionMoney == '' || this.data.collectionMoney <=0){
        wx.showToast({
          title: '代收货款金额需大于0',
          icon: 'none',
          duration: 1000
        })
        return false;
      }else{
        this.data.shpTemp.isPaidToDriver = '1'
        this.data.shpTemp.PaidDriverAmount = this.data.collectionMoney
      }
    }

    if (this.data.shpTemp.shipmentUnitList == null || this.data.shpTemp.shipmentUnitList == '' || this.data.shpTemp.shipmentUnitList.length==0) {
      wx.showToast({
        title: '请录入货物信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    this.data.shpTemp.deliverPlanDate = this.data.startDate.replace('年', '-').replace('月', '-').replace('日', '')+":00"
    this.data.shpTemp.unloadPlanDate = this.data.endDate.replace('年', '-').replace('月', '-').replace('日', '') + ":00"  

    this.data.shpTemp.goodsDesc = this.data.shpTemp.tempTotalDesc;

    let delFullAddr = this.data.deliverItem.provinceName + this.data.deliverItem.cityName + this.data.deliverItem.districtName + this.data.deliverItem.street;
    this.data.shpTemp.deliverCountryCode = 'CN';
    this.data.shpTemp.deliverProvinceCode = this.data.deliverItem.provinceCode;
    this.data.shpTemp.deliverCityCode = this.data.deliverItem.cityCode;
    this.data.shpTemp.deliverDistrictCode = this.data.deliverItem.districtCode;
    this.data.shpTemp.deliverProvinceNameTemp = this.data.deliverItem.provinceName;
    this.data.shpTemp.deliverCityNameTemp = this.data.deliverItem.cityName;
    this.data.shpTemp.deliverDistrictNameTemp = this.data.deliverItem.districtName;
    this.data.shpTemp.deliverStreet = this.data.deliverItem.street;
    this.data.shpTemp.deliverFullAddress = delFullAddr;
    this.data.shpTemp.deliverCompany = this.data.deliverItem.addressName;
    this.data.shpTemp.deliveryLongitudeX = this.data.deliverItem.longitudeX;
    this.data.shpTemp.deliveryLongitudeY = this.data.deliverItem.latitudeY;
    this.data.shpTemp.deliverContactPerson = this.data.deliverItem.currentContactPerson;
    this.data.shpTemp.deliverContactMobile = this.data.deliverItem.currentContactMobile;
    this.data.shpTemp.deliverItem = this.data.deliverItem;

    let undFullAddr = this.data.unloadItem.provinceName + this.data.unloadItem.cityName + this.data.unloadItem.districtName + this.data.unloadItem.street;
    this.data.shpTemp.unloadCountryCode = 'CN';
    this.data.shpTemp.unloadProvinceCode = this.data.unloadItem.provinceCode;
    this.data.shpTemp.unloadCityCode = this.data.unloadItem.cityCode;
    this.data.shpTemp.unloadDistrictCode = this.data.unloadItem.districtCode;
    this.data.shpTemp.unloadProvinceNameTemp = this.data.unloadItem.provinceName;
    this.data.shpTemp.unloadCityNameTemp = this.data.unloadItem.cityName;
    this.data.shpTemp.unloadDistrictNameTemp = this.data.unloadItem.districtName;
    this.data.shpTemp.unloadStreet = this.data.unloadItem.street;
    this.data.shpTemp.unloadFullAddress = undFullAddr;
    this.data.shpTemp.unloadCompany = this.data.unloadItem.addressName;
    this.data.shpTemp.unloadLongitudeX = this.data.unloadItem.longitudeX;
    this.data.shpTemp.unloadLongitudeY = this.data.unloadItem.latitudeY;
    this.data.shpTemp.unloadContactPerson = this.data.unloadItem.currentContactPerson;
    this.data.shpTemp.unloadContactMobile = this.data.unloadItem.currentContactMobile;
    this.data.shpTemp.unloadItem = this.data.unloadItem;

    console.log(this.data.shpTemp)

    if (this.data.shpTemp.id == null || this.data.shpTemp.id==''){
      this.data.shpTemp.id = this.guid()

      //返回运单信息
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      let temp = 'task.shipmentList'
      prevPage.setData({
        [temp]: prevPage.data.task.shipmentList.concat(this.data.shpTemp)
      })

    }else{
      //修改操作

    }

    wx.navigateBack({
      delta: 1,
    })

  },

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  /**
   * 计算汇总数据
   */
  unitCount(){
    if (this.data.shpTemp.shipmentUnitList.length > 0) {
      let lnt = this.data.shpTemp.shipmentUnitList.length;
      this.data.shpTemp.tempTotalCount = 0;
      this.data.shpTemp.tempTotalVol = 0;
      this.data.shpTemp.tempTotalWeight = 0;
      this.data.shpTemp.tempTotalDesc = '';
      for (let i = 0; i < lnt; i++) {
        let unitItem = this.data.shpTemp.shipmentUnitList[i];
        this.data.shpTemp.tempTotalCount = Number(this.data.shpTemp.tempTotalCount) + Number(unitItem.plannedUnits);
        this.data.shpTemp.tempTotalVol = Number(this.data.shpTemp.tempTotalVol) + Number(unitItem.plannedVolume);
        this.data.shpTemp.tempTotalWeight = Number(this.data.shpTemp.tempTotalWeight) + Number(unitItem.plannedWeight);
        this.data.shpTemp.tempTotalDesc = this.data.shpTemp.tempTotalDesc + "、" + unitItem.unitDesc;
      }
      this.data.shpTemp.tempTotalDesc = String(this.data.shpTemp.tempTotalDesc).substring(1);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.datetimePicker = new pickerFile.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 500
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
    this.unitCount()
    console.log(this.data.shpTemp)
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