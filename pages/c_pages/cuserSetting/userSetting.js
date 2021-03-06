// pages/c_pages/userSetting/userSetting.js
import api from '../../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderShow: true,
    photoShow: true,
    tokenid: "",
    imgSrc: "",
    inputUserName: '',
    inputIdentityCard: '',
    authenticationBox:true,
    user: {
      picUrl: "",
      userName: "",
      userSex: "",
      userMobile: "",
      userIdentity: "",
      userRealIdentity: "",
      isVerified: '',
      userType: ''
    },

    org: wx.getStorageSync("orgId"),
    identityTypes: [], //用户所有的身份类型：pcuser、customer、driver
    userType: "", // 非司机身份，值是：pcuser 或 customer
    identityType: "", //  当前切换的身份：pcuser、或customer、或driver
    isDriver:false
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

  /**
   * 实名认证
   */
  saveInfo() {
    if (this.data.inputIdentityCard.length < 15) {
      wx.showToast({
        title: '请输入正确的身份证号码',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if ((this.data.inputUserName != '') && (this.data.inputIdentityCard != '') && (this.data.inputUserType != '')) {
      let that = this;
      wx.request({
        url: `${api.baseurl}/authent/userAuthent`,
        data: { "signerName": this.data.inputUserName, "signerIdcode": this.data.inputIdentityCard, "userType": wx.getStorageSync("identityType"), "update": "1" },
        method: "POST",
        header: { tokenId: wx.getStorageSync('tokenid') },
        success: res => {
          console.log(res)
          if (res.data.success) {
            wx.showToast({
              title: '认证成功',
              icon: 'success',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1000
            })
          }
        }
      });
    }
  },

  cancle(){
    this.setData({
      authenticationBox: true,
    })
  },

  // 退出登录事件
  backLogin() {
    wx.request({
      url: `${api.baseurl}/userAuth/dirverLogOffh5`,
      method: "POST",
      data: {'loginType':'1'},
      header: { tokenId: this.data.tokenid },
      success: res => {
        if (res.data.success) {
          wx.removeStorageSync('tokenid')
          wx.removeStorageSync('authId')
          wx.removeStorageSync('phone')
          wx.removeStorageSync('orgId')
          wx.removeStorageSync('identityType')
          wx.removeStorageSync('permitsMap')
          wx.reLaunch({
            url: '../../logs/logs',
          })
        }
      }
    })
  },

  // 默认渲染事件
  getUserList() {
    let that = this
    wx.request({
      url: `${api.baseurl}/userAuth/getCurrentMobileIdentity`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        console.log(res)
        if (res.data.success) {
          if (res.data.data.result.picUrl){
            that.data.user.picUrl = `${api.resourceurl}` + res.data.data.result.picUrl;
          }else{
            that.data.user.picUrl = "../../../img/headimg.jpg"
          }
          
          that.data.user.userName = res.data.data.result.userName;
          that.data.user.userSex = res.data.data.result.gender;
          that.data.user.userMobile = res.data.data.result.phone;
          that.data.user.userIdentity = res.data.data.result.identity;
          that.data.user.userRealIdentity = res.data.data.result.identity;
          that.data.user.isVerified = res.data.data.result.isCertfied;
          that.data.user.userType = 'customer';
          that.data.user.userMobile = that.data.user.userMobile.slice(0, 3) + '****' + that.data.user.userMobile.slice(7);
          if (that.data.user.userIdentity && (that.data.user.userIdentity != "")) {
            if (that.data.user.userIdentity.length === 15) {
              that.data.user.userIdentity = that.data.user.userIdentity.slice(0, 4) + '****' + '***' + that.data.user.userIdentity.slice(11);
            }
            else {
              that.data.user.userIdentity = that.data.user.userIdentity.slice(0, 4) + '*****' + '*****' + that.data.user.userIdentity.slice(14);
            }
          }

          that.setData({
            user:that.data.user
          })

        }
      }
    })
  },

  // 修改姓名
  setuseName() {
    wx.navigateTo({
      url: `../spliceSet/spliceSet?userName=${this.data.user.userName}&userType=customer`,
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
          url: `${api.baseurl}/sysCUser/updateCUserInf`,
          filePath: tempFilePaths1[0],
          data: { "userName": this.data.user.userName, "userSex": this.data.user.userSex},
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
      url: `${api.baseurl}/sysCUser/updateCUserInfh5`,
      method: 'POST',
      data: {'userSex':gender},
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
 * 获取用户身份信息
 */
  getUserIdentitys() {
    let param = { "phone": wx.getStorageSync("phone") };
    wx.request({
      url: `${api.baseurl}/userAuth/getUserIdentitys`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      data: param,
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          this.data.identityTypes = res.data.data.identityTypes; //所有的身份类型数组
          for (let i = 0; i < this.data.identityTypes.length; i++) {
            if (this.data.identityTypes[i] == "driver") {
              this.setData({
                isDriver: true
              })
            }
          }
        } else {
          console.log(res.data.message)
        }
      }
    })
  },

  /**
 * 切换角色
 */
  switchIdentity() {
    let param = {};
    if (this.data.identityType == "driver") { //  当前切换的身份：pcuser、customer、driver
      param = {
        "phone": wx.getStorageSync("phone"),
        "orgId": this.data.org,
        "identityType": this.data.identityType
      }
      wx.request({
        url: `${api.baseurl}/userAuth/switchIdentity`,
        method: "POST",
        header: { tokenId: this.data.tokenid },
        data: param,
        success: res => {
          console.log(res)
          if (res.data.code == 200) {
            let authid = res.header.authid;
            wx.setStorageSync("authId", authid)
            wx.setStorageSync("orgId", this.data.org)
            wx.setStorageSync("identityType", this.data.identityType)
            wx.setStorageSync("tokenid", res.header.tokenId)
          } else if (res.data.code == 400) {
            Toast("切换出错," + res.data.message);
          } else {
            Toast("切换出错!");
          }
        }
      })
      // 清除 pcuser 的权限信息
      wx.setStorageSync("permitsMap", null)

    } else if (this.data.identityType == "pcuser" || this.data.identityType == "customer") { //  身份：pcuser、customer、driver
      param = {
        "phone": wx.getStorageSync("phone"),
        "identityType": this.data.identityType //进入 页面时已设置类型 
      }
      wx.request({
        url: `${api.baseurl}/userAuth/switchIdentity`,
        method: "POST",
        header: { tokenId: this.data.tokenid },
        data: param,
        success: res => {
          console.log(res)
          if (res.data.code == 200) {
            if (this.data.identityType == "pcuser") {
              console.log(" 返回 权限集 res.data.data.result.permitsMap = " + JSON.stringify(res.data.data.result.permitsMap))
              //权限集
              let permitsMap = res.data.data.result.permitsMap //格式：{"key1":[],"key2":[]} ,例如:{"extra_service_list":["1"],"userAllMenuCodes":["m008001","m008"]}
              var permitsMapStr = JSON.stringify(permitsMap);
              wx.setStorageSync("permitsMap", permitsMapStr)
            } else {
              // 清除 pcuser 的权限信息
              wx.setStorageSync("permitsMap", null)
            }
            wx.setStorageSync("tokenid", res.header.tokenId)
            let authid = res.header.authid;
            wx.setStorageSync("authId", authid)
            wx.setStorageSync("identityType", this.data.identityType) // 切换的身份写到cookie 

            wx.reLaunch({
              url: '../../c_pages/receive/receiveHome/receiveHome'
            })

          } else {
            console.log(res.data.message)
          }
        }
      })
    } else {
      console.log("未知的身份类型：[ " + this.data.identityType + " ]");
    }

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tokenid: wx.getStorageSync('tokenid')
    })
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
    this.getUserIdentitys()
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