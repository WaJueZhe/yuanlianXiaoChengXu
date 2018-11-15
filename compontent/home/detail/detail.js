// compontent/home/detail/detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

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
    }
  }
})
