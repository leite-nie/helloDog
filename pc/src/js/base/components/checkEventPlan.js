var checkEventUtil = {
    show : function (hash) {
        $("body").append('.check-event');
        this.createHtml(hash);
    },
    createHtml : function (hash) {
        var html = '<div class="check-event">\n' +
            '                <div class="show-btn">\n' +
        '                        <span></span>'+HD_lANG['login19'][globalLang]+'\n' +
        '                    </div>\n' +
        '                    <div class="check-wrap">\n' +
        '                        <div class="hide-btn">一</div>\n' +
        '                        <div class="check-box">\n' +
        '                            <h2>'+HD_lANG['login14'][globalLang]+'</h2>\n' +
        '                            <p>'+HD_lANG['login15'][globalLang]+'</p>\n' +
        '                            <h3>'+HD_lANG['login16'][globalLang]+'</h3>\n' +
        '                            <div>\n' +
        '                                <input type="text" class="trans-input"  value="'+hash+'" readonly="true" />\n' +
        '                            </div>\n' +
        '                            <div class="button-box">\n' +
        '                                <span class="close-check">'+HD_lANG['login17'][globalLang]+'</span>\n' +
        '                                <span><a href="https://etherscan.io/tx/'+hash+'" target="_blank">'+HD_lANG['login18'][globalLang]+'</a></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>';
        $("body").append(html);
        this.init();
    },
    hide : function () {

    },
    init : function () {
        var eventIsHide = localStorage.getItem("eventState");
        if( eventIsHide == "hide" ){
            $(".check-wrap").hide();
            $(".show-btn").show();
        }else{
            $(".show-btn").hide();
            $(".check-wrap").show();
        }
        $(".hide-btn").on("click",function () {
            localStorage.setItem("eventState","hide");
            $(".check-wrap").hide();
            $(".show-btn").show();
        })
        $(".show-btn").on("click",function () {
            localStorage.setItem("eventState","show");
            $(".show-btn").hide();
            $(".check-wrap").show();
        })
        $(".close-check").on("click",function () {
            localStorage.setItem("eventState","hide");
            $(".check-wrap").hide();
            $(".show-btn").show();
        })
    }
}




export default  checkEventUtil;