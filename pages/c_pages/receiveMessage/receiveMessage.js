
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      unitNo:'1',
      plannedGoodsValue:'0.00',
      unitDesc: '',
      plannedUnits: '',
      plannedVolume: '',
      plannedWeight: ''
    },
    name:'',
    quantity:'',
    volume:'',
    weight:'',

    wg:[]
  },

  setName(e){
    let temp = 'item.unitDesc'
    this.setData({
      [temp]:e.detail.value
    })
  },
  setQuantity(e) {
    let temp = 'item.plannedUnits'
    this.setData({
      [temp]: e.detail.value
    })
  },
  setVolume(e) {
    let temp = 'item.plannedVolume'
    this.setData({
      [temp]: e.detail.value
    })
  },
  setWeight(e) {
    let temp = 'item.plannedWeight'
    this.setData({
      [temp]: e.detail.value
    })
  },

  //确定
  confirm(){
    if (this.data.item.unitDesc != '' && this.data.item.plannedUnits != '' && this.data.item.plannedVolume != '' && this.data.item.plannedWeight != ''){

      //负数判断
      if (this.data.item.plannedUnits <= 0 || this.data.item.plannedVolume <= 0 || this.data.item.plannedWeight <=0){
        wx.showToast({
          title: '数字必须大于0',
          icon: 'none',
          duration: 1000
        })
        return 
      }

      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      let temp = 'shpTemp.shipmentUnitList'
      prevPage.setData({
        [temp]: prevPage.data.shpTemp.shipmentUnitList.concat(this.data.item)
      })

      // prevPage.setData({
      //   shipmentUnitList: prevPage.data.shipmentUnitList.concat(this.data.item)
      // })
      
      wx.navigateBack({
        delta: 1,
      })



    }else{
      wx.showToast({
        title: '货物信息不完整',
        icon: 'none',
        duration: 1000
      })
    }
  },

  //取消
  cancle() {
    wx.navigateBack({
      delta: 1,
    })
    // wx.navigateTo({
    //   url: '../addWaybill/addWaybill',
    // })
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