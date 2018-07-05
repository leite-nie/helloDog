// pages/riding/index.js
const app = getApp()
var QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data : {
    latitude: '',
    longitude: '',
    latitude2 : '',
    longitude2: '',
    distance : "0",
    token : '',
    userId: '',
    rideId : '',
    cost : '0',
    startBillingTime : '',
    endBillingTime : '',
    timeCount :'00:00:01',
    isEnd : false,
    costRule : {},
    bikeType : '',
    bikeSubType : '',
    ridiRuleMoney : 0,
    stopAountTime : false,
    
    carPwd1: '',
    carPwd2: '',
    carPwd3: '',
    carPwd4: '',
    isOfo : false
  },
  onLoad : function(){
    var _this = this;
    var value = wx.getStorageSync('token');
    var value2 = wx.getStorageSync('userId');
    var value3 = wx.getStorageSync('rideId');
    var bikeType = wx.getStorageSync('bikeType');
    var bikeSubType = wx.getStorageSync('bikeSubType');
    var carPwd = wx.getStorageSync('carPwd');
    carPwd = carPwd ? carPwd : '0000';//防止报错
    var carPwd1 = carPwd.split('')[0]
    var carPwd2 = carPwd.split('')[1]
    var carPwd3 = carPwd.split('')[2]
    var carPwd4 = carPwd.split('')[3]
    _this.setData({
      token: value,
      userId: value2,
      rideId: value3,
      
      carPwd1: carPwd1,
      carPwd2: carPwd2,
      carPwd3: carPwd3,
      carPwd4: carPwd4
    })
    if (bikeType == 6 && bikeSubType == 0 ){ //ofo 机械锁
      _this.setData({
        isOfo : true
      })
    }
    _this.getLocation(0);
    _this.autoCountTime();
    _this.getRidingIsEnd();
  },
  endBike : function(e){
    
    var _this = this;
    var _bikeType = wx.getStorageSync('bikeType');
    var _latitude = wx.getStorageSync('latitude');
    var _longitude = wx.getStorageSync('longitude');
    wx.request({
      url: 'https://www.quanminbike.com/share-web/bike/endRide',
      data: {
        rideId: _this.data.rideId,
        token: _this.data.token,
        userId: _this.data.userId,
        bikeType: _bikeType,
        latitude: _latitude,
        longitude: _longitude
      },
      success : function(res){
        if(res.data.code == '0000'){ //ofo结束行程成功
          wx.showLoading({
            title: '正在结束行程...',
            mask: true
          })
        }
      }
    })
  },
  getNewLocation: function(){
    var _index = 0;
    var _this = this;
    var _time = setInterval(function(){
      _index++;
      _this.getLocation(_index); 
      if (_this.data.isEnd){
        clearInterval(_time)
      }
    },10000)
  },
  getLocation : function(i){
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: function (res) {
        if(i==0){
          _this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          _this.getNewLocation();
        }else{
          _this.setData({
            latitude2: res.latitude,
            longitude2: res.longitude
          })
          wx.setStorageSync('latitude', res.latitude);
          wx.setStorageSync('longitude', res.longitude);
          //计算距离
          qqmapsdk = new QQMapWX({
            key: '4JIBZ-VNYWK-TM2JQ-AM6QP-FLJJ2-DHFPE'
          });         
          qqmapsdk.calculateDistance({
            driving: "driving",
            from:{
              latitude: _this.data.latitude,
              longitude: _this.data.longitude
            },
            to: [{
              latitude: _this.data.latitude2,
              longitude: _this.data.longitude2
                }],
            success: function (res) {
              //console.log(res);
              _this.setData({
                distance: res.result.elements[0].distance
              })
            },
            fail: function (res) {
              //console.log(res);
            },
            complete: function (res) {
              //console.log(res);
            }
          });
        }
      },
      fail: function (res) {
        console.log(res);
        wx.openSetting({
          success: (res) => {
             
              res.authSetting = {
               "scope.userInfo": true,
                "scope.userLocation": true
              }
             
          }
        })
      }
    })
  },
  quesFunc : () =>{
    wx.showModal({
      title: '提示',
      confirmText : '提交',
      content: '如确定单车锁环已扣紧，请点击提交，您将暂时无法用车，我们会尽快完成处理',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getRidingIsEnd : function(){
    var _this = this;
    if (!_this.data.token || !_this.data.userId){
      wx.redirectTo({
        url: '../login/login'
      })
      return false;
    }
    var _firstInit = 0;
    var time2 = setInterval(function () {
      _firstInit++;
      wx.request({
        url: 'https://www.quanminbike.com/share-web/bike/rideInfo',
        data: {
          rideId: _this.data.rideId,
          token: _this.data.token,
          userId: _this.data.userId
        },
        success: function (res) {
          
          if (res.data.returnObj.status == 3) { //骑行结束
            clearInterval(time2);
            _this.setData({
              stopAountTime : true,
              isEnd : true
            });
            wx.setStorageSync('cost', res.data.returnObj.cost);
            wx.setStorageSync('endBillingTime', res.data.returnObj.endBillingTime);


            setTimeout(function () {
              wx.hideLoading()
            }, 1000)
            //跳转至骑行结束页面
            setTimeout(function(){ //关闭自动计时
              
              wx.redirectTo({
              url: '../riding/ridingend'
              })
            }, 2000)
          } else if (res.data.returnObj.status == 2){ //骑行中
            _this.setData({
              
              endBillingTime: res.data.returnObj.endBillingTime,
              startBillingTime: res.data.returnObj.startBillingTime,
              bikeType: res.data.returnObj.bikeType,
              bikeSubType: res.data.returnObj.bikeSubType
            });
            if (_firstInit == 1){
              _this.countRidiMoney();
            }
          }
        }
      })
    }, 10000)
  },
  autoCountTime : function(){
    var _this =this;
    var _time = 1; 
    var _timeInter = setInterval(function(){
      _time++;
      var _time2 = _this.formatSeconds(_time);
      _this.setData({
        timeCount: _time2
      })
      if (_this.data.costRule.rideTime){
        _this.countRealMoney(_time);
      }
      if(_this.data.stopAountTime){
        clearInterval(_timeInter)
      }
    },1000);
   
  },
  formatSeconds : function (value) {
    var secondTime = parseInt(value) < 10 ? "0" + parseInt(value) : parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if(secondTime > 59) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60) < 10 ? '0' + parseInt(secondTime % 60) : parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if (minuteTime > 59) {
        //获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        //获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    //var result = "" + parseInt(secondTime) + "秒";
    var result = "" + secondTime ;
    if(minuteTime < 10) {
      //result = "" + parseInt(minuteTime) + "分" + result;
      result = "0" + minuteTime + ":" + result;
    }else{
      result = "" + parseInt(minuteTime) + ":" + result;
    }
    if(hourTime < 10) {
      //result = "" + parseInt(hourTime) + "小时" + result;
      result = "0" + hourTime + ":" + result;
    }else{
      result = "" + parseInt(hourTime) + ":" + result;
    }
    return result;
  },
  countRidiMoney : function(){
    var _this = this;
    var ridiRuleKey = _this.data.bikeType + "#" + _this.data.bikeSubType; 
    wx.request({
      url: 'https://www.quanminbike.com/share-web/app/init',
      data: {
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.code == "0000" ){
          var _data = res.data.returnObj.costRule;
          for (var i in _data){
            if (i == ridiRuleKey){
              _this.setData({
                costRule: {
                  rideTime: _data[i].rideTime,
                  cost: _data[i].cost
                }
              })
            }
          }
        }
      }
    })
  },
  countRealMoney : function(time){
    time = time / 60; //秒转分
    var _ruleRideTime = this.data.costRule.rideTime; //30 分钟
    var _ruleRideCost = this.data.costRule.cost; //0.5 元
    var _integerTime = Math.ceil(time / _ruleRideTime);
    var _realMoney = _integerTime * _ruleRideCost;
    this.setData({
      cost: _realMoney
    })
  }
})