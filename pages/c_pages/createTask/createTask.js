
import api from '../../../api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identityType:'',//身份
    deptarr: [],
    numbers: '',//单号
    departmentName:'',//部门
    driverNameTmp:'',//司机
    vehicleNameTmp:'',//车辆
    showView: false,

    
    submitDeptId:'',//部门ID
    driverId: '',//司机ID
    vehicleId:'',//车辆ID

    task: {
      taskNo: '',
      referId: '',
      driverNameTmp: "",
      vehicleNameTmp: "",
      departmentName: '',
      driverId:'',
      driverName:'',
      driverMobile:'',
      vehicleId:'',
      vehicleNo:'',
      source : "H5录入",
      isUseEsign : "Y",
      volumeUnit : "方",
      weightUnit : "吨",
      unitUnit : "件",
      distanceUnit :"公里",
      shipmentList: []
    }

  },

  setNumbers(e){
    let temp = "task.referId"
    this.setData({
      [temp]: e.detail.value
    })
  },

  //扫描
  scanNo(){
    console.log('开始扫描')
    // 允许从相机和相册扫码
    let that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
        let result = String(res.result) // 当needResult 为 1 时，扫码返回的结果
        if (result.length > 40) {
          result = result.substring(0, 40)
        }
        let temp = "task.referId"
        that.setData({
          [temp]: result
        })
      }
    })
  },

  // 选择类型弹框
  chooseDepartment() {
    this.setData({
      showView: true,
    })
  },

  //取消选择类型弹框
  cancleModal() {
    this.setData({
      showView: false,
    })
  },

  // 选择部门
  choseDept(e){
    console.log(e)
    this.setData({
      departmentName: e.currentTarget.dataset.text,
      submitDeptId: e.currentTarget.dataset.id,
    })
    console.log(this.data.submitDeptId)
  },

  //选择司机
  choseDriver(){
    wx.navigateTo({
      url: '../driver/driver?isChoose=true',
    })
  },

  //选择车辆
  choseVehicle(){
    wx.navigateTo({
      url: '../vehicle/vehicle?isChoose=true',
    })
  },

  //删除
  remove(e){
    var taskArr = this.data.task.shipmentList;
    taskArr.splice(e.currentTarget.dataset.index, 1);

    let temp = 'task.shipmentList'
    this.setData({
      [temp]: taskArr
    })
  },

  //编辑
  compile(e){
    // console.log(e)
    wx.navigateTo({
      url: '../addWaybill/addWaybill',
    })
  },

  // 创建
  setUp(){
    //部门判断
    if (this.data.identityType == 'pcuser'){
      if (this.data.submitDeptId == null || this.data.submitDeptId == ''){
        wx.showToast({
          title: '请选择部门',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
    }
    
    //司机判断
    if (this.data.task.driverId == '' || this.data.task.driverId == null) {
      wx.showToast({
        title: '请选择司机信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    //车辆判断
    if (this.data.task.vehicleId == '' || this.data.task.vehicleId == null) {
      wx.showToast({
        title: '请选择车辆信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    if (this.data.task.shipmentList.length <= 0) {
      wx.showToast({
        title: '请录入运单信息',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let that = this;

    wx.showModal({
      title: '提示',
      content: '确定提交任务？',
      success: function (res) {
        if (res.confirm) {
          console.log(that.data.task)
          that.submitTask()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //提交任务
  submitTask() {
    let paraJsonStr = JSON.stringify(this.data.task)
    let p = { taskJsonStr: paraJsonStr, source: 'h5', deptId: this.data.submitDeptId }
    wx.showLoading({
      title: '创建中',
    })
    wx.request({
      url: `${api.baseurl}/task/createFromWeb`,
      data: p,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        console.log(res)
        if(!res.data.success){
          wx.showToast({
            title: '创建失败',
            icon: 'none',
            duration: 1500
          })

          return
        }else{
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              duration: 1500
            })
          }, 1000)

          wx.navigateBack({
            delta: 1,
          })
        }       
      }
    })
  },

  //获取部门列表
  getDetps(){
    let p = {};
    wx.request({
      url: `${api.baseurl}/depUser/getUserDepts`,
      data: p,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        console.log(res)
        this.setData({
          deptarr: res.data.data.result,
        })
      }
    })
  },

  //判断用户是否实名认证
  judgeRealName(){
    let p = {
      userType: wx.getStorageSync('identityType')
    };
    wx.request({
      url: `${api.baseurl}/authent/judgeRealName`,
      data: p,
      header: { tokenId: wx.getStorageSync('tokenid') },
      method: "POST",
      success: res => {
        console.log(res)
        // if (res.data.code == 200) {

        // }
      }
    })
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
    this.setData({
      identityType: wx.getStorageSync('identityType')
    })

    
    if (wx.getStorageSync('identityType') == 'pcuser') {
      this.getDetps();
    } else {
      this.judgeRealName();
    }

    console.log(this.data.task)
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