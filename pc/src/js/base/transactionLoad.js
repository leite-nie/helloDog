

export default function CreateLoadHtmlBox(callback){
    var _html = '<div class="load-txt">正在等待交易被处理，请耐心等待几分钟...</div>\n' +
        '\t\t<div class="sub-box">\n' +
        '\t\t\t\n' +
        '\t\t\t<div id="bar" style="width: 1%;"></div>\n' +
        '\t\t</div>\n' +
        '\t\t<div class="icon"></div>';

    window._loadBox = document.createElement("div");
    _loadBox.className = "load-box";
    _loadBox.innerHTML= _html;
    var _body = document.body.appendChild(_loadBox);
    window.loadTimer = null;
    var flag = false;

    window.loadTimer = setInterval(function(event){
        progress();
    },1500);
    function progress(){
        if(flag=true){
            flag=false;
            var oDiv = document.getElementById("bar");
            oDiv.style.width =parseInt(oDiv.style.width) + 1 + "%";//parseInt将百分比转为整数，每隔50毫秒加1%
            oDiv.innerHTML = oDiv.style.width;
            console.log(parseInt(oDiv.style.width))
            if(oDiv.style.width == "99%"){
                clearInterval(window.loadTimer);

            }
        }

    }
    if(typeof callback == "function"){
        return callback() || callback;
    }



}