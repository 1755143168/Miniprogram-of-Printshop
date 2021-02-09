// miniprogram/pages/user/user.js
const db = wx.cloud.database().collection('userorder')//数据库
Page({
  data:{
    userInfo:[],//头像
    login:true,//登录隐藏
    headportrait:false,//头像显示
    //username:{},//用户名
    //useraddress:{},//用户地址
    GongGe:[
      {
        txt:"订单",
        icon:"/icon/money.png",
        url:"../order/order"//页面地址
      },
      {
        txt:"小店",
        icon:"/icon/shop.png",
        url:"../logon/logon"//页面地址
      },
      {
        txt:"吃啥",
        icon:"/icon/rice.png",
        url:"../logon/logon"//页面地址
      },
      {
        txt:"客服",
        icon:"/icon/phone.png",
        url:"../logon/logon"//页面地址
      }
    ]
  },
  onShow:function(){
    if(wx.getStorageSync('openid')){
      let userInfo = wx.getStorageSync('userInfo')
      this.setData({
        login:false,
        headportrait:true,
        userInfo:userInfo,
      })
    }
  },
  /**************获取用户信息***********************/
  bindGetUserInfo: function(e) {
    var that = this;
    console.log(e.detail.userInfo);
    const userInfo = e.detail.userInfo.avatarUrl//头像
    const username = e.detail.userInfo.nickName//名字
    const useraddress = e.detail.userInfo.city//地址
    let arry = {
      'userInfo':userInfo,
      'username':username,
      'useraddress':useraddress,
    }
    wx.setStorage({
      data: arry,
      key: 'userInfo',
    })
    /*
    that.setData({
      userInfo:userInfo,
      username:username,
      useraddress:useraddress,
      login:false,
      headportrait:true
    })
    /*
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });*/
  }
})
