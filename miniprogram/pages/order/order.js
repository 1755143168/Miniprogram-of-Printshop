// miniprogram/pages/order/order.js
const db = wx.cloud.database({
  env:'campusprinting-4guaey7l34880aa5'
}).collection('userorder')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showimage:true, //暂无订单
    order:[], //订单信息
    status:"",
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
    var that = this
    const openid = wx.getStorageSync('openid')  //获取缓存的openid
    db.where({
      _openid:openid
    }).get({
      success:function(res){
        if (res.data.length !== 0){
          that.setData({
            showimage:false
          })
            that.setData({
              order:that.data.order.concat(res.data)
           })
          console.log("order",that.data.order)
        }
        },
        fail(err){
          console.log("失败",err)
        }
    })
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

/**
 * 查看订单状态
 */
checkorder(res){
  const that = this
  console.log(res.currentTarget.id)
  let random = res.currentTarget.id
  const openid = wx.getStorageSync('openid')  //获取缓存的openid
  wx.request({
    url: 'http://127.0.0.1:8000/wxgetdata/',
    method:'post',
    data:{
      'random':random,
      'openid':openid
    },
    header:{
      'content-type': 'application/json' 
    },
    success(res){
      console.log(res.data[0].status)
      let status = res.data[0].status
      if (status=="未打印"){
        let message = "未打印,请稍等"
        that.showModal(message=message)
      }
      else if(status=="已打印"){
        let message = "已打印，请到店取"
        that.showModal(message=message)
      }else{
        let message = "未知错误"
        that.showModal(message=message)
      }
    },
    fail(err){
      wx.showToast({
        title: "未知错误"+err.errMsg,
        duration: 2000
      })
    }
  })
},

/**
 * 弹窗
 */
showModal(message){
  wx.showModal({
    title: '订单状态',
    content: '订单'+message,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
})