// compontent/home/checkDetailCard/checkDetailCard.js
import api from '../../../api.js'
// var Stomp = require('../../../../utils/stomp.min.js').Stomp;
// var client = Stomp.over(api.socketurl);
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carkList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tokenid: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 到货切换
    succMethod(e) {
      // 获取用户当前的地理信息
      var longitudeX = null;
      var latitudeY = null;
      var that = this;
      wx.getLocation({
        success: (res) => {
          longitudeX = res.longitude.toString();
          latitudeY =  res.latitude.toString();
          console.log(longitudeX + "," + latitudeY)
          wx.request({
            url: `${api.stopEnd}`,
            data:{
              stopId: e.target.id,
              longitudeX: longitudeX,
              latitudeY: latitudeY
            },
            method: "POST",
            header: { tokenId: this.data.tokenid },
            success: res => {
              if (res.data.success) {
                wx.showToast({
                  title: '到站打卡成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '到站打卡失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail:function(res){
              wx.showToast({
                title: '打卡出现了点意外',
                icon: 'none',
                duration: 2000
              })
            },
            complete:function(res){
              // 刷新页面
              setTimeout(function(){
                that.triggerEvent('getCardList', {}, {})
              },1500)
            }
          })
        },
      })
    },
    // 起运事件
    startTask(e) {
      console.log(e)
      let signTime = e.target.dataset.signtime;
      if (signTime != null && signTime != undefined && signTime!=''){
        wx.navigateTo({
          url: '../startTask/startTask?stopId=' + e.target.id,
        })
      }else{
        wx.showToast({
          title: '未签发，不能起运',
          icon: 'none',
          duration: 2000
        })
      }
    },
    //拨打电话
    callPhone(e) {
      wx.makePhoneCall({
        phoneNumber: e.target.dataset.phonenum,
      })
    },
    //查看地图
    watchMap(e) {
      wx.openLocation({
        latitude: Number(e.target.dataset.lat),
        longitude: Number(e.target.dataset.lng),
        name: e.target.dataset.name,
        address: e.target.dataset.addr,
        scale: 28
      })
    },
    //切换二维码的显示与隐藏
    toggleCodeR(e) {
      console.log(e)
      let actualdate = e.target.dataset.actualdate
      if (actualdate != null && actualdate != undefined && actualdate != ''){
        let text = `${api.baseurl}/wx/wx_mpredirect?reurl=sign_begin&params=sign,` + e.target.id;
        // 向子组件传值
        this.triggerEvent('toggleCodeR', { text }, { composed: true })
      }else{
        wx.showToast({
          title: '未到货，不能签收',
          icon: 'none',
          duration: 2000
        })
      }
    },
    toggleCodeS(e) {
      let text = `${api.baseurl}/wx/wx_mpredirect?reurl=sign_begin&params=lssue,` + e.target.id;
      // 向子组件传值
      this.triggerEvent('toggleCodeS', { text }, { composed: true })
    },
    //异常签收待确认
    abnormal(e){
      console.log(e)
      wx.navigateTo({
        url: '../../../pages/abnormal/abnormal?stopId=' + e.target.id,
      })
    }
  },
  attached() {
    this.setData({
      tokenid: wx.getStorageSync('tokenid')
    })
  }
})
