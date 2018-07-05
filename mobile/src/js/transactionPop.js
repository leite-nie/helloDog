import $ from 'n-zepto';


/*if( localStorage("web3js_wallet") ){
    var getPassTime = setInterval(()=>{
        if( getPassWordCallBack() ){
            web3.eth.accounts.wallet.load(getPassWordCallBack);
            clearInterval(getPassTime);
        }
    },100);
}*/




var tPopBox = {
    hide : function ( ) {
        $(".tpop-lockscreen").on("click",function (e) {
            $(".tpop-lockscreen").remove();
        });
        $(".tpop-box").on("click",function (e) {
            e.stopPropagation();
        });
        $(".btn .last").on("click",function (e) {
            $(".tpop-lockscreen").remove();
        });

        /*if( typeof callBack == 'function'){
            return callBack(price,charge,address);
        }*/
    },
    show : function (obj,callBack) {
        /*
            obj.title:交易标题  【可填】
            obj.address:接收Eth地址 【可填】
            obj.chargeScope:手续费范围【可填】
            obj.price: 小狗（出售，购买，租借）价格   取消操作【可填】上架操作【必填】
            obj.gasPrice:当前gas价格 【可填】
            obj.transText: 交易描述（出售价格/购买价格）【必填】
            obj.gasLimit:需要消耗多少个gas【必填】
            obj.toAddress : 赠送小狗的接收的地址
           obj. btnText:确定按钮文本(好的，开始繁殖，确定购买...)【可填】
        */
        if(typeof obj != 'object'){
            return false;
        }
        let title = obj.title || "交易预览";
        let address = obj.address || "";
        let chargeScope = obj.chargeScope || "0.00019—0.00188";
        let price = obj.price|| 0;
        let gasPrice = obj.gasPrice || web3.utils.fromWei(window.gasPrice,"Gwei");
        let transText = obj.transText || "价格";
        let gasLimit = obj.gasLimit || "21000";
        let btnText = obj.btnText || "确定";
        let toAddress = obj.toAddress || "";
        let newobj = {
            title : title,
            address :address,
            chargeScope:chargeScope,
            price:price,
            gasPrice:gasPrice,
            transText:transText,
            gasLimit:gasLimit,
            btnText:btnText,
            toAddress : toAddress
        }
        let  popHtml = this.createHtml(newobj);
        $("body").append(popHtml);
        setTimeout(()=>{
            $(".tpop-box").css({
                bottom : 0
            })
        },100);
        this.init();
        $(".btn .first").bind("click",{func : callBack},this.btnClickFunc);


    },
    btnClickFunc : function (event) {
        $(".btn .first").unbind();
        $(".btn .first").text("提交中").css({"background":"#b5b2b2","border-color":"#b5b2b2"})
        var _toAddress = $("#toAddress").val();
        var gasPriceVal = $("#gasVal").val();
        //gasPriceVal = Number(gasPriceVal) + 1;
        var gasPrice =  web3.utils.toWei(gasPriceVal,"Gwei") ||  web3.utils.toWei("10","Gwei");
        setTimeout(()=>{
            $(".tpop-lockscreen").remove();
        },500)
        if( !_toAddress ){
            return event.data.func('',gasPrice);
        }else {
            return event.data.func(_toAddress,gasPrice);
        }

    },
    init : function () {

        $(".btn .last").on("click",function (e) {
            $(".tpop-lockscreen").remove();
        });
        $("#gasVal").on("keyup",function () {

            let _val = Number( $("#gasVal").val() );
            let _val2 =  Number( $("#gasLimit").val() );
            let _free = 0;
            if( _val >= 0){
                _free = _val * _val2;
                _free = _free.toString();
                _free = web3.utils.toWei(_free,"Gwei")
                _free = web3.utils.fromWei(_free,"ether") + "ETH";
            }
            $(".gas-val2").html(_free  )
        })
        $("#gasLimit").on("keyup",function () {

            let _val = Number( $("#gasLimit").val() );
            let _val2 =  Number( $("#gasVal").val() );
            let _free = 0;
            if( _val >= 1 && _val < 9000000){
                _free = _val * _val2;
                _free = _free.toString();
                _free = web3.utils.toWei(_free,"Gwei")
                _free = web3.utils.fromWei(_free,"ether") + "ETH";
                $(".gas-val2").html(_free  )
            }else{
                $(".gas-val2").html('金额太多')
            }

        })
    },
    createHtml : function (obj) {
        /*
            obj.title:交易标题
            obj.address:接收Eth地址
            obj.chargeScope:手续费范围
            obj.price:出售，购买，租借 价格
            obj.charge:当前gas价格
            obj.transText: 交易描述（出售价格/购买价格）
            obj.gasLimit:需要消耗多少个gas
           obj. btnText:确定按钮文本(好的，开始繁殖，确定购买...)
        */
        var amount = Number( obj.gasLimit ) * Number( obj.gasPrice );
        // 此处小数超过9位时执行 web3.utils.toWei(amount,"Gwei") 报错
        amount = amount.toFixed(9);
        amount = amount.toString();
        amount = web3.utils.toWei(amount,"Gwei")
        amount = web3.utils.fromWei(amount,"ether") + "ETH";
        return '<div class="tpop-lockscreen">' +
            '<div class="tpop-box">' +
            '<h2>'+obj.title+'</h2>' +
            '<ul>' +
            '<li class="contractAddr" style="display: '+(!obj.address ? 'none' : '')+'"><span>'+(obj.title == "支付以太币" ? "接收地址": "合约地址")+'</span><div class="tpop-right"><em class="ellipsis">'+obj.address+'</em></div></li>' +
            '<li style="display: '+(!obj.toAddress ? 'none' : '')+'"><span>接收地址</span><div class="tpop-right"><input id="toAddress" placeholder="请输入接收者钱包地址" type="text" /></div></li>' +
            '<li class="second"><span>手续费范围</span><div class="tpop-right tpop-right-second"><em>'+obj.chargeScope+'ETH</em><h5>了解更多</h5></div></li>' +
            '<li style="display: '+(!obj.price ? 'none' : '')+'"><span>'+obj.transText+'</span><div class="tpop-right"><p>ETH</p><div>'+obj.price+'</div><h6>Ξ</h6></div></li>' +
            '<li class=""><span>消耗Gas数量 </span><div class="tpop-right"><p>个</p><input type="number" placeholder="0" id="gasLimit" value="'+obj.gasLimit+'"  class="gas-val" maxlength="7"  /></div></li>' +
            '<li class="last second"><span>Gas单价</span><div class="tpop-right tpop-right-second"><p>Gwei</p><input type="number" placeholder="5" value="'+obj.gasPrice+'"  class="gas-val" id="gasVal" /><h6 ><i>手续费总计:</i><i class="gas-val2">'+amount+'</i></h6></div></li>' +
            '</ul>' +
            '<div class="btn">' +
            '<span class="first">'+obj.btnText+'</span>' +
            '<span class="last">取消</span>' +
            '</div>' +
            '</div>' +
            '</div>';
    },


}


export default tPopBox;