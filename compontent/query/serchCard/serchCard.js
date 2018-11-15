// compontent/query/serchCard/serchCard.js
var api = require('../../../api.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    serchCode: {
      type: String,
      observer: (newVal, oldVal) => {
        console.log('新值'+newVal)
        console.log('旧值'+oldVal)
      } 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // pageNo: 1,
    // pageSize: 1000,
    // allWill: [],
    taskList: [],
    pageNo: 1,
    pageSize: 5,
    pages:0,
    tokenid: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取任务列表
    getNewTask(isinit) {
      wx.request({
        url: `${api.default.baseurl}/task/searchTask?taskType=0&pageNo=${this.data.pageNo}&pageSize=${this.data.pageSize}`,
        method: "POST",
        header: { tokenId: this.data.tokenid },
        success: res => {
          console.log(res);
          if (res.data.code == 200) {
            let tList = res.data.data.result.records;
            if (isinit){
              this.setData({
                taskList: tList,
                pages: res.data.data.result.pages
              })
            }else{
                this.setData({
                  taskList: this.data.taskList.concat(tList),
                  pages: res.data.data.result.pages
                })
            }
          }
        }
      })
    },

    //下拉刷新加载更多
    scrollToLower() {
      var nowTimestamp = new Date().getTime();
      if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
        return;
      }
      this.data.pageNo += 1;
      this.data.currentTimestamp = nowTimestamp;
      console.log(this.data.pageNo);
      if (this.data.pageNo > this.data.pages) {
        this.setData({
          nomore: true
        })
        this.data.nomore = true;
        return;
      }
      this.getNewTask(false);
    },
  },
  //发送ajax请求
  attached() {
    //获取tokenid
    this.setData({
      tokenid: wx.getStorageSync('tokenid')
    })

    this.getNewTask(true)

  },
  created() {
    console.log(this.data.serchCode)
  }
})
