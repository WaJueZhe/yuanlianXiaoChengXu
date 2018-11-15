// pages/c_pages/driver/driver.js
import api from '../../../api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchStr:'',
    identityType: '',//判断身份
    searchStr: '',
    pages: 0,
    indexNo: 1,
    pageSize: 10,
    list: [],
    nomore:false,

    inWay:'',
  },

  setSearchStr(e){
    this.setData({
      searchStr: e.detail.value
    })
  },

  pc_user() {
    let params = {
      "currentPage": this.data.indexNo,
      "pageSize": this.data.pageSize,
      searchByKeys: {
        searchStr: this.data.searchStr
      },
      orderByKeys: { createDate: "desc" }
    };
    
    wx.request({
      url: `${api.baseurl}/driver/findDriverPage`,
      data: params,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          this.setData({
            list: this.data.list.concat(res.data.data.result.content),
            pages: res.data.data.result.totalPage
          })
        } else {
          Toast(res.data.message);
        }
      }
    })
  },

  c_user(){
    let params = {
      'currentPage': this.data.indexNo,
      'pageSize': this.data.pageSize,
      'searchStr': this.data.searchStr
    };
    wx.request({
      url: `${api.baseurl}/c_driver/findDriverPage`,
      data: params,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            list: this.data.list.concat(res.data.data.result.records),
            pages: res.data.data.result.pages
          })
        } else {
          Toast(res.data.message);
        }
      }
    })
  },

  init(){
    switch (wx.getStorageSync('identityType')) {
      case 'pcuser':
        this.pc_user();
        break;
      case 'customer':
        this.c_user();
        break;
      default:
        break;
    }
  },

  //删除
  delete(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let param = { id: e.currentTarget.dataset.id }
          let deleteUrl = '';
          switch (wx.getStorageSync('identityType')) {
            case 'pcuser':
              deleteUrl = `${api.baseurl}/driver/delete`
              break;
            case 'customer':
              deleteUrl = `${api.baseurl}/c_driver/delete`
              break;
            default:
              break;
          }
          
          wx.request({
            url: deleteUrl,
            data: param,
            header: { tokenId: wx.getStorageSync('tokenid') },
            method: "POST",
            success: res => {
              console.log(res)
              if (res.data.code == 200) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'none',
                  duration: 2000
                })
                that.searchDriver()
              }
            }
          })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //编辑
  compile(e){
    console.log(e)
    app.driverList = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '../compileDriver/compileDriver',
    })
  },

  //点击查询
  searchDriver(){
    this.setData({
      indexNo: 1,
      list:[],
    })
    this.init()
  },

  //加载更多
  loadMore(){

  },
  
  //选择司机
  choseDriver(e){
    if (this.data.inWay == 'searchDriver') {
      let item = e.currentTarget.dataset.text;
      console.log(item)
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      let temp = 'task.driverId'
      prevPage.setData({
        [temp]: item.id
      })

      temp = 'task.driverName'
      prevPage.setData({
        [temp]: item.driverName
      })

      temp = 'task.driverMobile'
      prevPage.setData({
        [temp]: item.driverMobile
      })

      wx.navigateBack({
        url: '../createTask/createTask'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    if(e.isChoose=='true'||e.isChoose==true){
      this.setData({
        inWay: 'searchDriver'
      })
    }
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
    this.setData({
      list: [],
      indexNo:1
    })
    this.init();
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
    wx.showLoading({
      title: '加载中...',
      duration: 3000
    });
    let that = this;
    setTimeout(function () {
      that.setData({
        indexNo: 1,
        list: []
      })
      that.init();
    }, 3000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      indexNo: this.data.indexNo + 1,
    })
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    });
    let that = this;
    setTimeout(function () {
      if (that.data.indexNo >= that.data.pages) {
        that.setData({
          nomore: true
        })
        return;
      }
      that.init();
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})