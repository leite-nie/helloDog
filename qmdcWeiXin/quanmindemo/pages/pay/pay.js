const app = getApp()

Page({
  data:{
   
    payVal: 100,
    payIndex: 0,
    orderNum : '',
    token : '',
    userId : '',
    money : '0',
    currentItemId : "1",
    code : '',
    isDis : false,
    depositNumber : '0',
    depositTxt : '免押金体验',
    freeDepositTxt : '',
    freeEnd : true
  },
  onLoad : function(){
    this.initTokenUserId();
    this.getOrderNumber();
  },
  onShow: function () {
    
  },
  onReady : function(){

  },
  initTokenUserId: function () {
    var _this = this;;
    //免押金时间计算
    var registerTime = wx.getStorageSync('registerTime');
    var registerTime2 = registerTime.split(' ')[0];//年月日
    var registerTime3 = registerTime.split(' ')[1];//时分秒
    var registerTimeDay = registerTime2.substring(8);
    var registerTimeYearMon = registerTime2.substring(0, 8);
    registerTimeDay = Number(registerTimeDay);
    var freeTimeDay = registerTimeYearMon + (registerTimeDay + 3);
    _this.setData({
      freeDepositTxt: '免押金体验期于' + freeTimeDay + '到期'
    })
    //免押金时间是否到期计算
    var registerSecond = _this.strtotime(registerTime2, registerTime3)
    var nowSecond = Math.ceil((new Date().getTime()) / 1000);
    if ((nowSecond - registerSecond) <= 259200) {
      _this.setData({
        freeEnd: false,
        
      })
    }else{
      _this.setData({
        freeEnd: true,
        depositNumber : '199',
        depositTxt: '缴纳押金'
      })
    }
  
   
    var value = wx.getStorageSync('token');
    var value2 = wx.getStorageSync('userId');
    var value3 = wx.getStorageSync('money');
    _this.setData({
      token: value,
      userId: value2,
      money: value3
    });
    if (!_this.data.token) {
      wx.redirectTo({
        url: '../login/login'
      })
    }
  },
  editClass : function(e){
    var _payVal = e.target.dataset.num;
    this.setData({
      currentItemId: e.currentTarget.dataset.id,
      payVal: _payVal
    })  
  },
 
  otherAmout : function(e){
   var _val = e.detail.value;
   //if (/^\+?[1-9][0-9]*$/.test(_val)){
     this.setData({
       payVal: _val
     })
   //}else{
     //this.setData({
      // payVal: '0'
    // })
  // }
   
  },
  paymentDeposit : function(e){
    
    if (e.currentTarget.dataset.val == '缴纳押金' ){
      wx.showModal({
        title: '缴纳押金',
        content: '请到公众号下载APP充值押金',
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            //打开下载页面
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },
  strtotime: function (time_str, fix_time) {
    var time = (new Date()).getTime();
    if (time_str) {//有日期段
      var str = time_str.split('-');
      if (3 === str.length) {
        var year = parseInt(str[0]) - 0;
        var month = parseInt(str[1]) - 0 - 1;//月份是从0开始的
        var day = parseInt(str[2]) - 0;
        if (fix_time) {//有时间段
          var fix = fix_time.split(':');
          if (3 === fix.length) {
            var hour = parseInt(fix[0]) - 0;
            var minute = parseInt(fix[1]) - 0;
            var second = parseInt(fix[2]) - 0;
            time = (new Date(year, month, day, hour, minute, second)).getTime();
          }
        } else {
          time = (new Date(year, month, day)).getTime();
        }
      }
    }
    //getTime()获取的时间戳到了毫秒数
    time = time / 1000;//转到到秒数
    return time;
  },
  getOrderNumber: function(){
    var _this =this;
    _this.setData({
      isDis : true
    })
    wx.request({
      url: 'https://www.quanminbike.com/share-web/pay/generateOrderNumber',
      data: {
       
        channel: 'WSP',
        token: _this.data.token,
        userId: _this.data.userId
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.code == "0000"){
          _this.setData({
            orderNum : res.data.returnObj,
            isDis : false
          })
        }
      }
    })
  },
  payFunc : function(){
    var _this = this;
    var _payVal = this.data.payVal;
    if (/^\+?[1-9][0-9]*$/.test(_payVal)){
      //_payVal = 1
      wx.login({
        success: function (res) {
          _this.setData({
            code: res.code
          });
          wx.request({
            url: 'https://www.quanminbike.com/share-web/pay/orderSubmit',
            data: {

              orderId: _this.data.orderNum,
              token: _this.data.token,
              userId: _this.data.userId,
              body: "小程序充值",
              productName: '小程序全民单车',
              channel: "WSP",
              amount: _payVal,
              isDeposit: "0", //充值类型 0-余额 1-押金 2- 购买会员
              quantity: "1",
              jsCode: _this.data.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.data.code == "0000") {
                //调用微信支付
                var _data = res.data.returnObj
                wx.requestPayment({
                  'timeStamp': _data.timeStamp,
                  'nonceStr': _data.nonceStr,
                  'package': _data.package,
                  'signType': _data.signType,
                  'paySign': _data.paySign,
                  'success': function (res) {
                    var _money = Number(_this.data.money);
                    var _amount = Number(_payVal);
                    _this.setData({
                      money: (_money + _amount)
                    });
                    wx.setStorageSync('money', (_money + _amount));
                    //var _test = wx.getStorageSync('money');
                    //console.log(_test)
                  },
                  'fail': function (res) {
                    console.log(res)
                  }
                })
              } else if (res.data.message == '提交订单:订单号已存在！' || res.data.code == '9999') {
                _this.getOrderNumber();
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                  showCancel: false,
                  success: function (res) {

                  }
                })
              }
            }
          })
        }
      });     
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入正确的金额',
        showCancel: false,
        success: function (res) { }
      })
    }
  }
})