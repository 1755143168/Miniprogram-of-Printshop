const cloud = require('wx-server-sdk')
//引入发送邮件的类库
const nodemailer = require('nodemailer');
cloud.init()
const db = cloud.database()
//邮件模板
exports.main = async(event,context)=>{
  let code = event.code//下载链接
  let remark = event.remark//备注
  let picker_input1 = event.picker_input1//份数
  let color = event.color//黑白彩印
  let pages = event.pages//单双面
  let express = event.express//自取信箱
  let cellphone = event.cellphone//手机号
  let arr = {"下载地址":code,
  "备注":remark,
  "打印份数":picker_input1,
  color,
  pages,
  express,
  "手机号":cellphone,
};
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',//qq邮箱 smtp.qq.com
    secure:true,
    auth:{
      user:"1755143168@qq.com",//收件人得邮箱
      pass:"kimambuynqhzbidd"  //授权码
    }
  });
  let info = await transporter.sendMail({
    from: "1755143168@qq.com",//必须和auth.user相同，否则会报553错误
    subject: '佩奇晚上好',  //主题
    to: '1649783672@qq.com',// 收件人邮箱
    text:JSON.stringify(arr,null," \n ").replace(/\"/g, ""), //发送给邮箱的内容
  });
  return info;
}