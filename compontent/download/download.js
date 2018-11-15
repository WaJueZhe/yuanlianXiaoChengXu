Component({

  properties: {

  },
  data: {
  },
  methods:{
    _cancelEvent() {
      //触发取消回调,把方法传过去给组件用
      this.triggerEvent("cancelEvent");
    },
  }
})