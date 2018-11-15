// pages/home/checkDetail/checkDetail.js
import api from '../../../api.js';
import QR from '../../../utils/qrcode.js'
import common from '../../../utils/common.js'
// import ws from '../../../utils/websocket.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskid: "",
    tokenid: "",
    pageNo: 1,
    pageSize: 1000,
    carkList: [],
    statsPage: {},
    codeShow: true, //控制二维码弹框的显示
    isSend:true
  },

  

  codeToggleR(e) {
    // 接收子组件传输过来的值
    // console.log(e.detail.text)
    let text = e.detail.text;
    // 绘制二维码
    QR.api.draw(text, "mycanvas", 200, 200);
    this.setData({
      codeShow: !this.data.codeShow,
      isSend:false,
      position: 'fixed'
    })
  },
  codeToggleS(e) {
    // 接收子组件传输过来的值
    // console.log(e.detail.text)
    let text = e.detail.text;
    // 绘制二维码
    QR.api.draw(text, "mycanvas", 200, 200);
    this.setData({
      codeShow: !this.data.codeShow,
      isSend:true,
      position: 'fixed'
    })
  },

  // 点击遮罩层隐藏
  showCode() {
    this.setData({
      codeShow: true,
      position: 'none'
    })
    this.getDetailPage()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskid: options.taskid,
      tokenid: wx.getStorageSync('tokenid')
    })

    // this.getDetailPage()

    // console.log(common.GetDistance(113.174, 23.396, 114.25, 25.65))
  },

  // 默认渲染事件
  getDetailPage() {
    wx.request({
      url: `${api.loadStopList}?taskId=${this.data.taskid}&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        if (res.data.success) {
          let cordList = res.data.data.result.records;
          let num = 1;
          var latitude = null;
          var longitude = null;
          // 获取当前位置信息
          wx.getLocation({
            type: 'wgs84',
            success: (r) => {
              console.log(r)
              latitude = r.latitude //纬度
              longitude = r.longitude  //经度

              // 拓展,修改数据对象
              for (var i = 0; i < cordList.length; i++) {
                cordList[i].length = cordList.length;
                cordList[i].number = num++;
                cordList[i].totalUnits = cordList[i].totalUnits;
                cordList[i].totalVolume = cordList[i].totalVolume;
                cordList[i].totalWeight = cordList[i].totalWeight;
                // 计算两点之间的距离
                cordList[i].alldistance = common.GetDistance(longitude,latitude, cordList[i].longitudeX, cordList[i].lantitudeY)
              }
              this.setData({
                carkList: cordList,
                statsPage: res.data.data.bsTask
              })
            }
          })
        }
      }
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
    this.getDetailPage()
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
    this.getDetailPage()
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