import $ from 'n-zepto';
var alertBox = {
    show : function (html,callBack) {
        var _html = this.templateHtml(html);
        var _this = this;
        var len = $('.alert-lock').length;
        if(!len) {
            $('body').append(_html)
        }

        setTimeout(()=>{
            $(".alert-box").css({
                top: '49%',
                'transform': 'translate(-50%, -50%)',
                'webkitTransform': 'translate(-50%, -50%)',
            })
        },200);
        setTimeout(()=>{
            if( typeof callBack == 'function'){
                _this.hide(callBack);
            }else{
                _this.hide();
            }
        },300);
    },
    hide : function ( callBack ) {
        $(".alert-lock").on("click",function (e) {
            $(".alert-lock").remove();
            if( typeof callBack == 'function'){
                return callBack() || callBack;
            }
        });
    },
    templateHtml : function (html) {
        var height = $(document).height();
        return '<div class="alert-lock" style="height: '+height+'px">' +
            '<div class="alert-box"><div class="sub-box">'+html+'</div></div>' +
        '</div>';
    },
    init : function () {

    }
}


export default alertBox;