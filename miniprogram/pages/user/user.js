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
        txt:"喝啥",
        icon:"/icon/drink.png",
        url:""//页面地址
      }
    ]
  },
  onShow:function(){
    if(wx.getStorageSync('userInfo')){
      let userInfo = wx.getStorageSync('userInfo')
      this.setData({
        login:false,
        headportrait:true,
        userInfo:userInfo,
      })
    }else{
      this.setData({
        login:true,
        headportrait:false,
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
    that.setData({
      login:false,
      headportrait:true,
      userInfo:arry,
    })
   
  }
})
