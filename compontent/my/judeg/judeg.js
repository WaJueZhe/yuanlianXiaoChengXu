// compontent/my/judeg/judeg.js
import api from '../../../api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activeJudeg: 1,
    activePeople: 1,
    dpages: 0,
    dpageSiz: 100,
    dpageNo: 1,
    devlist: [],
    upages: 0,
    upageSiz: 100,
    upageNo: 1,
    uevlist: [],

    evlist: [],
    takejudgeNum: {
      all: "",
      love: "",
      detest: ""
    }, //收货人评价
    sendjudgeNum: {
      all: "",
      love: "",
      detest: ""
    }, //发货人评价
    takejudge: [],
    sendjudge: [],
    toggleJudgeShow: false,
    takeLength: null,
    sendLength: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击切换满意程度
    clkjudge(e) {
      let index = e.target.id;
      if (index == '1') {
        this.setData({
          activeJudeg: '1'
        })
      } else if (index == 2) {
        this.setData({
          activeJudeg: '2'
        })
      } else {
        this.setData({
          activeJudeg: '3'
        })
      }
    },
    //点击切换收货人
    clkpeople(e) {
      let index = e.target.dataset.num;
      let that =this 
      if (index == 1) {
        this.setData({
          activePeople: 1,
          toggleJudgeShow: !that.data.toggleJudgeShow,
          evlist: that.data.uevlist
        })
      } else if (index == 2) {
        this.setData({
          activePeople: 2,
          toggleJudgeShow: !that.data.toggleJudgeShow,
          evlist: that.data.devlist
        })
      }
    },
    dinit() {
      console.log("---加载评价数据---");
      wx.request({
        url: `${api.baseurl}/bsTaskEvaluate/findByDriver?pageSiz=${this.data.dpageSiz}&pageNo=${this.data.dpageNo}&evaluateType=D`,
        method: "POST",
        header: { tokenId: this.data.tokenid },
        success: res => {
          console.log(res)
          if (res.data.success) {
            let judgeList = res.data.data.evals.records;
            this.setData({
              takejudgeNum: {
                all: res.data.data.ucount,
                love: res.data.data.manyiucount,
                detest: res.data.data.bumanyiucount
              },//收货人评价U
              sendjudgeNum: {
                all: res.data.data.dcount,
                love: res.data.data.manyidcount,
                detest: res.data.data.bumanyidcount
              },//发货人评价D
              devlist: judgeList
            })
          }
        }
      })
    },
    uinit() {
      console.log("---加载评价数据---");
      wx.request({
        url: `${api.baseurl}/bsTaskEvaluate/findByDriver?pageSiz=${this.data.dpageSiz}&pageNo=${this.data.dpageNo}&evaluateType=U`,
        method: "POST",
        header: { tokenId: this.data.tokenid },
        success: res => {
          console.log(res)
          if (res.data.success) {
            let judgeList = res.data.data.evals.records;
            this.setData({
              takejudgeNum: {
                all: res.data.data.ucount,
                love: res.data.data.manyiucount,
                detest: res.data.data.bumanyiucount
              },//收货人评价U
              sendjudgeNum: {
                all: res.data.data.dcount,
                love: res.data.data.manyidcount,
                detest: res.data.data.bumanyidcount
              },//发货人评价D
              uevlist: judgeList,
              evlist: judgeList
            })
          }
        }
      })
    }
  },

  attached() {
    this.setData({
      tokenid: wx.getStorageSync('tokenid')
    })

    this.uinit()
    this.dinit()
  }
})
