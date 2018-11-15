// var dateUtil = require('../../utils/dateUtil.js')
// console.log(dateUtil.lastMonFirstDay())
var app = getApp();
import api from '../../api.js'
// import common from '../../utils/common.js'
Page({
  data: {
    butFlag: false,
    time: 60,
    phone: "",
    Vcode: "",//验证码
    userList: {},
    modelFlag: false, //控制弹出框的显示与隐藏
    loginBut: true, //控制登录按钮
    openid:'',
    orgid:'',
    orgids:'',
    identityType:'',
    identitydata:[],
    identityMap:{},
    identityTypes:[],
    loginByWx:false,
    select:false,
    identityVisible:false
  },
  onLoad: function () {
    this.getWxOpenId();
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

  //协议选择框
  agree(){
    this.setData({
      select:!this.data.select
    })
  },
  // 获取验证码
  gettextCode: function () {
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入你的手机号',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: `${api.getloginVcode}`,
        method: "POST",
        data: { 'phone': this.data.phone },
        success: res => {
          if (res.data.code == 200) {
            let token = res.header.tokenId
            wx.setStorageSync('tokenid', token)
            wx.showToast({
              title: '短信发送成功',
              icon: 'none',
              duration: 2000
            });
            this.backTime();
            let value = res.data.data.orgs
            value = value.split(",");
            this.setData({
              orgids: value,
              loginByWx: false
            })

            var obj = {};
            for (var i = 0; i < value.length; i++) {
              var arr = value[i].split('|');
              obj[arr[0]] = arr[1]
            }

            this.setData({
              userList: obj,
              loginBut: false
            })
            this.setData({
              identityMap: res.data.data.userIdentity.loginUserAllIdentity,
              identityTypes: res.data.data.identityTypes
            })
          } else {
            wx.showToast({
              title: '用户未注册',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  //点击登陆按钮
  skipPage() {
    if (this.data.phone == "" && this.data.Vcode == "") {
      wx.showToast({
        title: '手机号和验证码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.phone == "") {
      wx.showToast({
        title: '请输入你的手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.Vcode == "") {
      wx.showToast({
        title: '请输入你的验证码',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.select != true){
      wx.showToast({
        title: '请先阅读并同意云单使用协议、隐私保护协议！',
        icon: 'none',
        duration: 2000,
      })
    }
    else {
      if (Object.keys(this.data.identityMap).length > 1) { 
        let idatatemp = [];
        let idx=0;
        for (let key in this.data.identityMap) {
          
          let obj = {};
          if (key == "pcuser") {
            obj = {
              name: "货主",//this.identityMap[key].userName,
              oid: this.data.identityMap[key].id,
              loginType: "0",
              loginIdentityType: "pcuser"
            };
          } else if (key == "driver") {
            obj = {
              name: "司机", // 司机是一个列表，不同公司的司机
              oid: "driverId", // 还要选择哪个企业id
              loginType: "0",
              loginIdentityType: "driver"
            };
          } else if (key == "customer") {
            obj = {
              name: "货主",//this.identityMap[key].userName,
              oid: this.data.identityMap[key].id,
              loginType: "0",
              loginIdentityType: "customer"
            };
          }
          idatatemp[idx] = obj;
          idx=idx+1;
        
        }

        //判断如果只有一个角色，直接进
        if (idatatemp.length>1){
          //多个角色
          this.setData({
            identitydata: idatatemp,
            identityVisible: true
          })
        }else{
          //一个角色
          let eobj={
            target:{
              dataset:{
                item: idatatemp[0]
              }
            }
          }

          this.identitySelect(eobj)
        }

      }

    }
  },
  /**
   * 点击角色选择
   */
  identitySelect(e) {
    let actions = e.target.dataset.item

    if (actions.loginType == "0") {
      this.data.identityType = actions.loginIdentityType; // 选择身份确定身份类型 

      if (this.data.orgids.length == 0) {
        //游客登录
        //console.log("游客登录");
      }
      if (actions.loginIdentityType == "driver") {
        
        if (this.data.orgids.length > 1) {
          this.setData({
            identityVisible:false,
            modelFlag: true
          })
        } else {
          let value = this.data.orgids
          var arr = value[0].split('|')
          this.data.orgid = arr[0]
          this.vcodeLogin(arr[0])
        }

      } else if (actions.loginIdentityType == "pcuser" || actions.loginIdentityType == "customer") {
        this.vcodeLogin();
      }
    } 
  },
 
  // 手机号的双向数据绑定
  setPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 验证码的双向数据绑定
  setVcode(e) {
    this.setData({
      Vcode: e.detail.value
    })
  },
  // 切换弹出层的显示与隐藏
  toggleIdentity() {
    this.setData({
      identityVisible: false
    })
  },
  // 切换弹出层的显示与隐藏
  toggleModel() {
    this.setData({
      modelFlag: false
    })
  },
  
  /**
   * 点击组织机构
   */
  orgSelect(e){
    this.data.orgid = e.target.id
    if (this.data.loginByWx){
      this.openIdLogin()
    }else{
      this.vcodeLogin()
    }
  },

  //云单隐私保护协议
  privacyProtection(){
    wx.navigateTo({
      url: '../privacyProtection/privacyProtection',
    })
  },

  //云单用户使用协议
  usageAgreement(){
    wx.navigateTo({
      url: '../usageAgreement/usageAgreement',
    })
  },

  //统一登陆入口
  openIdLogin() {
    let that =this
    let param = {
      "phone": this.data.phone,
      "openId": this.data.openid, // 有openid 表示从微信接口进
      "loginType": '1',
      "orgId": this.data.orgid,
      "identityType": this.data.identityType
    };
    wx.request({
      url: `${api.baseurl}/userAuth/loginByOpenid`,
      data: param,
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          let authid = res.header.authid;
          wx.setStorageSync("authId", authid)
          wx.setStorageSync("phone", that.data.phone)
          wx.setStorageSync("orgId", that.data.orgid)
          wx.setStorageSync("identityType", that.data.identityType)
          wx.setStorageSync("tokenid", res.header.tokenId)

          if (that.data.identityType == "pcuser") {
            let permitsMap = res.data.data.result.permitsMap //格式：{"key1":[],"key2":[]} ,例如:{"extra_service_list":["1"],"userAllMenuCodes":["m008001","m008"]}
            var permitsMapStr = JSON.stringify(permitsMap)
            wx.setStorageSync("permitsMap", permitsMapStr)
          } else {
            wx.setStorageSync("permitsMap", null)// 清除 pcuser 的权限信息
          }

          switch (that.data.identityType) {
            case 'pcuser':
              console.log('进入pcuser界面')
              wx.reLaunch({
                url: '../c_pages/deliver/deliverHome/deliverHome'
              })
              
              break;
            case 'customer':
              console.log('进入customer界面')
              wx.reLaunch({
                url: '../c_pages/receive/receiveHome/receiveHome'
              })
              break;
            case 'driver':
              wx.reLaunch({
                url: '../home/me/me?active=0'
              })
              break;
            default:
              break;
          }
        } else if (res.data.code == 400) {
          wx.clearStorageSync()
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.clearStorageSync()
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  },

  //验证码登陆入口
  vcodeLogin() {
    let that = this
    let param = {
      "checkCode": this.data.Vcode,
      "phone": this.data.phone,
      "openId": this.data.openid, // 有openid 表示从微信接口进
      "loginType": '1',
      "orgId": this.data.orgid,
      "identityType": this.data.identityType
    };
    wx.request({
      url: `${api.baseurl}/userAuth/loginPhoneInsureCheckCodeh5`,
      data: param,
      header: { tokenId: wx.getStorageSync('tokenid')},
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          let authid = res.header.authid;
          wx.setStorageSync("authId", authid)
          wx.setStorageSync("phone", that.data.phone)
          wx.setStorageSync("orgId", that.data.orgid)
          wx.setStorageSync("identityType", that.data.identityType)
          wx.setStorageSync("tokenid", res.header.tokenId)

          if (that.data.identityType == "pcuser") {
            let permitsMap = res.data.data.result.permitsMap //格式：{"key1":[],"key2":[]} ,例如:{"extra_service_list":["1"],"userAllMenuCodes":["m008001","m008"]}
            var permitsMapStr = JSON.stringify(permitsMap)
            wx.setStorageSync("permitsMap", permitsMapStr)
          } else {
            wx.setStorageSync("permitsMap", null)// 清除 pcuser 的权限信息
          }

          switch (that.data.identityType) {
            case 'pcuser':
              console.log('进入pcuser界面')
              wx.reLaunch({
                url: '../c_pages/deliver/deliverHome/deliverHome'
              })
              break;
            case 'customer':
              console.log('进入customer界面')
              wx.reLaunch({
                url: '../c_pages/receive/receiveHome/receiveHome'
              })
              break;
            case 'driver':
              wx.reLaunch({
                url: '../home/me/me?active=0'
              })
              break;
            default:
              break;
          }
        } else if (res.data.code == 400) {
          wx.clearStorageSync()
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.clearStorageSync()
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  },
  //获取微信openId，调用infoByOpenId方法获取用户信息
  getWxOpenId() {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          wx.request({
            //获取openid接口  
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: api.APP_ID,
              secret: api.APP_SECRET,
              js_code: code,
              grant_type: 'authorization_code'
            },
            header: { 'content-type': 'application/json' },
            method: 'GET',
            success: function (res) {
              console.log(res)
              that.infoByOpenId(res.data.openid);
              that.setData({
                openid: res.data.openid
              })
            }
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },

  /**
   * 通过openid获取用户的信息（含角色）
   */
  infoByOpenId(openid){
    let that = this
    wx.request({
      //获取openid接口  
      url: `${api.baseurl}/userAuth/userInfoByOpenId`,
      data: { openid: openid, loginType: '1' },
      // header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        if(res.data.success){
          let token = res.header.tokenId
          if(token){
            wx.setStorageSync("tokenid", token)
          }
          //是否微信登陆
          that.data.loginByWx = true 
          that.data.phone = res.data.data.phone

          if (res.data.data.orgs){
            //判断登陆机构
            let value = res.data.data.orgs
            value = value.split(",")
            that.data.orgids = value
            var obj = {};
            for (var i = 0; i < value.length; i++) {
              var arr = value[i].split('|');
              obj[arr[0]] = arr[1]
            }

            if (value.length > 1) {
              that.setData({
                userList: obj
              })
            } else if (value.length == 1) {
              that.setData({
                orgid: value[0].split('|')[0]
              })
            } else {
              console.log("无有效的组织机构");
            }
          }

          //如果找到了用户及角色信息
          that.data.identityMap = res.data.data.userIdentity.loginUserAllIdentity
          that.data.identityTypes = res.data.data.identityTypes
          //判断本地是否有登陆角色缓存
          let localIdentity = wx.getStorageSync("identityType");
          if (localIdentity) {

            //判断角色，直接登陆
            if (localIdentity=="pcuser") {
              that.data.identityType = "pcuser"
              //pcuser微信登陆
              that.openIdLogin()

            } else if (localIdentity =="customer") {
              that.data.identityType = "customer"
              //customer微信登陆
              that.openIdLogin()

            } else if (localIdentity =="driver") {
              //司机微信登陆
              that.data.identityType = "driver"
              if (that.data.orgid){
                that.openIdLogin()
              }else{
                that.setData({
                  modelFlag:true
                })
              }
            }           

          } else {
            //角色选择data组装
            let selectData = []
            selectData = that.makeSelectIdentity(that.data.identityMap);
            //如果角色大于1个，则弹出选择
            if (selectData.length > 1) {
              that.setData({
                identitydata: selectData,
                identityVisible: true
              })
            } else {
              //判断角色，直接登陆
              if (that.data.identityTypes.contain("pcuser")) {
                that.data.identityType = "pcuser"
                //pcuser微信登陆
                that.openIdLogin()

              } else if (that.data.identityTypes.contain("customer")){
                that.data.identityType = "customer"
                //customer微信登陆
                that.openIdLogin()

              } else if (that.data.identityTypes.contain("driver")){
                //司机微信登陆
                that.data.identityType = "driver"
                if (that.data.orgid) {
                  that.openIdLogin()
                } else {
                  that.setData({
                    modelFlag: true
                  })
                }
              }
            }
          }
        }else{
          //如果没找到用户及角色信息，则手工登陆
          console.log(res.data.message)
        }
      }
    });
  },
  /**
   * 角色选择组合
   */
  makeSelectIdentity(identityMap){
    if (Object.keys(identityMap).length > 0) {
      let idatatemp = [];
      for (let key in identityMap) {
        let obj = {};
        if (key == "pcuser") {
          obj = {
            name: "货主",//this.identityMap[key].userName,
            oid: identityMap[key].id,
            loginType: "0",
            loginIdentityType: "pcuser"
          };
        } else if (key == "driver") {
          obj = {
            name: "司机", // 司机是一个列表，不同公司的司机
            oid: "driverId", // 还要选择哪个企业id
            loginType: "0",
            loginIdentityType: "driver"
          };
        } else if (key == "customer") {
          obj = {
            name: "货主",//this.identityMap[key].userName,
            oid: identityMap[key].id,
            loginType: "0",
            loginIdentityType: "customer"
          };
        }
        idatatemp.push(obj);        
      }
      return idatatemp;
    }
  }

})
