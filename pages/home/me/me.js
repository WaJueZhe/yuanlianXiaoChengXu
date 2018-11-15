// pages/home/home.js
import api from '../../../api.js'
import common from '../../../utils/common.js'

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

    scrollTop:50,

    normalImg:false,

    cardList: [],   //异常单数据
    pageNo: 1,
    pageSize: 10,
    pages: 0,
    tokenid: "",
    nomore: false,
    currentTimestamp: 0,

    checkList: [],   //卡片数据

    taskList: [],
    latitude:'',
    longitude:'',
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
    console.log("tab标签："+e.detail.current)
    if (e.detail.current == 0) {
      this.setData({
        pageNo: 1,
        pageSize: 10,
        pages: 0,
        nomore: false,
        currentTimestamp: 0,
        scrollTop: 50,
      })
      // this.getNewTask()
      this.getLocation()
    }
    if (e.detail.current == 1) {
      this.setData({
        pageNo: 1,
        pageSize: 10,
        pages: 0,
        nomore: false,
        currentTimestamp: 0,
        scrollTop: 50,
      })
      this.getCheckList()
    }
    if (e.detail.current == 2) {
      this.setData({
        pageNo: 1,
        pageSize: 10,
        pages: 0,
        nomore: false,
        currentTimestamp: 0,
        scrollTop: 50,
        cardList:[]
      })
      console.log('切换')
      this.getCardList()
    }
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
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

  //异常单请求数据
  getCardList() {
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: `${api.loadTaskList}?taskType=2&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        console.log(res)
        wx.hideLoading();
        if (res.data.code == 200) {
          this.setData({
            cardList: this.data.cardList.concat(res.data.data.result.records),
            pages: res.data.data.result.pages
          })
          if (this.data.pageNo >= this.data.pages) {
            // wx.showToast({
            //   title: '没有更多数据了',
            //   icon:'none',
            //   duration: 3000
            // });
            this.setData({
              nomore: true
            })
          }
        }
      }
    })
  },

  // 异常单的上拉加载更多
  normalLower() {
    var nowTimestamp = new Date().getTime();
    if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
      return;
    }
    this.data.currentTimestamp = nowTimestamp;
    console.log(this.data.pageNo);
    if (this.data.pageNo >= this.data.pages) {
      this.setData({
        nomore: true
      })
      return;
    }
    this.data.pageNo += 1;
    console.log("加载更多")
    this.getCardList();
  },
  // 异常单的下拉刷新
  normalUpper(){
      this.timer();
      clearInterval(time);
      let that = this;
      setTimeout(function(){
        that.setData({
          cardList: [],
          normalImg: true,
          pageNo: 1,
          pageSize: 10,
          nomore: false
        })
        that.getCardList();
      },2000)
     
  },

  timer(){
    let that = this;
    var time = setInterval(function(){
      clearInterval(time);
      that.setData({
        scrollTop: 50,
        normalImg: false,
      })
    },2000)
  },

  // 配送中请求数据
  getCheckList() {
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: `${api.loadTaskList}?taskType=1&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        console.log(res);
        wx.hideLoading();
        if (res.data.code == 200) {
          this.setData({
            checkList: this.data.checkList.concat(res.data.data.result.records),
            pages: res.data.data.result.pages
          })
          if (this.data.pageNo >= this.data.pages) {
            // wx.showToast({
            //   title: '没有更多数据了',
            //   icon:'none',
            //   duration: 3000
            // });
            this.setData({
              nomore: true
            })
          }
        }
      }
    })
  },

  // 配送中的上拉加载更多
  checkLower() {
    var nowTimestamp = new Date().getTime();
    if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
      return;
    }
    this.data.pageNo += 1;

    this.data.currentTimestamp = nowTimestamp;
    console.log(this.data.pageNo);
    if (this.data.pageNo >= this.data.pages) {
      // wx.showToast({
      //   title: '没有更多数据了',
      //   icon:'none',
      //   duration: 2000
      // });
      this.setData({
        nomore: true
      })
      return;
    }
    this.getCheckList();
  },
  // 配送中的下拉刷新
  checkUpper() {
    this.timer();
    clearInterval(time);
    let that = this;
    setTimeout(function () {
      that.setData({
        checkList: [],
        normalImg: true,
        pageNo: 1,
        pageSize: 10,
        nomore: false
      })
      that.getCheckList();
    }, 2000)

  },

  // 获取新任务列表
  getNewTask() {
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: `${api.loadTaskList}?taskType=0&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
      method: "POST",
      header: { tokenId: this.data.tokenid },
      success: res => {
        console.log('新任务');
        console.log(res);
        wx.hideLoading();
        if (res.data.code == 200) {
          //数字转成中文数字
          let tList = res.data.data.result.records;
          for (let i = 0; i < tList.length; i++) {
            tList[i].cnumber = this.SectionToChinese(i + 1)
            // 计算两点之间的距离
            tList[i].alldistance = common.GetDistance(this.data.longitude, this.data.latitude, tList[i].deliveryLongitudeX, tList[i].deliveryLongitudeY)
          }
          this.setData({
            taskList: this.data.taskList.concat(tList),
            pages: res.data.data.result.pages
          });
        }
      }
    })
  },

  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData(
          {
            latitude: res.latitude,
            longitude: res.longitude
          }
        )
        // console.log(that.data.latitude + "," + that.data.longitude)
        that.getNewTask()
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  //数字转成中文数字
  SectionToChinese(section) {
    var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    var chnUnitChar = ["", "十", "百", "千"];
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while (section > 0) {
      var v = section % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = chnNumChar[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = chnNumChar[v];
        strIns += chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    return chnStr;
  },

  // 新任务的上拉加载更多
  taskLower() {
    var nowTimestamp = new Date().getTime();
    if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
      return;
    }
    
    this.data.currentTimestamp = nowTimestamp;
    console.log(this.data.pageNo);
    if (this.data.pageNo >= this.data.pages) {
      // wx.showToast({
      //   title: '没有更多数据了',
      //   icon:'none',
      //   duration: 2000
      // });
      this.setData({
        nomore: true
      })
      return;
    }
    // this.getNewTask();
    this.getLocation()
    this.data.pageNo += 1;
    console.log(this.data.taskList)
  },
  // 新任务的下拉刷新
  taskUpper() {
    console.log('下拉刷新')
    this.timer();
    clearInterval(time);
    let that = this;
    setTimeout(function () {
      that.setData({
        normalImg: true,
        pageNo: 1,
        pageSize: 10,
        nomore: false,
        taskList: [],
      })
      // that.getNewTask();
      that.getLocation()
    }, 2000)

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
    if (option.active != null && option.active != undefined){
      this.setData({
        currentTab: option.active
      })
    }
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
    flag_hd = true;    //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
    this.setData({
      tokenid: wx.getStorageSync('tokenid'),
      taskList:[],
      cardList: [],   //异常单数据
      checkList: [],   //卡片数据
    });
    this.getLocation();
    // this.getNewTask()
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
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
