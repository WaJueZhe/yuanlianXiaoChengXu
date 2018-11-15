// compontent/common/canvas/canvas.js
import api from '../../../api.js';
// canvas 全局配置
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
wx.getSystemInfo({
  success: function (res) {
    canvasw = res.screenWidth;//设备宽度
    canvash = 300;
  }
});
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stopId: String,
    fahuo: String,
    exception: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    src: "",
    longitudeX:"",
    latitudeY:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    canvasIdErrorCallback: function (e) {
      console.error(e.detail.errMsg)
    },
    //开始绘制
    canvasStart: function (event) {
      isButtonDown = true;
      arrz.push(0);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
    },
    // 手指开始移动
    canvasMove: function (event) {
      if (isButtonDown) {
        arrz.push(1);
        arrx.push(event.changedTouches[0].x);
        arry.push(event.changedTouches[0].y);
      };
      for (var i = 0; i < arrx.length; i++) {
        if (arrz[i] == 0) {
          context.moveTo(arrx[i], arry[i])
        } else {
          context.lineTo(arrx[i], arry[i])
        };

      };
      context.clearRect(0, 0, canvasw, canvash);
      context.stroke();
      context.draw(true);
    },
    // 手指离开屏幕
    canvasEnd: function (event) {
      isButtonDown = false;
    },
    // 清除画布
    cleardraw: function () {
      arrx = [];
      arry = [];
      arrz = [];
      context.clearRect(0, 0, canvasw, canvash);
      context.draw(true);
    },
    // 保存图片
    getimg() {
      if (arrx.length == 0) {
        wx.showModal({
          title: '提示',
          content: '签名内容不能为空！',
          showCancel: false
        });
        return false;
      };
      var that = this
      //生成图片 ----
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        fileType: 'png',
        destWidth: 100,
        destHeight: 100,
        success: function (res) {
          that.setData({
            src: res.tempFilePath
          })
          console.log('******成功截取******')
          console.log(res)
          let path = res.tempFilePath
          console.log("stopId:" + that.properties.stopId)
          //站点起运
          wx.uploadFile({
            url: `${api.baseurl}/taskStop/stopBegin`,
            filePath: path,
            name: 'file',
            formData: {
              'stopId': that.properties.stopId,
              'longitudeX': that.data.longitudeX,
              'latitudeY': that.data.latitudeY
            },
            header: { 
              "Content-Type": "multipart/form-data", 
              'tokenId': wx.getStorageSync('tokenid') 
              },
            success: res => {
              console.log(res)
              let redata = JSON.parse(res.data)
              if (redata.success) {
                wx.showToast({
                  title: '起运成功',
                  icon: 'success',
                  duration: 4500,
                  complete: function (r) {
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 1500)
                  }
                })
              } else {
                wx.showToast({
                  title: '起运失败',
                  icon: 'success',
                  duration: 4000
                });
              }

            },
            fail: function (res) {
              console.log("失败");
              console.log(res)
            }
          })


        },
        fail: function () {
          console.log('********失败截取*********')
        }
      }, this)
    },
    getLocation() {
      var that = this;
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          that.setData(
            {
              latitudeY: res.latitude,
              longitudeX: res.longitude
            }
          )
          console.log("获取位置信息:")
          console.log(that.data.longitudeX + "," + that.data.latitudeY)
          // that.getNewTask()
        },
        fail: function (res) {
          console.log(res);
        }
      })
    },

    //确认签名
    expSign(){
      if (arrx.length == 0) {
        wx.showModal({
          title: '提示',
          content: '签名内容不能为空！',
          showCancel: false
        });
        return false;
      };
      console.log(333)
    }
  },
  ready: function (option) {
    this.getLocation()
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('canvas', this);
    context.beginPath()
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');

  }
})
