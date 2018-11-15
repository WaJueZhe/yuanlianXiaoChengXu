// pages/c_pages/addAddress/addAddress.js
var tcity = require("../../../utils/cityData.js");
import api from '../../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    showView: false,
    arr: [{ id: 'D', name: '装货' }, { id: 'U', name: '卸货' }],

    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,

    // 城市Id
    provinceId: '',
    cityId: '',
    countyId: '',

    pcdCode:[],
    pcdName:[],
    addressGenre: '',//地址类型

    addressType: '',//地址类型
    addressCode: '',//地址编码
    street: '',//详细地址
    currentContactPerson: '',//联系人
    currentContactMobile:'',//联系电话
    addressName: '',//单位名称
  },

  //地址编码
  setAddressCode(e) {
    this.setData({
      addressCode: e.detail.value,
    })
  },

  //详细地址
  setStreet(e) {
    this.setData({
      street: e.detail.value,
    })
  },

  //联系人
  setCurrentContactPerson(e) {
    this.setData({
      currentContactPerson: e.detail.value,
    })
  },

  //联系电话
  setCurrentContactMobile(e) {
    this.setData({
      currentContactMobile: e.detail.value,
    })
  },

  //单位名称
  setAddressName(e) {
    this.setData({
      addressName: e.detail.value,
    })
  },

  bindChange: function (e) {
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },

  // 选择类型弹框
  chooseType(){
    this.setData({
      showView: true,
    })
  },

  //取消选择类型弹框
  cancleModal(){
    this.setData({
      showView: false,
    })
  },

  // 选择类型
  description(e){
    console.log(e)
    this.setData({
      addressType: e.currentTarget.dataset.id,
      addressGenre: e.currentTarget.dataset.text,
    })
    console.log(this.data.addressType)
  },

  //提交
  addSubmit(){
    if (this.data.addressType == '') {
      wx.showToast({
        title: '地址类型不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.addressCode == '') {
      wx.showToast({
        title: '地址编码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (!(/^[^ ]+$/).test(this.data.addressCode)) {
      wx.showToast({
        title: '输入的地址编码不能有空格',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.street == '') {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.currentContactPerson == '') {
      wx.showToast({
        title: '联系人不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.currentContactMobile == '') {
      wx.showToast({
        title: '联系电话不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (!(/^1[123456789]\d{9}$/.test(this.data.currentContactMobile))) {
      wx.showToast({
        title: '手机号码不正确',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let addUrl = '';
    switch (wx.getStorageSync('identityType')) {
      case 'pcuser':
        addUrl = `${api.baseurl}/address/createUsualAddress`
        break;
      case 'customer':
        addUrl = `${api.baseurl}/cuserAddress/createUsualAddress`
        break;
      default:
        break;
    }

    let param = {
      'addressType': this.data.addressType,
      'addressCode': this.data.addressCode,
      'street': this.data.street,
      'addressName': this.data.addressName,
      'currentContactPerson': this.data.currentContactPerson,
      'currentContactMobile': this.data.currentContactMobile,
      'pcdName': this.data.pcdName,
      'pcdCode': this.data.pcdCode,
    }

    console.log(this.data.addressType)

    wx.request({
      url: addUrl,
      data: param,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        console.log(res)
        if (res.data.code == '200') {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            url: '../address/address'
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("onLoad");
    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;

    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('城市完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name,

      'provinceId': cityData[0].id,
      'cityId': cityData[0].sub[0].id,
      'countyId': cityData[0].sub[0].sub[0].id,

      'pcdName': cityData[0].name + ',' + cityData[0].sub[0].name + ',' + cityData[0].sub[0].sub[0].name,
      'pcdCode': cityData[0].id + ',' + cityData[0].sub[0].id + ',' + cityData[0].sub[0].sub[0].id,
    })
    console.log('初始化完成');
    console.log('省份：' + that.data.province + ',' + that.data.city + ',' + that.data.county)
    console.log('id：' + that.data.provinceId + ',' + that.data.cityId + ',' + that.data.countyId)
    
    that.data.pcdName = that.data.pcdName.split(",");
    that.data.pcdCode = that.data.pcdCode.split(",");

    console.log(that.data.pcdName)
    console.log(that.data.pcdCode)
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