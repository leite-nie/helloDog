//bike.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
// 实例化API核心类

Page({
  data: {
    token : '',
    userId : '',
    latitude : '',
    longitude : '',
    cityCode : '',
    cityName : '',
    progressVal : '1',
    hideClass : 'loading-hide',
    rideId : '',
    isMaintain : '',
    authentication : '', //认证
    startBillingTime: '',
    endBillingTime: '',
    money : 0,
    freeDepositTxt : '',
    freeEnd: true
    
  },
  
  initTokenUserId : function(){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var _this = this;
    var value = wx.getStorageSync('token');
    var value2 = wx.getStorageSync('userId');
    var value3 = wx.getStorageSync('authentication'); 
    var value4 = wx.getStorageSync('money'); 


    
    //免押金时间计算
    var registerTime = wx.getStorageSync('registerTime'); 
    var registerTime2 = registerTime.split(' ')[0];//年月日
    var registerTime3 = registerTime.split(' ')[1];//时分秒
    var registerTimeDay = registerTime2.substring(8);
    var registerTimeYearMon = registerTime2.substring(0,8);
    registerTimeDay = Number(registerTimeDay);
    var freeTimeDay = registerTimeYearMon + (registerTimeDay+3);

    //免押金时间是否到期计算
    var registerSecond = _this.strtotime(registerTime2, registerTime3)
    var nowSecond = Math.ceil( (new Date().getTime())/1000 );
    if ((nowSecond - registerSecond) <= 259200 && value && freeTimeDay!='3'){
      
      _this.setData({
        freeEnd : false
      })
    }
    
    _this.setData({
      token: value,
      userId: value2,
      authentication: value3,
      freeDepositTxt: '免押金体验期于' + freeTimeDay + '到期',
      money: value4
    })
    
    wx.getLocation({
      type: 'wgs84',
      altitude : true,
      success: function (res) {
        
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude   
        })
        _this.getCityCode(res.latitude,res.longitude);
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      },
      fail : function(res){
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        wx.openSetting({
          success: (res) => {
            /*
             * res.authSetting = {
             *   "scope.userInfo": true,
             *   "scope.userLocation": true
             * }
             */
          }
        })
      }
    })
    
  },
  onShow: function () {
    var _this = this;
    var value = wx.getStorageSync('token');
    var value2 = wx.getStorageSync('userId');
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
  },
  onLoad: function () {
    var _this = this;
    this.initTokenUserId();
  },
  getCityCode : function(lat,lon){
    var _this = this;
    qqmapsdk = new QQMapWX({
      key: '4JIBZ-VNYWK-TM2JQ-AM6QP-FLJJ2-DHFPE'
    });
    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lon
      },
      coord_type: 1,
      success: function (res) {

        var _cityName = res.result.address_component.city;
        _cityName = _cityName.replace("市", "");
        //设置区号0755
        _this.setData({
          cityCode: _this.getCityNumber(_cityName)
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  toPay :function(){
    wx.navigateTo({
      url: '../pay/pay'
    })
  },
  canCode: function (e) {
    var _this = this;
    
    if(!_this.data.token) {
      wx.navigateTo({
        url: '../login/login'
      });
      return false;
    } else if (!_this.data.authentication || _this.data.authentication == "0"){ //未认证
      wx.navigateTo({
        url: '../attestation/step1'
      });
      return false;
    } else if (!_this.data.money){
      wx.showModal({
        title: '提示',
        content: '您的账户余额不足，请先充值！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../pay/pay'
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
          
        }
      })
    }else{
      wx.scanCode({
        success: function(res) {
         // console.log(res)
          var _result = res.result;
          _this.openLockIng(_result);
        },
        complete : function(res){
          //console.log(res)
        }
      })
    }
  },
  getOpenId : function(){
    /*wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              
              appid:'wx72a27af4ba2fad9a',
              secret:'',
              js_code: res.code,
              grant_type:'authorization_code'
            },
            success: function(data){

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });*/
    wx.login({
      success: function (res) {

        console.log(res)

      }
    });
  },
  openLockIng: function (url) {
    var _this = this;
    var _ofoCode = url.split('plate/')[1];
    if (_ofoCode){ //ofo
      wx.request({
        url: 'https://www.quanminbike.com/share-web/bike/unlock',
        data: {
          longitude: _this.data.longitude,
          latitude: _this.data.latitude,
          cityCode: _this.data.cityCode,
          token: _this.data.token,
          userId: _this.data.userId,
          bikeCode: _ofoCode,
          bikeType : 6,
          
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log(res)
          if (res.data.code == "0000") {  //开锁中...
            wx.setStorageSync('rideId', res.data.returnObj.id);
            wx.setStorageSync('bikeType', res.data.returnObj.bikeType);
            wx.setStorageSync('bikeSubType', res.data.returnObj.bikeSubType);
            wx.setStorageSync('carPwd', res.data.returnObj.carPwd);

            _this.setData({
              rideId: res.data.returnObj.id,
              hideClass: ''
            })

            _this.getRideInfo();
          } else if (res.data.code == "1203") { //未登录或登陆失效
            wx.redirectTo({
              url: '../login/login'
            })
          } else if (res.data.code == '1307' || res.data.message == '未交押金') {
            wx.showModal({
              title: '提示',
              content: '请到公众号下载APP充值押金',
              showCancel: true,
              success: function (res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              }
            })
          } else if (res.data.code == '1306') { //余额不足
            wx.showModal({
              title: '提示',
              content: '您的账户余额不足，请先充值！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../pay/pay'
                  });
                }
              }
            })
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
    }else{
      wx.request({
        url: 'https://www.quanminbike.com/share-web/bike/unlock',
        data: {
          longitude: _this.data.longitude,
          latitude: _this.data.latitude,
          cityCode: _this.data.cityCode,
          token: _this.data.token,
          userId: _this.data.userId,
          //bikeCode: '500193320',
          //bikeType : 7,
          unlockUrl : url
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
        // console.log(res)
          if (res.data.code == "0000") {  //开锁中...
            wx.setStorageSync('rideId', res.data.returnObj.id);
            wx.setStorageSync('bikeType', res.data.returnObj.bikeType);
            wx.setStorageSync('bikeSubType', res.data.returnObj.bikeSubType);
            wx.setStorageSync('carPwd', res.data.returnObj.carPwd);
            
            _this.setData({
              rideId: res.data.returnObj.id,
              hideClass: ''
            })
          
            _this.getRideInfo();
          } else if (res.data.code == "1203"  ){ //未登录或登陆失效
            wx.redirectTo({
              url: '../login/login'
            })
          } else if (res.data.code == '1307' || res.data.message == '未交押金' ){
            wx.showModal({
              title: '提示',
              content: '请到公众号下载APP充值押金',
              showCancel: true,
              success: function (res) {
                if (res.confirm) {
                
                } else if (res.cancel) {

                }
              }
            })
          } else if (res.data.code == '1306'){ //余额不足
            wx.showModal({
              title: '提示',
              content: '您的账户余额不足，请先充值！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../pay/pay'
                  });
                } 
              }
            })
          }else {
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
  },
  
  getRideInfo : function(){
    var _this =this;
    var id = _this.data.rideId;
    var _progressVal = 0;
    var time = setInterval(function () {
      _progressVal++;
      _this.setData({
        progressVal: _progressVal
      })
      if (_progressVal >= 90) {
        _this.setData({
          progressVal: 0,
          hideClass: 'loading-hide'
        })
        clearInterval(time)
      }
    }, 1000);
    var time2 = setInterval(function(){
      wx.request({
        url: 'https://www.quanminbike.com/share-web/bike/rideInfo',
        data: {
          rideId: id,
          token: _this.data.token,
          userId: _this.data.userId
        },
        success: function (res) {
          if (res.data.returnObj.status == 2) { //开锁成功
              _progressVal = 90;
              wx.setStorageSync('startBillingTime', res.data.returnObj.startBillingTime);
              wx.setStorageSync('bikeSubType', res.data.returnObj.bikeSubType);
             
              clearInterval(time2);
              //跳转至骑行中页面
              wx.redirectTo({
                url: '../riding/index'
              })
          }
        }
      })
    },5000)
    
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
  getCityNumber : function(name){
    var obj = [[{ "code": "010" }, { "city": "北京" }], [{ "code": "021" }, { "city": "上海" }], [{ "code": "022" }, { "city": "天津" }], [{ "code": "023" }, { "city": "重庆" }], [{ "code": "0551" }, { "city": "合肥" }], [{ "code": "0553" }, { "city": "芜湖" }], [{ "code": "0556" }, { "city": "安庆" }], [{ "code": "0552" }, { "city": "蚌埠" }], [{ "code": "0558" }, { "city": "亳州" }], [{ "code": "0565" }, { "city": "巢湖" }], [{ "code": "0566" }, { "city": "池州" }], [{ "code": "0550" }, { "city": "滁州" }], [{ "code": "1558" }, { "city": "阜阳" }], [{ "code": "0559" }, { "city": "黄山" }], [{ "code": "0561" }, { "city": "淮北" }], [{ "code": "0554" }, { "city": "淮南" }], [{ "code": "0564" }, { "city": "六安" }], [{ "code": "0555" }, { "city": "马鞍山" }], [{ "code": "0557" }, { "city": "宿州" }], [{ "code": "0562" }, { "city": "铜陵" }], [{ "code": "0563" }, { "city": "宣城" }], [{ "code": "0591" }, { "city": "福州" }], [{ "code": "0592" }, { "city": "厦门" }], [{ "code": "0595" }, { "city": "泉州" }], [{ "code": "0597" }, { "city": "龙岩" }], [{ "code": "0593" }, { "city": "宁德" }], [{ "code": "0599" }, { "city": "南平" }], [{ "code": "0594" }, { "city": "莆田" }], [{ "code": "0598" }, { "city": "三明" }], [{ "code": "0596" }, { "city": "漳州" }], [{ "code": "0931" }, { "city": "兰州" }], [{ "code": "0943" }, { "city": "白银" }], [{ "code": "0932" }, { "city": "定西" }], [{ "code": "0935" }, { "city": "金昌" }], [{ "code": "0937" }, { "city": "酒泉" }], [{ "code": "0933" }, { "city": "平凉" }], [{ "code": "0934" }, { "city": "庆阳" }], [{ "code": "1935" }, { "city": "武威" }], [{ "code": "0938" }, { "city": "天水" }], [{ "code": "0936" }, { "city": "张掖" }], [{ "code": "0941" }, { "city": "甘南" }], [{ "code": "1937" }, { "city": "嘉峪关" }], [{ "code": "0930" }, { "city": "临夏" }], [{ "code": "2935" }, { "city": "陇南" }], [{ "code": "020" }, { "city": "广州" }], [{ "code": "0755" }, { "city": "深圳" }], [{ "code": "0756" }, { "city": "珠海" }], [{ "code": "0769" }, { "city": "东莞" }], [{ "code": "0757" }, { "city": "佛山" }], [{ "code": "0752" }, { "city": "惠州" }], [{ "code": "0750" }, { "city": "江门" }], [{ "code": "0760" }, { "city": "中山" }], [{ "code": "0754" }, { "city": "汕头" }], [{ "code": "0759" }, { "city": "湛江" }], [{ "code": "0768" }, { "city": "潮州" }], [{ "code": "0762" }, { "city": "河源" }], [{ "code": "0663" }, { "city": "揭阳" }], [{ "code": "0668" }, { "city": "茂名" }], [{ "code": "0753" }, { "city": "梅州" }], [{ "code": "0763" }, { "city": "清远" }], [{ "code": "0751" }, { "city": "韶关" }], [{ "code": "0660" }, { "city": "汕尾" }], [{ "code": "0662" }, { "city": "阳江" }], [{ "code": "0766" }, { "city": "云浮" }], [{ "code": "0758" }, { "city": "肇庆" }], [{ "code": "0771" }, { "city": "南宁" }], [{ "code": "0779" }, { "city": "北海" }], [{ "code": "0770" }, { "city": "防城港" }], [{ "code": "0773" }, { "city": "桂林" }], [{ "code": "0772" }, { "city": "柳州" }], [{ "code": "1771" }, { "city": "崇左" }], [{ "code": "1772" }, { "city": "来宾" }], [{ "code": "0774" }, { "city": "梧州" }], [{ "code": "0778" }, { "city": "河池" }], [{ "code": "0775" }, { "city": "玉林" }], [{ "code": "1755" }, { "city": "贵港" }], [{ "code": "1774" }, { "city": "贺州" }], [{ "code": "0777" }, { "city": "钦州" }], [{ "code": "0776" }, { "city": "百色" }], [{ "code": "0851" }, { "city": "贵阳" }], [{ "code": "0853" }, { "city": "安顺" }], [{ "code": "0852" }, { "city": "遵义" }], [{ "code": "0858" }, { "city": "六盘水" }], [{ "code": "0857" }, { "city": "毕节" }], [{ "code": "0855" }, { "city": "黔东南" }], [{ "code": "0859" }, { "city": "黔西南" }], [{ "code": "0854" }, { "city": "黔南" }], [{ "code": "0856" }, { "city": "铜仁" }], [{ "code": "0898" }, { "city": "海口" }], [{ "code": "0899" }, { "city": "三亚" }], [{ "code": "0802" }, { "city": "白沙县" }], [{ "code": "0801" }, { "city": "保亭县" }], [{ "code": "0803" }, { "city": "昌江县" }], [{ "code": "0804" }, { "city": "澄迈县" }], [{ "code": "0806" }, { "city": "定安县" }], [{ "code": "0807" }, { "city": "东方" }], [{ "code": "2802" }, { "city": "乐东县" }], [{ "code": "1896" }, { "city": "临高县" }], [{ "code": "0809" }, { "city": "陵水县" }], [{ "code": "1894" }, { "city": "琼海" }], [{ "code": "1899" }, { "city": "琼中县" }], [{ "code": "1892" }, { "city": "屯昌县" }], [{ "code": "1898" }, { "city": "万宁" }], [{ "code": "1893" }, { "city": "文昌" }], [{ "code": "1897" }, { "city": "五指山" }], [{ "code": "0805" }, { "city": "儋州" }], [{ "code": "0311" }, { "city": "石家庄" }], [{ "code": "0312" }, { "city": "保定" }], [{ "code": "0314" }, { "city": "承德" }], [{ "code": "0310" }, { "city": "邯郸" }], [{ "code": "0315" }, { "city": "唐山" }], [{ "code": "0335" }, { "city": "秦皇岛" }], [{ "code": "0317" }, { "city": "沧州" }], [{ "code": "0318" }, { "city": "衡水" }], [{ "code": "0316" }, { "city": "廊坊" }], [{ "code": "0319" }, { "city": "邢台" }], [{ "code": "0313" }, { "city": "张家口" }], [{ "code": "0371" }, { "city": "郑州" }], [{ "code": "0379" }, { "city": "洛阳" }], [{ "code": "0378" }, { "city": "开封" }], [{ "code": "0374" }, { "city": "许昌" }], [{ "code": "0372" }, { "city": "安阳" }], [{ "code": "0375" }, { "city": "平顶山" }], [{ "code": "0392" }, { "city": "鹤壁" }], [{ "code": "0391" }, { "city": "焦作" }], [{ "code": "1391" }, { "city": "济源" }], [{ "code": "0395" }, { "city": "漯河" }], [{ "code": "0377" }, { "city": "南阳" }], [{ "code": "0393" }, { "city": "濮阳" }], [{ "code": "0398" }, { "city": "三门峡" }], [{ "code": "0370" }, { "city": "商丘" }], [{ "code": "0373" }, { "city": "新乡" }], [{ "code": "0376" }, { "city": "信阳" }], [{ "code": "0396" }, { "city": "驻马店" }], [{ "code": "0394" }, { "city": "周口" }], [{ "code": "0451" }, { "city": "哈尔滨" }], [{ "code": "0459" }, { "city": "大庆" }], [{ "code": "0452" }, { "city": "齐齐哈尔" }], [{ "code": "0454" }, { "city": "佳木斯" }], [{ "code": "0457" }, { "city": "大兴安岭" }], [{ "code": "0456" }, { "city": "黑河" }], [{ "code": "0468" }, { "city": "鹤岗" }], [{ "code": "0467" }, { "city": "鸡西" }], [{ "code": "0453" }, { "city": "牡丹江" }], [{ "code": "0464" }, { "city": "七台河" }], [{ "code": "0455" }, { "city": "绥化" }], [{ "code": "0469" }, { "city": "双鸭山" }], [{ "code": "0458" }, { "city": "伊春" }], [{ "code": "027" }, { "city": "武汉" }], [{ "code": "0710" }, { "city": "襄阳" }], [{ "code": "0719" }, { "city": "十堰" }], [{ "code": "0714" }, { "city": "黄石" }], [{ "code": "0711" }, { "city": "鄂州" }], [{ "code": "0718" }, { "city": "恩施" }], [{ "code": "0713" }, { "city": "黄冈" }], [{ "code": "0716" }, { "city": "荆州" }], [{ "code": "0724" }, { "city": "荆门" }], [{ "code": "0722" }, { "city": "随州" }], [{ "code": "0717" }, { "city": "宜昌" }], [{ "code": "1728" }, { "city": "天门" }], [{ "code": "2728" }, { "city": "潜江" }], [{ "code": "0728" }, { "city": "仙桃" }], [{ "code": "0712" }, { "city": "孝感" }], [{ "code": "0715" }, { "city": "咸宁" }], [{ "code": "1719" }, { "city": "神农架" }], [{ "code": "0731" }, { "city": "长沙" }], [{ "code": "0730" }, { "city": "岳阳" }], [{ "code": "0732" }, { "city": "湘潭" }], [{ "code": "0736" }, { "city": "常德" }], [{ "code": "0735" }, { "city": "郴州" }], [{ "code": "0734" }, { "city": "衡阳" }], [{ "code": "0745" }, { "city": "怀化" }], [{ "code": "0738" }, { "city": "娄底" }], [{ "code": "0739" }, { "city": "邵阳" }], [{ "code": "0737" }, { "city": "益阳" }], [{ "code": "0746" }, { "city": "永州" }], [{ "code": "0733" }, { "city": "株洲" }], [{ "code": "0744" }, { "city": "张家界" }], [{ "code": "0743" }, { "city": "湘西" }], [{ "code": "0431" }, { "city": "长春" }], [{ "code": "0432" }, { "city": "吉林" }], [{ "code": "1433" }, { "city": "延边" }], [{ "code": "0436" }, { "city": "白城" }], [{ "code": "0439" }, { "city": "白山" }], [{ "code": "0437" }, { "city": "辽源" }], [{ "code": "0434" }, { "city": "四平" }], [{ "code": "0438" }, { "city": "松原" }], [{ "code": "0435" }, { "city": "通化" }], [{ "code": "025" }, { "city": "南京" }], [{ "code": "0512" }, { "city": "苏州" }], [{ "code": "0519" }, { "city": "常州" }], [{ "code": "0518" }, { "city": "连云港" }], [{ "code": "0523" }, { "city": "泰州" }], [{ "code": "0510" }, { "city": "无锡" }], [{ "code": "0516" }, { "city": "徐州" }], [{ "code": "0514" }, { "city": "扬州" }], [{ "code": "0511" }, { "city": "镇江" }], [{ "code": "0517" }, { "city": "淮安" }], [{ "code": "0513" }, { "city": "南通" }], [{ "code": "0527" }, { "city": "宿迁" }], [{ "code": "0515" }, { "city": "盐城" }], [{ "code": "0791" }, { "city": "南昌" }], [{ "code": "0797" }, { "city": "赣州" }], [{ "code": "0792" }, { "city": "九江" }], [{ "code": "0798" }, { "city": "景德镇" }], [{ "code": "0796" }, { "city": "吉安" }], [{ "code": "0799" }, { "city": "萍乡" }], [{ "code": "0793" }, { "city": "上饶" }], [{ "code": "0790" }, { "city": "新余" }], [{ "code": "0795" }, { "city": "宜春" }], [{ "code": "0701" }, { "city": "鹰潭" }], [{ "code": "0794" }, { "city": "抚州" }], [{ "code": "024" }, { "city": "沈阳" }], [{ "code": "0411" }, { "city": "大连" }], [{ "code": "0412" }, { "city": "鞍山" }], [{ "code": "0415" }, { "city": "丹东" }], [{ "code": "0413" }, { "city": "抚顺" }], [{ "code": "0416" }, { "city": "锦州" }], [{ "code": "0417" }, { "city": "营口" }], [{ "code": "0414" }, { "city": "本溪" }], [{ "code": "0421" }, { "city": "朝阳" }], [{ "code": "0418" }, { "city": "阜新" }], [{ "code": "0429" }, { "city": "葫芦岛" }], [{ "code": "0419" }, { "city": "辽阳" }], [{ "code": "0427" }, { "city": "盘锦" }], [{ "code": "0410" }, { "city": "铁岭" }], [{ "code": "0471" }, { "city": "呼和浩特" }], [{ "code": "0472" }, { "city": "包头" }], [{ "code": "0476" }, { "city": "赤峰" }], [{ "code": "0477" }, { "city": "鄂尔多斯" }], [{ "code": "0474" }, { "city": "乌兰察布" }], [{ "code": "0473" }, { "city": "乌海" }], [{ "code": "0482" }, { "city": "兴安盟" }], [{ "code": "0470" }, { "city": "呼伦贝尔" }], [{ "code": "0475" }, { "city": "通辽" }], [{ "code": "0483" }, { "city": "阿拉善盟" }], [{ "code": "0478" }, { "city": "巴彦淖尔" }], [{ "code": "0479" }, { "city": "锡林郭勒" }], [{ "code": "0951" }, { "city": "银川" }], [{ "code": "0952" }, { "city": "石嘴山" }], [{ "code": "0954" }, { "city": "固原" }], [{ "code": "0953" }, { "city": "吴忠" }], [{ "code": "1953" }, { "city": "中卫" }], [{ "code": "0971" }, { "city": "西宁" }], [{ "code": "0973" }, { "city": "黄南" }], [{ "code": "0976" }, { "city": "玉树" }], [{ "code": "0975" }, { "city": "果洛" }], [{ "code": "0972" }, { "city": "海东" }], [{ "code": "0977" }, { "city": "海西" }], [{ "code": "0974" }, { "city": "海南" }], [{ "code": "0970" }, { "city": "海北" }], [{ "code": "0531" }, { "city": "济南" }], [{ "code": "0532" }, { "city": "青岛" }], [{ "code": "0631" }, { "city": "威海" }], [{ "code": "0535" }, { "city": "烟台" }], [{ "code": "0536" }, { "city": "潍坊" }], [{ "code": "0538" }, { "city": "泰安" }], [{ "code": "0543" }, { "city": "滨州" }], [{ "code": "0534" }, { "city": "德州" }], [{ "code": "0546" }, { "city": "东营" }], [{ "code": "0530" }, { "city": "菏泽" }], [{ "code": "0537" }, { "city": "济宁" }], [{ "code": "0635" }, { "city": "聊城" }], [{ "code": "0539" }, { "city": "临沂" }], [{ "code": "0634" }, { "city": "莱芜" }], [{ "code": "0633" }, { "city": "日照" }], [{ "code": "0533" }, { "city": "淄博" }], [{ "code": "0632" }, { "city": "枣庄" }], [{ "code": "0351" }, { "city": "太原" }], [{ "code": "0355" }, { "city": "长治" }], [{ "code": "0352" }, { "city": "大同" }], [{ "code": "0356" }, { "city": "晋城" }], [{ "code": "0354" }, { "city": "晋中" }], [{ "code": "0357" }, { "city": "临汾" }], [{ "code": "0358" }, { "city": "吕梁" }], [{ "code": "0349" }, { "city": "朔州" }], [{ "code": "0350" }, { "city": "忻州" }], [{ "code": "0359" }, { "city": "运城" }], [{ "code": "0353" }, { "city": "阳泉" }], [{ "code": "029" }, { "city": "西安" }], [{ "code": "0915" }, { "city": "安康" }], [{ "code": "0917" }, { "city": "宝鸡" }], [{ "code": "0916" }, { "city": "汉中" }], [{ "code": "0914" }, { "city": "商洛" }], [{ "code": "0919" }, { "city": "铜川" }], [{ "code": "0913" }, { "city": "渭南" }], [{ "code": "0910" }, { "city": "咸阳" }], [{ "code": "0911" }, { "city": "延安" }], [{ "code": "0912" }, { "city": "榆林" }], [{ "code": "028" }, { "city": "成都" }], [{ "code": "0816" }, { "city": "绵阳" }], [{ "code": "0832" }, { "city": "资阳" }], [{ "code": "0827" }, { "city": "巴中" }], [{ "code": "0838" }, { "city": "德阳" }], [{ "code": "0818" }, { "city": "达州" }], [{ "code": "0826" }, { "city": "广安" }], [{ "code": "0839" }, { "city": "广元" }], [{ "code": "0833" }, { "city": "乐山" }], [{ "code": "0830" }, { "city": "泸州" }], [{ "code": "1833" }, { "city": "眉山" }], [{ "code": "1832" }, { "city": "内江" }], [{ "code": "0817" }, { "city": "南充" }], [{ "code": "0812" }, { "city": "攀枝花" }], [{ "code": "0825" }, { "city": "遂宁" }], [{ "code": "0831" }, { "city": "宜宾" }], [{ "code": "0835" }, { "city": "雅安" }], [{ "code": "0813" }, { "city": "自贡" }], [{ "code": "0837" }, { "city": "阿坝" }], [{ "code": "0836" }, { "city": "甘孜" }], [{ "code": "0834" }, { "city": "凉山" }], [{ "code": "0891" }, { "city": "拉萨" }], [{ "code": "0892" }, { "city": "日喀则" }], [{ "code": "0897" }, { "city": "阿里" }], [{ "code": "0895" }, { "city": "昌都" }], [{ "code": "0894" }, { "city": "林芝" }], [{ "code": "0896" }, { "city": "那曲" }], [{ "code": "0893" }, { "city": "山南" }], [{ "code": "0991" }, { "city": "乌鲁木齐" }], [{ "code": "0993" }, { "city": "石河子" }], [{ "code": "0995" }, { "city": "吐鲁番" }], [{ "code": "0999" }, { "city": "伊犁" }], [{ "code": "0997" }, { "city": "阿克苏" }], [{ "code": "0906" }, { "city": "阿勒泰" }], [{ "code": "0996" }, { "city": "巴音" }], [{ "code": "0909" }, { "city": "博尔塔拉" }], [{ "code": "0994" }, { "city": "昌吉" }], [{ "code": "0902" }, { "city": "哈密" }], [{ "code": "0903" }, { "city": "和田" }], [{ "code": "0998" }, { "city": "喀什" }], [{ "code": "0990" }, { "city": "克拉玛依" }], [{ "code": "0908" }, { "city": "克孜勒" }], [{ "code": "0901" }, { "city": "塔城" }], [{ "code": "0871" }, { "city": "昆明" }], [{ "code": "0877" }, { "city": "玉溪" }], [{ "code": "0878" }, { "city": "楚雄" }], [{ "code": "0872" }, { "city": "大理" }], [{ "code": "0873" }, { "city": "红河" }], [{ "code": "0874" }, { "city": "曲靖" }], [{ "code": "0691" }, { "city": "西双版纳" }], [{ "code": "0870" }, { "city": "昭通" }], [{ "code": "0875" }, { "city": "保山" }], [{ "code": "0692" }, { "city": "德宏" }], [{ "code": "0887" }, { "city": "迪庆" }], [{ "code": "0888" }, { "city": "丽江" }], [{ "code": "0883" }, { "city": "临沧" }], [{ "code": "0886" }, { "city": "怒江" }], [{ "code": "0879" }, { "city": "普洱" }], [{ "code": "0876" }, { "city": "文山" }], [{ "code": "0571" }, { "city": "杭州" }], [{ "code": "0574" }, { "city": "宁波" }], [{ "code": "0573" }, { "city": "嘉兴" }], [{ "code": "0575" }, { "city": "绍兴" }], [{ "code": "0577" }, { "city": "温州" }], [{ "code": "0580" }, { "city": "舟山" }], [{ "code": "0572" }, { "city": "湖州" }], [{ "code": "0579" }, { "city": "金华" }], [{ "code": "0578" }, { "city": "丽水" }], [{ "code": "0576" }, { "city": "台州" }], [{ "code": "0570" }, { "city": "衢州" }], [{ "code": "1852" }, { "city": "香港" }], [{ "code": "1852" }, { "city": "澳门" }]];
    var _lenght = obj.length;
    try{
      for (var i = 0; i < _lenght; i++) {
        if (obj[i][1]['city'] == name) {
          return obj[i][0]['code']
        }
      }
    }catch(e){
      '0755'
    } 
  }
})
