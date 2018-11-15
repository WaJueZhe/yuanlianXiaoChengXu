// pages/c_pages/compileDriver/compileDriver.js
import api from '../../../api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '男', value: '1', checked: 'true' },
      { name: '女', value: '2', checked: '' },
    ],
    id:'',
    driverName: "",
    driverAge: "",
    driverSex: "1",
    driverMobile: "",
    driverIdentityId: "",
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  //输入姓名
  setName(e) {
    this.setData({
      driverName: e.detail.value
    })
  },

  //输入年龄
  setAge(e) {
    this.setData({
      driverAge: e.detail.value
    })
  },

  //输入手机号
  setMobile(e) {
    this.setData({
      driverMobile: e.detail.value
    })
  },

  //输入身份证号
  setIdentityId(e) {
    this.setData({
      driverIdentityId: e.detail.value
    })
  },

  //提交
  editSubmit() {
    if (this.data.driverName == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.driverAge == '') {
      wx.showToast({
        title: '年龄不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.driverAge < 18) {
      wx.showToast({
        title: '年龄要在16到60岁之间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (!(/^[0-9]*[1-9][0-9]*$/.test(this.data.driverAge))) {
      wx.showToast({
        title: '请输正整数',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.driverMobile == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (!(/^1[123456789]\d{9}$/.test(this.data.driverMobile))) {
      wx.showToast({
        title: '手机号码不正确',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.driverIdentityId == '') {
      wx.showToast({
        title: '身份证号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    else if (this.data.driverIdentityId) {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(this.data.driverIdentityId) === false) {
        wx.showToast({
          title: '您输入的身份不合法',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }

    let updateUrl = '';
    switch (wx.getStorageSync('identityType')) {
      case 'pcuser':
        updateUrl = `${api.baseurl}/driver/update`
        break;
      case 'customer':
        updateUrl = `${api.baseurl}/c_driver/update`
        break;
      default:
        break;
    }

    console.log(this.data.driverName)
    console.log(this.data.driverAge)
    console.log(this.data.driverSex)
    console.log(this.data.driverMobile)
    console.log(this.data.driverIdentityId)

    let para = {
      'id': this.data.id,
      'driverName': this.data.driverName,
      'driverAge': this.data.driverAge,
      'driverSex': this.data.driverSex,
      'driverMobile': this.data.driverMobile,
      'driverIdentityId': this.data.driverIdentityId,
    }
    wx.request({
      url: updateUrl,
      data: para,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            url: '../driver/driver'
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
    console.log(app.driverList)
    this.setData({
      id: app.driverList.id,
      driverName: app.driverList.driverName,
      driverAge: app.driverList.driverAge,
      driverSex: app.driverList.driverSex,
      driverMobile: app.driverList.driverMobile,
      driverIdentityId: app.driverList.driverIdentityId,
    })
    if (this.data.driverSex == 2) {
      this.data.items[1].checked = 'true'
      this.data.items[0].checked = 'false'
    }
    else if (this.data.driverSex == '女') {
      this.data.items[1].checked = true
    }
    this.setData({
      items: this.data.items
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