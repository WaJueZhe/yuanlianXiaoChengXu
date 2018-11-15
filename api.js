const APP_ID = 'wxf8921be5ac682454';//输入小程序appid  
const APP_SECRET = '8661c601cdaa52070f3d24ab90be60c9';//输入小程序app_secret 
const baseurl = "https://test.bcscm.net/etc"
const resourceurl = 'https://test.bcscm.net/resource/'    //图片预览地址
const socketurl = 'https://test.bcscm.net/chatApp';  //测试环境

// const APP_ID = 'wx20e40e5df529c7fd';//输入小程序appid  
// const APP_SECRET = 'ee626bb6ac0b74e5b6679dcfb4d6d661';//输入小程序app_secret 
// const baseurl = "https://www.bcscm.net/etc"
// const resourceurl = 'https://www.bcscm.net/resource/'    //图片预览地址
// const socketurl = 'https://www.bcscm.net/chatApp';  //测试环境


const loginUsageDocUrl = 'https://www.bcscm.net/templatedownload/usageAgreement.html';
const loginPrivacyDocUrl = 'https://www.bcscm.net/templatedownload/privacyProtection.html';


export default {
  baseurl: baseurl,
  APP_ID: APP_ID,
  APP_SECRET: APP_SECRET,
  loginUsageDocUrl: loginUsageDocUrl,
  loginPrivacyDocUrl: loginPrivacyDocUrl,
  socketurl: socketurl,
  resourceurl: resourceurl,

  getloginVcode: `${baseurl}/userAuth/loginPhoneSendCheckCodeh5`,   //获取登录验证码

  loginByPhone: `${baseurl}/userAuth/loginPhoneInsureCheckCode`,

  loadTaskList: `${baseurl}/task/findTaskByDriver`,                //获取任务单列表

  confirmTask: `${baseurl}/task/confirmTask`,                      //司机接单

  refuseTask: `${baseurl}/task/refuseTask`,                        //司机拒绝任务

  loadStopList: `${baseurl}/taskStop/findTaskStopByTaskId`,                //获取站点列表


  findTaskStopCardInfo: `${baseurl}/taskStop/sign/findTaskStopCardInfo`,    //站点签发或签收卡片

  signSendMsmCode: `${baseurl}/taskStop/sign/signSendsms`,            //签发短信发送

  stopBegin: `${baseurl}/taskStop/stopBegin`,                      //站点发运

  signSend: `${baseurl}/taskStop/sign/signSend`,                   //站点签发

  signGet: `${baseurl}/taskStop/sign/signArrived`,                   //站点签发

  stopEnd: `${baseurl}/taskStop/stopEndh5`,                      //站点发运

  messageGl: `${baseurl}/msgArticle/findArticleList`,                      //消息管理

  messageDetail: `${baseurl}/msgArticle/findArticleDetail`,                      //消息详情  

  // 登录接口
  getlogin: `${baseurl}/userAuth/loginUserByUserCode`,              //该接口需要两个参数

  getWxSignature: `${baseurl}/wx/wx_getSignature`,                  //获取微信签名信息
}

