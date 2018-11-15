import api from '../../../../api.js'
var dateUtil = require('../../../../utils/dateUtil.js')

var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;
var app = getApp();
Page({
  /** 
   * 页面的初始数据
   */
  data: {
    active: 1,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,

    signerTel: '',
    searchKey: '',
    pageNo: 1,
    pageSize: 5,
    pages: 1,
    list0: [],
    list1: [],
    list2: [],
    task0_criteria: {},
    task1_criteria: {},
    task2_criteria: {}
  },


  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  swipclick: function (e) {
    console.log(123);

  },

  lower: function () {
    // console.log(1233);

  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
    this.clearData()
    this.query(this.data.currentTab)
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      this.clearData()
      this.query(this.data.currentTab)
    }
  },

  exFun() {
    this.onReachBottom()
  },

  clearData() {
    this.setData({
      pageNo: 1,
      pageSize: 5,
      pages: 0,
      list0: [],
      list1: [],
      list2: []
    })
  },

  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  ooterTap: app.footerTap,
  // tab栏切换事件
  clkTab(e) {
    //获取从tab栏组件传输过来的index值
    let index = e.detail.index
    if (index == 1) {
      this.setData({
        active: 1
      })
    } else if (index == 2) {
      this.setData({
        active: 2
      })
    } else if (index == 3) {
      this.setData({
        active: 3
      })
    }
  },
  onTap(e) {
    // console.log(e.target.id)
    let index = e.target.id;
    var myEventDetail = { index } // detail对象，提供给事件监听函数
    var myEventOption = { composed: true } // 触发事件的选项
    this.triggerEvent('myclkTab', myEventDetail, myEventOption)
  },

  query(val) {
    console.log("tab页：" + val)
    let signerTimeEnd = dateUtil.nowDay()
    let signerTimeBegin = dateUtil.addDay(-365)
    let task0_criteria = {
      "signerTel": this.data.signerTel, "signerTimeBegin": signerTimeBegin, "signerTimeEnd": signerTimeEnd,
      "searchKey": this.data.searchKey, "isNonSigned": "1", "pageNo": this.data.pageNo, "pageSize": this.data.pageSize
    };
    let task1_criteria = {
      "signerTel": this.data.signerTel, "signerTimeBegin": signerTimeBegin, "signerTimeEnd": signerTimeEnd,
      "searchKey": this.data.searchKey, "isCompleted": "0", "pageNo": this.data.pageNo, "pageSize": this.data.pageSize
    };
    let task2_criteria = {
      "signerTel": this.data.signerTel, "signerTimeBegin": signerTimeBegin, "signerTimeEnd": signerTimeEnd,
      "searchKey": this.data.searchKey, "isCompleted": "1", "pageNo": this.data.pageNo, "pageSize": this.data.pageSize
    };

    let p = {}

    switch (val) {
      case 0: p = task0_criteria
        break;
      case 1: p = task1_criteria
        break;
      case 2: p = task2_criteria
        break;
      default: p = task0_criteria
        break;
    }


    let that = this
    wx.request({
      url: `${api.baseurl}/shipment/findListBydDeliverMob`,
      data: p,
      method: "POST",
      header: { tokenId: wx.getStorageSync('tokenid') },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          // this.setData({
          //   list: that.data.list.concat(res.data.data.shipments.records),
          //   pages: res.data.data.shipments.pages,
          // })
          switch (val) {
            case 0:
              that.setData({
                list0: that.data.list0.concat(res.data.data.shipments.records),
                pages: res.data.data.shipments.pages
              })
              break;
            case 1:
              that.setData({
                list1: that.data.list1.concat(res.data.data.shipments.records),
                pages: res.data.data.shipments.pages
              })
              break;
            case 2:
              that.setData({
                list2: that.data.list2.concat(res.data.data.shipments.records),
                pages: res.data.data.shipments.pages
              })
              break;
            default:
              break;
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        var clientWidth = res.windowWidth;
        var rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 80;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    })

    this.data.signerTel = wx.getStorageSync('phone')
    this.query(0)
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {

    this.setData({
      pageNo: this.data.pageNo + 1,
    })

    if (this.data.pageNo > this.data.pages) {
      this.setData({
        nomore: true
      })
      return;
    }


    wx.showLoading({
      title: '加载中...',
      duration: 2000
    });
    let that = this;
    setTimeout(function () {
      if (that.data.pageNo > that.data.pages) {
        that.setData({
          nomore: true
        })
        return;
      }
      that.query(that.data.currentTab);
    }, 2000)
  },
  onShow: function () {
    flag_hd = true;    //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('页面渲染')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('页面显示')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('页面卸载')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   console.log('下拉')
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
