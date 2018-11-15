// compontent/home/normal/normal.js
import api from '../../../api.js'
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    cardList:Array,
    nomore:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    // cardList: [],   //卡片数据
    // pageNo: 1,
    // pageSize: 5,
    // pages:0,
    // tokenid: "",
    // nomore:false,
    // currentTimestamp:0,
    // scrollToupperTimeStamp: 0,
    // imgUrls: [],
    // swiperCurrent: 0,
    // indicatorDots: true,
    // autoplay: true,
    // interval: 3000,
    // duration: 800,
    // circular: true,
  },


  /**
   * 组件的方法列表
   */
  // methods: {
    // scrollToUpper() {
    //   let self = this;
    //   var nowTimestamp = new Date().getTime();
    //   if (parseInt(nowTimestamp - this.data.scrollToUpperTimestamp) < 3000) {
    //     return;
    //   }

    //   this.data.scrollToUpperTimestamp = nowTimestamp;
    //   wx.startPullDownRefresh({
    //     success: function () {
    //       //这里请求页面数据，赋值刷新页面

    //       console.log(123)
    //       setTimeout(function () {
    //         wx.showToast({
    //           title: '加载中...',
    //           icon: 'loading',
    //           duration: 3000
    //         });
    //         self.getCardList()
    //         self.data.scrollToUpperTimestamp = new Date().getTime();
    //         wx.stopPullDownRefresh();
    //       }, 1000)


    //     }
    //   });
    // },
    /**
     * 加载更多
     */
    scrollToLower(){

      var nowTimestamp = new Date().getTime();
      if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000 ) {
        return;
      }
      this.data.pageNo +=1;
      
      this.data.currentTimestamp = nowTimestamp;
      console.log(this.data.pageNo);
      if (this.data.pageNo > this.data.pages){
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
      this.getCardList();
    },
    //请求数据
    // getCardList() {
    //   wx.showLoading({
    //     title:'加载中...'
    //   });
    //   wx.request({
    //     url: `${api.loadTaskList}?taskType=2&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
    //     method: "POST",
    //     header: { tokenId: this.data.tokenid },
    //     success: res => {
    //       wx.hideLoading();
    //       if (res.data.code == 200) {
    //         this.setData({
    //           cardList: this.data.cardList.concat(res.data.data.result.records),
    //           pages: res.data.data.result.pages
    //         })
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
    //     url: `${api.baseurl}/msgArticle/findArticleList`,
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
    /*点击刷新 */
    // refresh(){
    //   this.setData({
    //     cardList: [],
    //     pageNo: 1,
    //     pageSize: 5,
    //     nomore: false
    //   });
    //   this.getCardList()
    // },
    // announcement() {
    //   wx.navigateTo({
    //     url: '../../../pages/message/message'
    //   })
    // }
  // },
  // attached() {
  //   this.setData({
  //     tokenid: wx.getStorageSync('tokenid')
  //   })
  // },
  // ready() {
  //   this.setData({
  //     cardList:[]
  //   })
  //   this.getCardList()
  //   this.loadNewsList()
  // }
})
