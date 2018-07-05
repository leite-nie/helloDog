// pages/attestation/step2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name : "",
    code : "",
    token: "",
    userId : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initTokenUserId();
  },
  initTokenUserId: function () {
    var _this = this;
    var value = wx.getStorageSync('token');
    var value2 = wx.getStorageSync('userId');
    
    _this.setData({
      token: value,
      userId: value2
      
    });
    if (!_this.data.token) {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  inputBlur : function(e){
    var _value = e.detail.value;
    if (/^[\u4e00-\u9fa5]{2,4}$/.test(_value) ){
      this.setData({
        name : _value
      })
    }
  },
  inputBlur2 : function(e){
    var _value = e.detail.value;
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (regIdNo.test(_value)){
      this.setData({
        code: _value
      })
    }
  },
  attesFunc : function(){
    var _name = this.data.name;
    var _code = this.data.code;
    var _userId = this.data.userId;
    var _token = this.data.token;
    var _this = this;
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(_code)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的身份证号码',
        showCancel: false,
        success: function (res) {
          if (res.confirm) { } else if (res.cancel) { }
        }
      });
      return false;
    }
    if (!_userId || !_token){ //没登陆
      wx.redirectTo({
        url: '../login/login'
      });
      return false;
    } else if (!_name || !_code){
      wx.showModal({
        title: '提示',
        content: '请填写正确的姓名和身份证号码',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {} else if (res.cancel) {}
        }
      });
      return false;
    }
    wx.request({
      url: 'https://www.quanminbike.com/share-web/user/authent',
      data: {
        token: _token,
        userId: _userId,
        authenticationName: _name,
        identifyNumber: _code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == "0000" || res.data.code == "1222") {
          wx.setStorageSync('authentication', '2');
          wx.redirectTo({
            url: '../attestation/step3'
          })
        } else if (res.data.code == "1203"){
          wx.redirectTo({
            url: '../login/login'
          })
        }
      }
    })
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
  
  }
})