// pages/riding/ridingend.js
Page({
  data : {
    cost : '0',
    ridiTime : '1',
    money : '0' 
  },
  onLoad : function(){
    this.getAccoutInfo();
  },
  toBike : function(){
    wx.redirectTo({
      url: '../index/bike'
    })
  },
  getAccoutInfo : function(){
    var _this = this;
    var _cost = wx.getStorageSync('cost') || 0;
    var _moner = wx.getStorageSync('money') || 0;
    var _startBillingTime = wx.getStorageSync('startBillingTime');
    var _endBillingTime = wx.getStorageSync('endBillingTime');
    var value = wx.getStorageSync('token');
    var value2 = wx.getStorageSync('userId');
    var _ridiTime = this.countRidingTime(_startBillingTime, _endBillingTime);
    wx.request({
      url: 'https://www.quanminbike.com/share-web/user/info',
      data: {
        token: value,
        userId: value2
      },
      success: function (res) {
        if (res.data.code == '0000') {
          _this.setData({

            money: res.data.returnObj.money
          })
          wx.setStorageSync('money', res.data.returnObj.money);
        }
      }
    })  
    this.setData({
      cost: _cost,
     
      ridiTime : _ridiTime
    });
  },
  countRidingTime : function(start,end){
    var _start = start.split(" ");
    var _end = end.split(" ");
    var _startTime = this.strtotime(_start[0], _start[1]);
    var _endTime = this.strtotime(_end[0], _end[1]);
    var _ridiTime = _endTime - _startTime;
    _ridiTime = Math.round( (_ridiTime/60) );
    return _ridiTime;
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
  }
})
