// compontent/common/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    actived:{
      type:Number
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
    onTap(e){
      // console.log(e.target.id)
      let index = e.target.id;
      var myEventDetail = {index} // detail对象，提供给事件监听函数
      var myEventOption = { composed: true} // 触发事件的选项
      this.triggerEvent('myclkTab', myEventDetail, myEventOption)
    }
  }
})
