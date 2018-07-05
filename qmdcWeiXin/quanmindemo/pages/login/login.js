
const app = getApp()


Page({
  data : {
    phoneVal : '',
    codeVal : '',
    codeDis : true,
    phoneDis : true,
    phoneCode : '获取验证码',
    token : '',
    money : '0'
    
  },
  inputBlur: function (e) {
    
    var _value = e.detail.value;
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    var flag = reg.test(_value);
    if(flag){
      this.setData({ 
        phoneDis : false,
        phoneVal: _value
      })
    }else{
      this.setData({
        phoneDis: true
      })
    }
  },
  inputBlur2: function (e) {
    var _value = e.detail.value;
    var flag = _value.length == 4;
    if (flag) {
        this.setData({
          codeDis : false,
          codeVal: _value
        })
      
    }else{
      this.setData({
        codeDis: true
      })
    }

  },
  sendCode : function(e){
    var _thatObj = e.target
    var _phone = this.data.phoneVal;
    var _this = this;
    if(_phone.length !=11){
      wx.showModal({
        title: '提示',
        content: '手机号码不正确',
        showCancel : false,
        success: function (res) {
          if (res.confirm) {
           
          } else if (res.cancel) {
           
          }
        }
      })
      return false;
    }
    wx.request({
      url: 'https://www.quanminbike.com/share-web/login/sendMobileVerify',
      data: {
        mobile: _phone
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.code == "0000"){
          //倒计时
          _this.setData({
            phoneCode: 60,
            phoneDis: true
          })
          var time = setInterval(function(){
            var phoneCode = _this.data.phoneCode;
            phoneCode--;
            _this.setData({
              phoneCode: phoneCode,
              phoneDis : true
            })
            if (phoneCode == 0) {
              clearInterval(time)
              _this.setData({
                phoneCode: "获取验证码",
                phoneDis : false
              })
            }
          }, 1000)
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

              } else if (res.cancel) {

              }
            }
          })
        }
      }
    })
  },
  toLogin : function(e){
    var _this = this;
    var _phone = this.data.phoneVal;
    var _code = this.data.codeVal;
    wx.request({
      url: 'https://www.quanminbike.com/share-web/login/doLogin',
      data: {
        mobile: _phone,
        verifyCode : _code,
        deviceType : 'h5'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == "0000") {
          //存储userId 和 token
         
          try {
            wx.setStorageSync('userId', res.data.returnObj.user.userId);
            wx.setStorageSync('token', res.data.returnObj.token);
            wx.setStorageSync('money', res.data.returnObj.user.money);
            wx.setStorageSync('authentication', res.data.returnObj.user.authentication); //是否认证
            wx.setStorageSync('registerTime', res.data.returnObj.user.registTime)
            wx.redirectTo({
              url: '../index/bike'
            })
          } catch (e) {
          }
         
             
          
         
        }else{
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
  },
  toAgree : function(){
    wx.navigateTo({
      url: 'agree',
    })
  },
  onLoad : function(){
    
  }
})