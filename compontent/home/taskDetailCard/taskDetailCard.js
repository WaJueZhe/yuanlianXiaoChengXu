// compontent/home/taskDetailCard/taskDetailCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cardNum: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 拨打电话
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

      // wx.navigateTo({
      //   url: "../../map/map?lng="+lng+"&lat="+lat
      // })
    }
  },
  ready() {

  }
})
