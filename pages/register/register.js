// pages/register/register.js
var app = getApp();
import api from '../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    driverBox: false,
    message:true,
    name:'',
    phone:'',
    code:'',
    butFlag: false,
    time: 60,
    diver:1,
    shipper:2,
    registerType:'',
    url:'',
  },

  // 选择身份
  driver(){
    this.setData({
      driverBox: true,
      message: false,
      registerType:'driver'
    })
    console.log(this.data.registerType)
  },

  // 选择身份
  shipper() {
    this.setData({
      driverBox: true,
      message: false,
      registerType: 'customer'
    })
    console.log(this.data.registerType)
  },

  //上一步
  step(){
    this.setData({
      driverBox: false,
      message: true
    })
  },

  //监听输入姓名
  setName(e){
    this.setData({
      name: e.detail.value
    })
  },

  //监听电话号码
  setPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  
  //监听验证码
  setCode(e){
    this.setData({
      code: e.detail.value
    })
  },

  //获取验证码
  gainCode: function () {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入您的手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (!myreg.test(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
    }
     else {
      // 调用后台发送验证码
      if (this.data.registerType == 'driver'){
        console.log(this.data.registerType == 'driver')
        this.setData({
          url: `${api.baseurl}/c_driver/sendSmsCode4Registration`,
        })
        console.log(this.data.url)
      }
      if (this.data.registerType == 'customer'){
        this.setData({
          url: `${api.baseurl}/sysCUser/sendSmsCode4Registration`,
        })
        console.log(this.data.url)
      }
      console.log(this.data.phone)
      wx.request({
        url: this.data.url,
        method: "POST",
        data: { phone: this.data.phone },
        success: res => {
          if (res.data.code == 200) {
            wx.showToast({
              title: '短信发送成功',
              icon: 'none',
              duration: 2000
            });
            this.backTime();
          } 
        }
      })
    }
  },

  // 倒计时事件
  backTime: function () {
    this.setData({
      butFlag: !this.data.butFlag
    });
    let lazy = setInterval(() => {
      if (this.data.time <= 0) {
        this.setData({
          butFlag: false
        })
        clearInterval(lazy);
        return;
      }
      this.setData({
        time: --this.data.time
      })
    }, 1000)
  },

  //下一步
  next(){
    if(this.data.name != '' && this.data.phone != '' && this.data.code != '') {
      if (this.data.registerType == 'driver') {
        this.setData({
          url: `${api.baseurl}/c_driver/validateSmsCode4Registration`,
        })
      }
      if (this.data.registerType == 'customer') {
        this.setData({
          url: `${api.baseurl}/sysCUser/validateSmsCode4Registration`,
        })
      }
      wx.request({
        url: this.data.url,
        method: "POST",
        data: { userName: this.data.name, phone: this.data.phone, smsCode: this.data.code,},
        success: res => {
          console.log(res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000
            });
            wx.reLaunch({
              url: 'pages/logs/logs'
            })
          }
        }
      })
    }
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