// pages/attestation/step3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freeDepositTxt: '',
    freeEnd : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var value = wx.getStorageSync('token');
    //免押金时间计算
    var registerTime = wx.getStorageSync('registerTime');
    var registerTime2 = registerTime.split(' ')[0];//年月日
    var registerTime3 = registerTime.split(' ')[1];//时分秒
    var registerTimeDay = registerTime2.substring(8);
    var registerTimeYearMon = registerTime2.substring(0, 8);
    registerTimeDay = Number(registerTimeDay);
    var freeTimeDay = registerTimeYearMon + (registerTimeDay + 3);

    //免押金时间是否到期计算
    var registerSecond = _this.strtotime(registerTime2, registerTime3)
    var nowSecond = Math.ceil((new Date().getTime()) / 1000);
    if ((nowSecond - registerSecond) <= 259200 && value && freeTimeDay != '3') {

      _this.setData({
        freeDepositTxt:  freeTimeDay,
        freeEnd : false
      })
    }else{
      _this.setData({
        freeEnd: true
      })
    }
  },
  goRidiing : function(){
    wx.redirectTo({
      url: '../index/bike'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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