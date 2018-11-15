// compontent/home/task/task.js
import common from '../../../utils/common.js'
var api = require('../../../api.js')
// var change = require('../../../utils/numberUtil.js')
var mapUtil = require('../../../utils/mapUtil.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taskList:Array,
    nomore:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    // taskList: [],
    // pageNo: 1,
    // pageSize: 5,
    // tokenid: "",
    // nomore: false,
    // pages: 0,
    // currentTimestamp: 0,
    // latitude:'',
    // longitude:'',
    // imgUrls: [],
    // swiperCurrent: 0,
    // indicatorDots: true,
    // autoplay: true,
    // interval: 4000,
    // duration: 1500,
    // circular: true,

    // scrollTop:400
  },

 
  /**
   * 组件的方法列表
   */
  // methods: {
    /*点击刷新 */
    // refresh() {
    //   this.setData({
    //     taskList:[],
    //     pageNo: 1,
    //     pageSize: 5,
    //     nomore: false
    //   });
    //   this.getNewTask()
    // },
    //数字转成中文数字
    // SectionToChinese(section){
    //   var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    //   var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    //   var chnUnitChar = ["", "十", "百", "千"];
    //   var strIns = '', chnStr = '';
    //   var unitPos = 0;
    //   var zero = true;
    //   while(section > 0) {
    //     var v = section % 10;
    //     if (v === 0) {
    //       if (!zero) {
    //         zero = true;
    //         chnStr = chnNumChar[v] + chnStr;
    //       }
    //     } else {
    //       zero = false;
    //       strIns = chnNumChar[v];
    //       strIns += chnUnitChar[unitPos];
    //       chnStr = strIns + chnStr;
    //     }
    //     unitPos++;
    //     section = Math.floor(section / 10);
    //   }
    //     return chnStr;
    // },
    // //上拉刷新加载更多
    // scrollToLower() {
    //   var nowTimestamp = new Date().getTime();
    //   if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
    //     return;
    //   }
    //   this.data.pageNo += 1;
    //   this.data.currentTimestamp = nowTimestamp;
    //   console.log(this.data.pageNo);
    //   if (this.data.pageNo > this.data.pages) {
    //     this.setData({
    //       nomore: true
    //     })
    //     return;
    //   }
    //   this.getNewTask();
    // },
    // 获取任务列表
    // getNewTask() {
    //   wx.showLoading({
    //     title: '加载中...'
    //   });
    //   wx.request({
    //     url: `${api.default.loadTaskList}?taskType=0&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
    //     method: "POST",
    //     header: { tokenId: this.data.tokenid },
    //     success: res => {
    //       wx.hideLoading();
    //       if (res.data.code == 200){
    //         console.log(res);

    //         //数字转成中文数字
    //         let tList = res.data.data.result.records;
    //         for (let i = 0; i < tList.length;i++){
    //           tList[i].cnumber = this.SectionToChinese(i + 1)
    //           // 计算两点之间的距离
    //           tList[i].alldistance = common.GetDistance(this.data.longitude,this.data.latitude,  tList[i].deliveryLongitudeX, tList[i].deliveryLongitudeY)
    //         }
    //         this.setData({
    //           taskList: this.data.taskList.concat(tList),
    //           pages: res.data.data.result.pages
    //         });
    //         if (this.data.pageNo >= this.data.pages) {
    //           // wx.showToast({
    //           //   title: '没有更多数据了',
    //           //   icon:'none',
    //           //   duration: 3000
    //           // });
    //           this.setData({
    //             nomore: true
    //           })
    //         }

    //       }
    //     }
    //   })
    // },
    //接单操作
    // takeTask(e) {
    //   let that =this
    //   wx.request({
    //     url: `${api.default.confirmTask}?taskId=${e.target.id}`,
    //     method: "POST",
    //     header: { tokenId: this.data.tokenid },
    //     success: res => {
    //       if (res.data.success) {
    //         wx.showToast({
    //           title: '接单成功',
    //           icon: 'success',
    //           duration: 4500,
    //           complete:function(r){
    //             setTimeout(function () {
    //               that.setData({
    //                 taskList: [],
    //                 pageNo: 1,
    //                 nomore: false,
    //                 pages: 0,
    //                 currentTimestamp: 0
    //               })
    //               that.getNewTask()
    //               wx.navigateTo({
    //                 url: `../checkDetail/checkDetail?taskid=${e.target.id}`
    //               }) 
    //             }, 1500)
    //           }
    //         })
    //       }else{
    //         wx.showToast({
    //           title: '接单失败',
    //           icon: 'success',
    //           duration: 4000
    //         });
    //       }
    //     }
    //   })
    // },
    // loadNewsList() {
    //   let param = {
    //     isSend: "1",
    //     pageNo: 1,
    //     pageSize: 10
    //   }; 
    //   let _this = this;
    //   _this.setData({
    //     imgUrls: []
    //   });
    //   wx.request({
    //     url: `${api.default.baseurl}/msgArticle/findArticleList`,
    //     method: "POST",
    //     header: { tokenId: this.data.tokenid },
    //     data: param,
    //     success: res => {
    //       if (res.data.success) {
    //         let toplist = res.data.data.topList.records;
    //         let list = res.data.data.generalList.records;
    //         let titles = [];
    //         for (let i = 0; i < toplist.length; i++) {
    //           titles.push(toplist[i].articleTitle);
    //         }
    //         for (let i = 0; i < list.length; i++) {
    //           titles.push(list[i].articleTitle);
    //         }
    //         _this.setData({
    //           imgUrls: titles
    //         });

    //       } else {
    //         console.log("加载失败!");
    //       }
    //     }
    //   });
    // },
    // getLocation(){
    //   var that=this;
    //   wx.getLocation({
    //     type: 'wgs84',
    //     success: function (res) {
    //       that.setData(
    //         {
    //           latitude: res.latitude,
    //           longitude: res.longitude
    //         }
    //       )
    //       // console.log(that.data.latitude + "," + that.data.longitude)
    //       that.getNewTask()
    //     },
    //     fail:function(res){
    //       console.log(res);
    //     }
    //   })
    // },
    // announcement(){
    //   wx.navigateTo({
    //     url:'../../../pages/message/message'
    //   })
    // },

    // scrollToUpper(){
    //   console.log('下拉加载')
    // },
    
  // },
  // // //发送ajax请求
  // attached() {
    
  // },

  // ready(){
  //   //获取tokenid
  //   this.setData({
  //     tokenid: wx.getStorageSync('tokenid')
  //   })
  //   // this.getLocation()
  //   // this.loadNewsList()
  // },
  // moved(){
  //   // console.log('move')
  //   // this.getLocation()
  // },
  // detached(){
  //   // console.log('detached')
  // }
})
