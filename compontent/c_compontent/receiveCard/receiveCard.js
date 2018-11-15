// compontent/home/checkDetailCard/checkDetailCard.js
import api from '../../../api.js'
// var Stomp = require('../../../../utils/stomp.min.js').Stomp;
// var client = Stomp.over(api.socketurl);
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    task_criteriaStr:Array,
    nomore:{
      type: Boolean   ////必填，目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tokenid: "",
    nomoreText:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //上拉加载更多
    scrollToLower() {
      this.triggerEvent("action");
      // var nowTimestamp = new Date().getTime();
      // if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
      //   return;
      // }
      // this.data.page += 1;
      // this.data.currentTimestamp = nowTimestamp;
      // console.log(this.data.page);
      // if (this.data.page >= this.data.total) {
      //   this.setData({
      //     nomore: true
      //   })
      //   return;
      // }
      // wx.showLoading({
      //   title: '加载中...',
      //   duration: 2000
      // });
      // let that = this;
      // setTimeout(function () {
      //   // that.init()
      //   this.triggerEvent("action");
      // }, 2000)

    },
  },
  attached() {
    this.setData({
      tokenid: wx.getStorageSync('tokenid'),
    });
  },
  created() {
    console.log(this.properties.nomore)
  }
})
