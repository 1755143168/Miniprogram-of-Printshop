//index.js
const app = getApp()
Page({
  data: {
    index:1,
    array:['常熟东南打印'],
    index_1:2,
    array_1:['单面','双面'],
    downloudPath:[],//下载地址
    imageID:[],//图片的云存储地址
    fileID:[],//文件云存储地址
    remarks:"",//备注
    picker_input1:"",//打印份数
    color:"",//黑白彩印
    pages:"",//单双面
    express:"",//自取信箱
    //door:"",//送货上门
    imgArr: [],//选择列表
    showModal: false,
    filelist:[],//文件列表
    cellphone:"",//手机号
    downloudPath_1:[],
  },
//单双面函数
radiochange:function(e){
  console.log(e.detail.value)
  this.setData({
    pages:e.detail.value
  })
},
//黑白彩印函数 
radiochanges:function(e){
  console.log(e.detail.value)
  this.setData({
    color:e.detail.value
  })
}, 
//自取信箱函数函数 
radiochanges_q:function(e){
  console.log(e.detail.value)
  this.setData({
    express:e.detail.value
  })
}, 
 //备注函数
 remarks:function(e){
   this.setData({
     remarks:e.detail.value
   })
 },
 //打印份数
 picker_input1:function(e){
   this.setData({
    picker_input1:e.detail.value
   })
 },
  //上传图片
  sendimage(){
    var that = this;
  wx.chooseImage({//选择图片
    success: function (res) {
      wx.showLoading({//上传等待
        title: '上传中',
      })
      const filePath = res.tempFilePaths[0]//定义图片地址
      console.log(res)
      // 上传图片
      const cloudPath = 'user_file/'+filePath.match(/\.[^.]+?$/)[0]
       wx.cloud.uploadFile({//上传图片
        cloudPath,//云存储地址
        filePath,//图片地址
        success: res => {
          console.log('[上传图片] 成功：', res.fileID)
          app.globalData.fileID = res.fileID
          that.setData({
            imageID:res.fileID,//定义图片data
          })
          wx.showToast({//上传成功图标
            title: "成功", // 提示的内容
            icon: "success", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 2000, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
            success: function () {
            },
            fail: function () {
                console.log("图片上传失败");
            },
            complete: function () {
                console.log("");
            }
        })
        that.getTempFileURL();
        },
        fail: e => {
          console.error('[上传图片] 失败：', e)
          wx.showToast({//失败图标
            icon: 'none',
            title: '上传图片失败',
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })

    },
    fail: e => {
      console.error(e)
    }
  })
},
//上传文件
 sendFile(){
  var that = this;
  wx.chooseMessageFile({
    count:10,
    success(res) {
      wx.showLoading({//上传等待
        title: '上传中'+count+'张',
        mask: true,
        duration: 10*1000,
      })
      const filePath = res.tempFiles[0].path//定义文件地址
      console.log(filePath);
      const cloudPath = 'user_file/'+filePath.match(/\.[^.]+?$/)[0]//定义云存储地址
      wx.cloud.uploadFile({
        cloudPath,//云存储地址
        filePath,//文件地址
        name:count,
        success(res) {
          console.log('[上传文件]成功：',res.fileID)
          app.globalData.fileID = res.fileID
          that.setData({
            fileID: this.data.res.fileID.concat([filePath]),//定义文件data
          })
          wx.showToast({//上传成功图标
            title: "成功", // 提示的内容
            icon: "success", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 2000, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
            success: function () {
            },
            fail: function () {
            },
            complete: function () {
            }
        })
        that.getTempFileURL();
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({//失败图标
            icon: 'none',
            title: '上传文件失败',
          })
        },
        complete: () => {
        }
      })}
    ,
    fail: e => {
      console.error(e)
    }
  });
 },

//选择门店函数
  bindPickerChange(e){
    this.setData({index:e.detail.value});
  },

  //发送邮件
  senEmail(){
    //var that = this;
    let downloudPath = this.data.downloudPath;//下载地址
    console.log(downloudPath.length)
    var remarks = this.data.remarks;//备注
    var picker_input1 = this.data.picker_input1;//打印份数
    var color = this.data.color;//黑白彩印
    var pages = this.data.pages;//单双面
    var express = this.data.express;
    var cellphone = this.data.cellphone;//手机号
    wx.cloud.callFunction({
      name:"sendEmail",
      data:{
        "code":JSON.stringify(downloudPath).replace(/\"/g, ""),//下载地址得传参
        "remark":JSON.stringify(remarks).replace(/\"/g, ""),//备注传参
        "picker_input1":JSON.stringify(picker_input1).replace(/\"/g, ""),//打印份数传参
        "color":JSON.stringify(color).replace(/\"/g, ""),//黑白彩印
        "pages":JSON.stringify(pages).replace(/\"/g, ""),//单双面参数
        "express":JSON.stringify(express).replace(/\"/g, ""),//自取信箱
        "cellphone":JSON.stringify(cellphone).replace(/\"/g, ""),//手机号
      },
      success(res){
        console.log("发送成功",res)
        wx.showToast({//上传成功图标
          title: "发送成功", // 提示的内容
          icon: "success", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          duration: 2000, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
          success: function () {
          },
          fail: function () {
          },
          complete: function () {
          }
      })
      },
      fail(res){
        console.log("发送失败",res)
        wx.showToast({//上传成功图标
          title: "上传失败", // 提示的内容
          icon: "none", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          duration: 2000, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
          success: function () {
          },
          fail: function () {
          },
          complete: function () {
          }
      })
      }
    })
  },
  //新发送邮件
  senEmail_new(){
  var that = this;
  let promiseArr = []
  let promiseArr_1 = []
  let a = new Promise((resolve_1,reject_1)=>{
  for (let i=0 ,len=this.data.imgArr.length; i<len; i++){
  let p = new Promise((resolve,reject)=>{
  //var that = this;
  const filePath = this.data.imgArr[i].path//定义文件地址
  const filename = this.data.imgArr[i].name//文件名
  const cloudPath = 'user_file/'+Math.random()+filename.match(/\.[^.]+?$/)[0]
  //const imageIDNow = that.data.filelist;
    wx.cloud.uploadFile({
      cloudPath,//云存储地址
      filePath,//文件地址
      success(res){
        console.log('上传成功',i)
        imageIDNow = that.data.filelist.push(res.fileID);
        //app.globalData.fileID = res.fileID
        that.setData({
          filelist: imageIDNow,//定义文件data
        })
        //resolve()
          wx.showToast({//上传成功图标
            title: "成功", // 提示的内容
            icon: "success", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 2000, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
            success: function () {
            },
            fail: function () {
                console.log("上传失败");
            },
            complete: function () {
                console.log("");
            }
        })
        //that.getTempFileURL()
      },
      fail(err){
        console.log(err)
        reject()
      },
      complete:function(){
        resolve()
      }
    })
  })
  promiseArr .push(p)
  }
  //获取下载链接
  Promise.all(promiseArr).then((res)=>{
    var that = this;
    var fileIds = []
    for(let j=0 ,lenl=this.data.filelist.length; j<lenl; j++){
      
      const fileList_1 = that.data.filelist[j];
      //const downloudPathNow = that.data.downloudPath;
      wx.cloud.getTempFileURL({
        fileList: [fileList_1],
        success: res => {
          console.log('成功获取地址',j,res.fileList[0].tempFileURL)
          fileIds = fileIds.concat(res.fileList[0].tempFileURL)
          that.setData({
            downloudPath:fileIds
          })
          dow.push(res.fileList[0].tempFileURL)
        },
        fail(err){
          console.log('失败',err)
          reject_1()
        },
        complete(res){
          resolve_1()
        }
      })
      //dow.push()
  }
  })
})
  promiseArr_1 .push(a)
  //dow.push()
  //发送邮件
  Promise.all(promiseArr_1).then((res)=>{
    /*wx.showModal({
      title: '提示',
      content: '确认发送',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //that.senEmail()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/
    that.showDialogBtn()
  })
},

 /**添加文件**/
 chooseImage: function () {
  var that = this;
  wx.chooseMessageFile({
    count: 10,
    type:'all',
    success: function (res) {
      //上传文件
      var imgArrNow = that.data.imgArr;
      imgArrNow = imgArrNow.concat(res.tempFiles);
      console.log(imgArrNow);
      that.setData({
        imgArr: imgArrNow
      })
      
    }
  })
},
/**删除文件**/
del:function(e){
  var imgArr = this.data.imgArr;
    var itemIndex = e.currentTarget.dataset.id;
    imgArr.splice(itemIndex, 1);
    console.log(imgArr);
    this.setData({
      imgArr: imgArr
    })
},
/*获取下载链接*/
getTempFileURL:function(){
  var that=this
  var downloudPathNow = that.data.downloudPath;
  const fileList = that.data.filelist;
  wx.cloud.getTempFileURL({
    fileList: fileList,
    success: res => {
      console.log(res.fileList)
      that.setData({
        downloudPath:downloudPathNow,
      })
    },
    fail(err){
      console.log('失败')
    }
  })
},
/*查看价格*/
pice:function(){
  wx.showModal({
    title: '价格',
    content: '单面：1毛5一张\r\n双面：3毛一张\r\n彩色：8毛一张\r\n送货上门：另收1元爬楼费\r\n证件照：一寸照8张10元，2寸照8张十元，4人组图8元8张',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},



showDialogBtn: function() {
  this.setData({
    showModal: true
  });
},
/**
 * 弹出框蒙层截断touchmove事件
 */
preventTouchMove: function () {
},
/**
 * 隐藏模态对话框
 */
hideModal: function () {
  this.setData({
    showModal: false
  });
},
/**
 * 对话框取消按钮点击事件
 */
onCancel: function () {
  this.hideModal();
},
inputChange:function(e){
  this.setData({
    cellphone:e.detail.value
  })
},
/**
 * 对话框确认按钮点击事件
 */
onConfirm: function () {
  this.hideModal();
  wx.showLoading({
    title: '发送中',
  })
  this.senEmail();
},
/*操作详解*/
leding:function(){
  wx.navigateTo({
    url: '../logon/logon',
  })
},
/*测试*/
send:function(){
  var that = this;
  const file_url = that.data.downloudPath
  wx.request({
    url: 'http://8.131.48.254:8080/handle/',
    /*method:'POST',*/
    data:{
      'form':file_url
      
    },
    success(res){
      console.log('成功',res)
    },
    fail(err){
      console.log('失败',err)
    },
  })
}
})




