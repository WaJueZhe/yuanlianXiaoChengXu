// pages/map/map.js

// var maplatitude = null;
// var maplongitude = null;
// wx.getLocation({
//   // type: 'gcj02',
//   success: function (res) {
//     res.latitude = maplatitude;
//     res.longitude = maplongitude;
//     console.log(maplatitude)
//     console.log(res)
//   },
// })

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mapWidth: "",
    mapHeight: "", //地图的宽高
    markers: [],
    polyline:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取设备信息,设置地图的宽高
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          mapWidth: res.screenWidth + 'px',
          mapHeight: res.screenHeight + 'px'
        })
      },
    });

    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let marke1 = {
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          iciconPath: "/img/map_icon.png",
          width: 50,
          height: 50,
          label:{
            content:'当前位置',
            color:'#CD2626'
          }
        }
        this.setData({
          markers: this.data.markers.concat(marke1)
        })

        let marke2 = {
          id: 1,
          latitude: options.lat,
          longitude: options.lng,
          iciconPath: "/img/map_icon.png",
          width: 50,
          height: 50,
          label: {
            content: '目标位置',
            color: '#CD2626'
          }
        }

        this.setData({
          markers: this.data.markers.concat(marke2)
        })
        console.log(this.data.markers)
      },
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