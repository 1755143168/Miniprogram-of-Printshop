// miniprogram/pages/black/black.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonClicked: false, //防重复提交
    file_new:"",//文件
    filename:"",//文件名
    type:"",//文件类型
    hideShare:false,
    card_len:[{
      unfold:false,//0为展开，1为收缩
      id:0,
      /*type:"",//文件类型*/
      filename:"",//文件名字
      url:"",//文件url
      page:"A4",//A4/A3
      dir:"横向",//打印方向
      color:"黑白",//黑白彩印
      face:"单面",//单双面
      num:1,//份数
      pice_face:0.2,
      page_num:"1",//页数
      direction:"",//纸张方向
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
      }],
    tanchu:[
      {
        id:"1",
        image:"cloud://campusprinting-4guaey7l34880aa5.6361-campusprinting-4guaey7l34880aa5-1303184703/user_file/项目文件/微信.png",
        txt:'微信聊天纪录',
        bindtap:"chooseMessageFile"
      },
      {
        id:"2",
        image:"cloud://campusprinting-4guaey7l34880aa5.6361-campusprinting-4guaey7l34880aa5-1303184703/user_file/项目文件/QQ.png",
        txt:'QQ文件',
        bindtap:"leding"
      }
    ]
  },
  /*打开悬浮窗*/
  chose_file:function(){
      this.setData({
        hideShare: true
      })

  },

  /**关闭弹窗*/
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


/**********选择微信聊天文件*************************************************/
chooseMessageFile:function(){
  var that = this;
  wx.chooseMessageFile({
    count:1,/*每次选取一个*/
    type:"all",/*支持所有格式*/
    success: function (res){
      console.log('上传',res)
/*********************上传云存储******************************************/
      const filePath = res.tempFiles[0].path//定义文件地址
      const filename = res.tempFiles[0].name//定义文件名
      const filetype = res.tempFiles[0].type//文件格式
      const cloudPath = 'user_file/'+filePath.match(/\.[^.]+?$/)[0]//定义云存储地址
      wx.cloud.uploadFile({
        cloudPath,//云存储地址
        filePath,//文件地址
        success(res) {
          console.log('[上传文件]成功：',res.fileID)
          that.setData({
            file_new: res.fileID,//定义文件data
            ["card_len[0].filename"]:filename,//文件名
            type:filetype,//文件类型
          })
/******************跳转界面**************************** */
        var card_len = JSON.stringify(that.data.card_len)  
          wx.navigateTo({
            url: '../choose_style/choose_style?type='+that.data.type+'&name='+that.data.filename+'&fileurl='+that.data.file_new+'&card_len='+card_len,/*跳转界面*/
          })
        }
       })
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


  touch(){
    const util = require("../../util/util.js")
    util.ButtonClicked(this)
  }
})