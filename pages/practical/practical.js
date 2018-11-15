// pages/practical/practical.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 1000, //备注最多字数
    arr: ['货差', '货损', '其他'],
    modalBox: true,
    formItemIndex: 0,
    expList: {
      itemName: '',
      itemCode: '',
      quantity: '',
      exceptionType: ''
    },
    list:[
      {
        itemName: '',
        itemCode: '',
        quantity: '',
        exceptionType: ''
      }
    ],
  },

  //增加
  addText(){
    this.data.list.push(this.data.expList);
    this.setData({
      list: this.data.list
    })
    console.log(this.data.list)
  },

  //删除
  delText(e){
    console.log(e)
    if (this.data.list.length == 1) {
      return;
    }
    var list = this.data.list;
    list.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      list: list
    })
  },

  setItemName(e){
    console.log(e)
    var name = 'expList.itemName';
    this.setData({
      [name]: e.detail.value
    })
    console.log(this.data.expList.itemName)
  },

  // setItemCode(e) {
  //   console.log(e)
  //   var name = 'expList.itemCode';
  //   this.setData({
  //     [name]: e.detail.value
  //   })
  //   console.log(this.data.expList.itemCode)
  // },

  // setQuantity(e) {
  //   console.log(e)
  //   var name = 'expList.quantity';
  //   this.setData({
  //     [name]: e.detail.value
  //   })
  //   console.log(this.data.expList.quantity)
  // },

  //计算编写的字数
  bindWordLimit(e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.noteMaxLen) return;

    this.setData({
      currentNoteLen: len //当前字数
    });
  },

  //异常类型出现
  selectBox(e) {
    this.setData({
      formItemIndex: e.target.dataset.index,
      modalBox: false,
    })
  },

  //异常类型弹框隐藏
  choiceBox(e) {
    this.setData({
      modalBox: true,
    })
  },

  //选择异常类型弹框
  description(e){
    console.log(e)
    switch (e.target.dataset.text) {
      case '货损':
        var exceptionType = "expList[" + this.data.formItemIndex + "].exceptionType"
        this.setData({
          [exceptionType]: 1
        })
        break;
      case '货差':
        var exceptionType = "expList[" + this.data.formItemIndex + "].exceptionType"
        this.setData({
          [exceptionType]: 2
        })
        break;
      default:
        var exceptionType = "expList[" + this.data.formItemIndex + "].exceptionType"
        this.setData({
          [exceptionType]: 9
        })
        break;
    }
    console.log(this.data.expList)
    this.setData({
      modalBox: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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