// pages/c_pages/userSetting/userSetting.js
import api from '../../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderShow: true,
    photoShow: true,
    userInfo: {},
    tokenid: "",
    imgSrc: "",
    inputUserName: '',
    inputIdentityCard: '',
    authenticationBox:true,
  },

  setName(e){
    this.setData({
      inputUserName: e.detail.value
    })
  },
  setIdentityCard(e){
    this.setData({
      inputIdentityCard: e.detail.value
    })
  },

  attestation(){
    this.setData({
      authenticationBox: false,
    })
  },

  cancle(){
    this.setData({
      authenticationBox: true,
    })
  },

  // 退出登录事件
  backLogin() {
    wx.request({
      url: `${api.baseurl}/userAuth/dirverLogOff?loginType=1`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        if (res.data.success) {
          wx.removeStorageSync('tokenid');
          wx.reLaunch({
            url: '../../logs/logs',
          })
        }
      }
    })
  },

  // 默认渲染事件
  getUserList() {
    wx.request({
      url: `${api.baseurl}/driver/driverInfo`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        if (res.data.success) {
          let lists = res.data.data.driver;

          // console.log(lists)

          this.setData({
            userInfo: lists,
            imgSrc: api.resourceurl + lists.driverPic
          })

        }
      }
    })
  },

  // 修改姓名
  setuseName() {
    wx.navigateTo({
      url: `../spliceSet/spliceSet?userName=${this.data.userInfo.driverName}`,
    })
  },

  // 选择性别(遮罩层)
  toggleGender() {
    this.setData({
      genderShow: !this.data.genderShow
    })
  },

  //选择头像上传(遮罩层)
  togglePhoto() {
    this.setData({
      photoShow: !this.data.photoShow
    })
  },

  // 拍照上传头像
  camerauser() {
    var that = this
    wx.showLoading({
      title: '加载中...'
    });
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          photoShow: !that.data.photoShow
        })
        wx.uploadFile({
          url: `${api.baseurl}/driver/updatedriverInf`,
          filePath: tempFilePaths1[0],
          name: 'file',
          header: { tokenId: this.data.tokenid },
          success: function (res) {
            console.log(res)
            let redata = JSON.parse(res.data)
            if (redata.success) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000,
                complete: function () {
                  setTimeout(function () {
                    that.getUserList()
                  }, 1500)
                }
              })
            } else {
              wx.showToast({
                title: '头像上传失败',
                icon: 'none',
                duration: 2000,
                complete: function () {
                  setTimeout(function () {
                    that.getUserList()
                  }, 1500)
                }
              })
            }
          },
          complete: function () {
            wx.hideLoading();
          }
        })
      }
    })
  },

  //从手机相册选择图片上传
  getPhotouser() {
    var that = this
    wx.showLoading({
      title: '加载中...'
    });
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths1 = res.tempFilePaths
        that.setData({
          photoShow: !that.data.photoShow
        })
        wx.uploadFile({
          url: `${api.baseurl}/driver/updatedriverInf`,
          filePath: tempFilePaths1[0],
          name: 'file',
          header: { tokenId: this.data.tokenid },
          success: function (res) {
            console.log(res)
            let redata = JSON.parse(res.data)
            if (redata.success) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000,
                complete: function () {
                  setTimeout(function () {
                    that.getUserList()
                  }, 1500)
                }
              })
            } else {
              wx.showToast({
                title: '头像上传失败',
                icon: 'none',
                duration: 2000,
                complete: function () {
                  setTimeout(function () {
                    that.getUserList()
                  }, 1500)
                }
              })
            }
          },
          complete: function () {
            wx.hideLoading();
          }
        })
      }
    })
  },

  // 修改性别
  setGender(e) {
    let gender = e.detail.value;
    wx.request({
      url: `${api.baseurl}/driver/updatedriverInf?driverSex=${gender}`,
      method: 'POST',
      header: { tokenId: this.data.tokenid },
      success: res => {
        if (res.data.success) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          this.getUserList()
        } else {
          wx.showToast({
            title: '保存失败，请重试',
            icon: 'success',
            duration: 2000
          })
          return;
        }
      }
    })
  },
  menuClick(){
    wx.reLaunch({
      url: '/pages/home/me/me?active=0'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tokenid: wx.getStorageSync('tokenid')
    })
    this.getUserList();
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
    this.getUserList()
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