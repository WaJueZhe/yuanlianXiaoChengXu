// compontent/modifyBox/modifyBox.js
Component({

  properties: {

  },
  /**
   * 页面的初始数据
   */
  data: {
    value: 0,
    isClose: true
  },

  methods: {
    setValue(e) {
      this.setData({
        value: e.detail.value
      })
    },

    //加
    jiaNum() {
      this.setData({
        value: String(Number(this.data.value) + 1),
      })
    },

    //减
    jianNum() {
      if (Number(this.data.value) == 0 || this.data.value == null || this.data.value == "") {
        return false;
      }
      this.setData({
        value: String(Number(this.data.value) - 1),
      })
    },

    // 确认修改
    _cancelEvent() {
      var myEventDetail = this.data.value // detail对象，提供给事件监听函数
      //触发取消回调,把方法传过去给组件用
      this.triggerEvent("cancelEvent", myEventDetail);
    },

    _toggle(){
      this.triggerEvent("toggle");
    }
  },
})