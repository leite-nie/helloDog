var checkEventUtil = {
    show : function (hash) {
        $('.check-event').remove();
        this.createHtml(hash);
    },
    createHtml : function (hash) {
        var html = '<div class="show-btn"><span></span>交易</div><div class="check-event">\n' +

        '                    <div class="check-wrap">\n' +
        '                        <div class="hide-btn">一</div>\n' +
        '                        <div class="check-box">\n' +
        '                            <h2>正在进行操作</h2>\n' +
        '                            <p>您的交易已经发出。根据以太坊网络状况的不同，这个过程最多可能需要花费几个小时的时间。请耐心等待交易完成，稍等片刻。</p>\n' +
        '                            <h3>交易散列</h3>\n' +
        '                            <div>\n' +
        '                                <input type="text" class="trans-input"  value="'+hash+'" readonly="true" />\n' +
        '                            </div>\n' +
        '                            <div class="button-box">\n' +
        '                                <span class="close-check">关闭</span>' +
        '                                <span class="reload-check">更新散列</span>'+
        '                                <span><a  href="#" data-href="https://etherscan.io/tx/'+hash+'" class="goHash">查询散列</a></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>';
        $("body").append(html);
        this.init();
    },
    hide : function () {

    },

    isIos : function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return false;
        }
        if (isIOS) {
            return true;
        }
    },
    init : function () {
        var eventIsHide = localStorage.getItem("eventState");
        if( eventIsHide == "hide" ){
            $(".check-event").hide();
            $(".show-btn").show();
        }else{
            $(".show-btn").hide();
            $(".check-event").show();
        }
        $(".hide-btn").on("click",function () {
            localStorage.setItem("eventState","hide");
            $(".check-event").hide();
            $(".show-btn").show();
        })
        $(".show-btn").on("click",function () {
            localStorage.setItem("eventState","show");
            $(".show-btn").hide();
            $(".check-event").show();
        })
        $(".close-check").on("click",function () {
            localStorage.setItem("eventState","hide");
            $(".check-event").hide();
            $(".show-btn").show();
        })
        $(".reload-check").on("click",function () {
            var _hash;
            try{
                if(checkEventUtil.isIos()){
                    window.webkit.messageHandlers.getCoreInfoForKey.postMessage("hash")
                }else{
                    window.ScriptAction.getCoreInfoForKey("hash");
                }
            }catch (e){
                
            }
            setTimeout(()=>{
                _hash = window.hashVal || localStorage.getItem("hash");
                $(".trans-input").val(_hash);
                $(".goHash").attr("data-href","https://etherscan.io/tx/"+_hash)
            },500)
        })
        $(".goHash").on("click",function (event) {
            var url = $(this).attr("data-href");
            try{
                if( checkEventUtil.isIos() ){
                    window.webkit.messageHandlers.presentNewPage.postMessage(url);
                    if(event){
                        event.preventDefault();
                    }
                }else{
                    window.ScriptAction.presentNewPage(url);
                    if(event){
                        event.preventDefault();
                    }
                }
            }catch (e){
                window.location.href = url
            }
        })
    }
}




export default  checkEventUtil;