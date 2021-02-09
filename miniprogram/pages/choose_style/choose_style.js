// miniprogram/pages/choose_style/choose_style.js
var app=getApp()
const db = wx.cloud.database({
  env: 'campusprinting-4guaey7l34880aa5',
}).collection("userorder")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_len:[],
    pice:0,//价格
    hideShare:false,//弹窗显示
    tanchu:[
      {
        id:"1",
        image:"cloud://campusprinting-4guaey7l34880aa5.6361-campusprinting-4guaey7l34880aa5-1303184703/user_file/项目文件/微信.png",
        txt:'微信聊天纪录',
        bindtap:"chooseMessageFile_1"
      },
      {
        id:"2",
        image:"cloud://campusprinting-4guaey7l34880aa5.6361-campusprinting-4guaey7l34880aa5-1303184703/user_file/项目文件/QQ.png",
        txt:'QQ文件',
        bindtap:"leding"
      }
    ],
   
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
  onShow: function (e) {
    
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

  },

  

  /****************添加文件**************************/
  /**打开弹窗*/
  add:function(){
    this.setData({
      hideShare:true
    })
  },
  /*取消弹窗*/
  cancle:function(){
    this.setData({
      hideShare:false
    })
  },


  /*操作详解*/
leding:function(){
  wx.navigateTo({
    url: '../logon/logon',
  })
},

/*********选择文件**********/
chooseMessageFile_1:function(){
  var that = this;
  wx.chooseMessageFile({
    count:1,/*每次选取一个*/
    type:"all",/*支持所有格式*/
    success: function (res){
      console.log('上传',res)
/*********************上传云存储******************************************/
      const filePath = res.tempFiles[0].path//定义文件地址
      const filename = res.tempFiles[0].name//定义文件名
      const cloudPath = 'user_file/'+Math.random()+filename.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,//云存储地址
        filePath,//文件地址
        success(res) {
          console.log('[上传文件]成功：',res.fileID)
          const fileList = res.fileID
          const downloudPath = that.data.downloudPath
          wx.cloud.getTempFileURL({
            fileList: [fileList], //要加[]
            success(res){
              console.log("下载地址:",res.fileList[0].tempFileURL)
              const downloudPath = res.fileList[0].tempFileURL
              wx.showLoading({
                title: '识别页数中',
              })
              wx.request({
                url: 'http://127.0.0.1:8000/candle/',
                method:"GET",
                data:{
                  'form':downloudPath
                },
                header: { 
                  'content-type': 'application/json' 
                },
                success(res){
                  console.log('页数',res)
                  const pagenum = res.data
                  let newArray={
                    url: res.fileID,//定义文件data
                    filename:filename,//文件名
                    color:"黑白",//黑白彩印
                    page_num:pagenum,//页数
                    dir:"横向",//打印方向
                    num:1,//份数
                    pice_face:0.2,
                    face:"单面",//单双面
                    page:"A4",//A4/A3
                    allpice:"0.2",//总价格
                    downloudPath:downloudPath,//下载地址
                    id:that.data.card_len.length,
                    chart:[{
                      id:1,
                      fun:"paper",
                      name:"打印纸张",
                      chose1:"A4",
                      chose2:"A3"
                    },
                    {
                      id:2,
                      fun:"dir",
                      name:"打印方向",
                      chose1:"横向",
                      chose2:"纵向"
                    },
                    {
                      id:3,
                      fun:"method",
                      name:"打印方式",
                      chose1:"单面",
                      chose2:"双面"
                    },
                  
                  ]
              
                  }
                  var card_len = that.data.card_len
                  var length = that.data.card_len.length+1
                  that.setData({
                    card_len:that.data.card_len.concat(newArray),
                    hideShare:false,//弹窗显示
                    length_cardlen:length
                   })
                  },
                  complete(){
                    wx.hideLoading({
                      success: (res) => {
                        wx.showToast({
                          title: '成功',
                        })
                        that.getTotalprice();//计算价格
                      },
                    })
                  }
              })
            },
          })
        }
       })
    }
  })
},

/************跳转页面*********/
navigate:function(){
  var that = this
  wx.navigateTo({
    url: '../choose_style_new/choose_style_new?filename='+that.data.card_len[0].filename+'id='+that.data.card_len[0].id,/*跳转界面*/
  })
},


/***********删除*********** */
delet:function(e){
  var that = this
  let index = e.currentTarget.dataset.id //索引位置
    let card_len = this.data.card_len
    var length = that.data.card_len.length-1
    card_len.splice(index,1)
    this.setData({
      card_len: card_len,
      length_cardlen:length
    })
},




/*********************设置样式********************/
kindToggle:function(event) {
  var id = event.currentTarget.dataset.setid
  let card_len = this.data.card_len
  var len = card_len.length
  console.log('其他地方获取length',len)
  for(var i=0;i<len;i++){
    if(card_len[i].id == id){
      card_len[i].unfold = !card_len[i].unfold
    }
    else{
      card_len[i].unfold = false
    }
  }
  this.setData({
    card_len:card_len
  })

},



/***********增加减函数**************/
decrease:function(eve){
  var that = this
  var id = eve.currentTarget.dataset.numid
  console.log(id)
  let card_len = that.data.card_len
  var len = card_len.length
  for(var i=0;i<len;i++){
  if(card_len[i].num == 1&&card_len[i].id == id){
    wx.showToast({
      title: '不能再减了~',
      icon:'none'
    })
    return ;
  }
  if(card_len[i].id == id){
    var Num = that.data.card_len[i].num - 1
    that.setData({
      /*这个太牛逼了*/
      [`card_len[${i}].num`]:Num
     })
  }
  
}
this.getTotalprice();//计算价格
},
increase:function(ever){
  var that = this
  var id = ever.currentTarget.dataset.numid

  var card_len = that.data.card_len
  var len = card_len.length
  for(var i=0;i<len;i++){
    if(card_len[i].id == id){
      var Num = that.data.card_len[i].num + 1
      that.setData({
        [`card_len[${i}].num`]:Num
       })
    }
}
this.getTotalprice();//计算价格
},


/***************************************************将订单数据传到服务器**************************************/
senddata(){
  console.log('开始发送')
  const pice = this.data.pice
  const openid = wx.getStorageSync('openid')
  const data = this.data.card_len
  var util = require("../../util/util.js")
  let arr={
    openid:openid,
    orderInfo:data,
    time:util.formatTime(new Date()),
    pice:pice
  }
  console.log(arr)
  /*
  wx.request({
    url: 'http://127.0.0.1:8000/wx/',
    method:"POST",
    data:{
      'order':arr
    },
    header: { 
      'content-type': 'application/json' 
    },
    success(res){
      console.log('正在努力打印')
    },
    fail(err){
      console.log('失败',err)
    }
})*/
},

/******************改变样式*********************** */
paper: function (res) {
  var that = this
  var id = res.currentTarget.dataset.groupid
  console.log('id',id)
  let card_len = that.data.card_len
  var len = card_len.length
  for(var i=0;i<len;i++){
  if(card_len[i].id == id){
  console.log("选中的标签：" + res.detail.value);
  this.setData({
    [`card_len[${i}].page`]:res.detail.value
  })
}
}
},
dir: function (res) {
  var that = this
  var id = res.currentTarget.dataset.groupid
  let card_len = that.data.card_len
  var len = card_len.length
  for(var i=0;i<len;i++){
    if(card_len[i].id == id){
  console.log("选中的标签：" + res.detail.value);
  this.setData({
    [`card_len[${i}].dir`]:res.detail.value,
  })
}
}
},
method: function (res) {
  var that = this
  var id = res.currentTarget.dataset.groupid
  var card_len = that.data.card_len
  var len = card_len.length
  var pice = 0.4
  for(var i=0;i<len;i++){
  if(card_len[i].id == id){  
  console.log("选中的标签：" + res.detail.value);
  this.setData({
    [`card_len[${i}].face`]:res.detail.value,
  })
  if(res.detail.value=="双面"){
    var num1 = that.data.card_len[i].num*0.4
    console.log('价格',num1)
    console.log('没错是双面')
    that.setData({
      [`card_len[${i}].pice_face`]: 0.4,
      [`card_len[${i}].allpice`]:num1
    })
    this.getTotalprice();//计算价格
  }else{
    var num2 = that.data.card_len[i].num*0.2
    console.log('价格',num2)
    console.log('没错是单面')
    that.setData({
      [`card_len[${i}].pice_face`]: 0.2,
      [`card_len[${i}].allpice`]:num2
    })
    this.getTotalprice();//计算价格
  }
}
}
},







/*********************计算价格********************/
getTotalprice(){
  let total = 0;///默认价格为0
  let card = this.data.card_len;//获取卡片数据
  for(var i=0;i<card.length;i++){
    total+=card[i].page_num*card[i].pice_face*card[i].num;
  }
  this.setData({
    pice:total.toFixed(2)//保留两位小数
  })
},


/***********************确认支付***********************/
pay(){
  const data = this.data.card_len
  const pice = this.data.pice
  const openid = wx.getStorageSync('openid')
  var util = require("../../util/util.js")
  db.add({
    data:{
      openid:openid,
      orderInfo:data,
      time:util.formatTime(new Date()),
      pice:pice
    },
    success: function(res) {
      console.log(res._id)
      },
      complete(){
        this.senddata()  /*向服务端发送订单数据*/
      }
  })
},

})
