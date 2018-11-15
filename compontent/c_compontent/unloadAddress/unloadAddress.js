// compontent/c_compontent/unloadAddress/unloadAddress.js
import api from '../../../api.js';
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isChoose: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    page: 1,
    limit: 10,
    searchKey: '',
    addressList: [],

    currentTimestamp: 0,
    nomore: false,

    unload:''
  },




  methods: {
    setSearchKey(e) {
      this.setData({
        searchKey: e.detail.value
      })
    },

    init() {
      let postUrl = '';
      switch (wx.getStorageSync('identityType')) {
        case 'pcuser':
          postUrl = `${api.baseurl}address/getAddressList`;
          break;
        case 'customer':
          postUrl = `${api.baseurl}/cuserAddress/getAddressList`;
          break;
        default:
          break;
      }
      let params = {
        'currentPage': this.data.page,
        'pageSize': this.data.limit,
        'searchByKeys': { 'searchStr': this.data.searchKey, 'addressType': 'U' },
        'orderByKeys': { createDate: 'desc' }
      }
      wx.request({
        url: postUrl,
        data: params,
        header: { tokenId: wx.getStorageSync('tokenid') },
        method: "POST",
        success: res => {
          console.log(res)
          if (res.data.code == 200) {
            if (wx.getStorageSync('identityType') == 'pcuser'){
              this.setData({
                addressList: this.data.addressList.concat(res.data.data.result.content),
                total: res.data.data.result.totalPage,
              })
            } else if (wx.getStorageSync('identityType') == 'customer'){
              this.setData({
                addressList: this.data.addressList.concat(res.data.data.result.records),
                total: res.data.data.result.pages,
              })
            }
          }
        }
      })
    },

    //上拉加载更多
    scrollToLower() {
      var nowTimestamp = new Date().getTime();
      if (parseInt(nowTimestamp - this.data.currentTimestamp) < 3000) {
        return;
      }
      this.data.page += 1;
      this.data.currentTimestamp = nowTimestamp;
      console.log(this.data.page);
      if (this.data.page >= this.data.total) {
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
        that.init()
      }, 2000)

    },

    //查询
    inquire() {
      this.setData({
        total: 0,
        page: 1,
        addressList: []
      })
      this.init()
    },

    //删除
    delet(e) {
      let that = this;
      wx.showModal({
        title: '提示',
        content: '确定删除？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            var p = { id: e.currentTarget.dataset.id }
            let deleteUrl = '';
            switch (wx.getStorageSync('identityType')) {
              case 'pcuser':
                deleteUrl = `${api.baseurl}/address/deleteUsualAddress`
                break;
              case 'customer':
                deleteUrl = `${api.baseurl}/cuserAddress/deleteUsualAddress`
                break;
              default:
                break;
            }

            wx.request({
              url: deleteUrl,
              data: p,
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
                  that.inquire()
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
    compile(e) {
      console.log(e)
      app.addressList = e.currentTarget.dataset.text
      wx.navigateTo({
        url: '/pages/c_pages/compileAddress/compileAddress',
      })
    },

    //选择收货网点、收货人
    selectUnload(e){
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面


      prevPage.setData({
        unloadItem: e.currentTarget.dataset.text
      })

      wx.navigateBack({
        url: '../../../pages/c_pages/addWaybill/addWaybill'
      })
    }

  },

  ready() {
    this.init();

    if (app.unloadLing) {
      this.setData({
        unload: app.unloadLing
      })
      console.log(app.unloadLing)
    }
  },

})