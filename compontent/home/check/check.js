// compontent/home/check/check.js
import api from '../../../api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkList:Array,
    nomore:String
  },

  /** 
   * 组件的初始数据
   */
  data: {
    // checkList: [],   //卡片数据
    // pageNo: 1,
    // pageSize: 5,
    // tokenid: "",
    // nomore: false,
    // pages: 0,
    // currentTimestamp: 0,
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
    /*点击刷新 */
    refresh() {
      this.setData({
        checkList: [],
        pageNo: 1,
        pageSize: 5,
        nomore: false
      });
      this.getCardList()
    },
    /*下拉刷新 */
    scrollToLower() {
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
        //   duration: 3000
        // });
        this.setData({
          nomore: true
        })
        this.data.nomore = true;
        return;
      }
      this.getCardList();
    },
    loadNewsList() {
      let param = {
        isSend: "1",
        pageNo: 1,
        pageSize: 10
      };
      let _this = this;
      _this.setData({
        imgUrls: []
      });
      wx.request({
        url: `${api.baseurl}/msgArticle/findArticleList`,
        method: "POST",
        header: { tokenId: this.data.tokenid },
        data: param,
        success: res => {
          if (res.data.success) {
            let toplist = res.data.data.topList.records;
            let list = res.data.data.generalList.records;
            let titles = [];
            for (let i = 0; i < toplist.length; i++) {
              titles.push(toplist[i].articleTitle);
            }
            for (let i = 0; i < list.length; i++) {
              titles.push(list[i].articleTitle);
            }
            _this.setData({
              imgUrls: titles
            });

          } else {
            console.log("加载失败!");
          }
        }
      });
    },
    //请求数据
    // getCardList() {
    //   wx.showLoading({
    //     title: '加载中...'
    //   });
    //   wx.request({
    //     url: `${api.loadTaskList}?taskType=1&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
    //     method: "POST",
    //     header: { tokenId: this.data.tokenid },
    //     success: res => {
    //       console.log(res);
    //       wx.hideLoading();
    //       if (res.data.code == 200) {
    //         this.setData({
    //           checkList: this.data.checkList.concat(res.data.data.result.records),
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
  //   announcement() {
  //     wx.navigateTo({
  //       url: '../../../pages/message/message'
  //     })
  //   }
  // },
  // attached() {
  //   this.setData({
  //     tokenid: wx.getStorageSync('tokenid')
  //   })    
  // },
  ready(){
    // this.getCardList()
    // this.loadNewsList()
  }
})
