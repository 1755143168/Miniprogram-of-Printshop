//app.js
App({
  
  onLaunch: function () {
    wx.cloud.init({
      env: 'campusprinting-4guaey7l34880aa5',
      traceUser: true,
    })
    this.getopenid()
  },
    // 定义调用云函数获取openid
getopenid(){
  let page = this;
  wx.cloud.callFunction({
    name:'login',
    complete:res=>{
      console.log('openid--',res.result)
      var openid = res.result.openid
      wx.setStorageSync('openid', openid)
    }
  })
},
})
