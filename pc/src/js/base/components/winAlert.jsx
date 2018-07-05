var winAlert ={
    init : function () {
        this.append();
        //this.hide();
    },
    append:function(){
        let height = $(document).height();
        let _html = '<div class="win-alert-wrap" style="height: '+height+'px">\n' +
            '                <div class="lock" style="height: '+height+'px" ></div>\n' +
            '                <div class="alert-box">\n' +
            '                    <div class="sub-box">\n' +
            '                       <div></div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>';
        $("body").append(_html);

    },
    hide : function (callBack) {
        $(".lock").on("click",function () {
            $(".win-alert-wrap").hide();
            $(".alert-box").removeClass("animate");
            if( typeof callBack == 'function'){
                return callBack() || callBack;
            }
        })

    },
    show : function (str,callBack) {
        let _this = this;
        $(".sub-box div").html(str)
        $(".win-alert-wrap").show();
        setTimeout(()=>{
            $(".alert-box").addClass("animate");

        },100)
        if( typeof callBack == 'function'){
            _this.hide(callBack);
        }else{
            _this.hide();
        }
    }
}

setTimeout(()=>{
    winAlert.init();
},1000)




export default winAlert;