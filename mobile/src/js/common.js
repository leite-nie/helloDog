import $ from 'n-zepto';
import initReactFastclick from 'react-fastclick';
import Web3 from './web3.min.js';
import HD_lANG from './languageMobile'
import winAlert from './winAlert.js';
// 语言包
window.HD_lANG = HD_lANG;
window.globalLang = "cn";

// window.base_host = 'http://manages.haloudog.com';
// window.base_host = 'http://manages.hellodogs.co';
window.base_host = 'http://www.hellodogs.co';       //正式环境 API 地址
window.img_host = "http://image.zhenghehd.com/";    //正式环境 CDN 地址
if(DEBUG) {
    window.base_host = 'http://manage.haloudog.com/'
    //window.base_host = 'http://192.168.1.173:8081/'
    // window.base_host = 'http://192.168.1.63:8080/'
    window.img_host = "http://manage.haloudog.com/";
}

// 解决移动端300ms点击延迟
initReactFastclick();
window.defaultGasPrice = ""
if (typeof web3 !== 'undefined') {
    console.log(1)
    window.web3 = new Web3(web3.currentProvider);
}else{
    console.log(2)
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
    if(DEBUG) {
        // window.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.38:8545"));
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"));
    }
}
var abi = [{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"profit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAvailableBlance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"computeNextGen0Price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_STARTING_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSiringAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_dogId","type":"uint256"}],"name":"isPregnant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_AUCTION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"siringAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCEO","type":"address"}],"name":"setCEO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setLotteryAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pregnantDogs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creationProfit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dogId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSaleAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sireAllowedToAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dogId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSiringAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"setAutoBirthFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gen0Profit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_sireId","type":"uint256"}],"name":"approveSiring","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"secs","type":"uint256"}],"name":"setSecondsPerBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dogId","type":"uint256"}],"name":"registerLottery","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSaleAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"secondsPerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"childGenes","type":"uint256"}],"name":"giveBirth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getDog","outputs":[{"name":"cooldownIndex","type":"uint256"},{"name":"nextActionAt","type":"uint256"},{"name":"siringWithId","type":"uint256"},{"name":"birthTime","type":"uint256"},{"name":"matronId","type":"uint256"},{"name":"sireId","type":"uint256"},{"name":"generation","type":"uint256"},{"name":"genes","type":"uint256"},{"name":"variation","type":"uint8"},{"name":"gen0","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cooldowns","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"setGen0Profit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"}],"name":"createGen0Dog","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dogId","type":"uint256"}],"name":"bidOnSaleAuction","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"autoBirthFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lottery","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"setCreationProfit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_dogId","type":"uint256"}],"name":"isReadyToBreed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dogIndexToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setVariationAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"variation","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"saleAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"spendMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sireId","type":"uint256"},{"name":"_matronId","type":"uint256"}],"name":"bidOnSiringAuction","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_money","type":"uint256"}],"name":"sendMoney","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gen0CreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"breedWithAuto","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"matronCooldownEndBlock","type":"uint256"},{"indexed":false,"name":"sireCooldownEndBlock","type":"uint256"},{"indexed":false,"name":"matronCooldownIndex","type":"uint256"},{"indexed":false,"name":"sireCooldownIndex","type":"uint256"}],"name":"Pregnant","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"dogId","type":"uint256"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"genes","type":"uint256"},{"indexed":false,"name":"generation","type":"uint16"},{"indexed":false,"name":"variation","type":"uint8"},{"indexed":false,"name":"gen0","type":"uint256"},{"indexed":false,"name":"birthTime","type":"uint256"},{"indexed":false,"name":"income","type":"uint256"},{"indexed":false,"name":"cooldownIndex","type":"uint16"}],"name":"Birth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}]
window.address = '0x9eea7965ee59c304f81d602ae1d9a3d624429d9d';  //正式接口的合约地址
if(DEBUG) {
    window.address = '0x1a29ffd8f2209ff8f30450d870b8103535e0869a';
}
window.dogMetacoin = new web3.eth.Contract(abi,address)


var _buyDogAbi = [{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"},{"name":"_seller","type":"address"}],"name":"createAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lastGen0SalePrices","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getAuction","outputs":[{"name":"seller","type":"address"},{"name":"startingPrice","type":"uint256"},{"name":"endingPrice","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"startedAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerCut","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isSaleClockAuction","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"cancelAuctionWhenPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gen0SaleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"cancelAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_to","type":"address"}],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getCurrentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nonFungibleContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"averageGen0SalePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_nftAddr","type":"address"},{"name":"_cut","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"startingPrice","type":"uint256"},{"indexed":false,"name":"endingPrice","type":"uint256"},{"indexed":false,"name":"duration","type":"uint256"}],"name":"AuctionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"totalPrice","type":"uint256"},{"indexed":false,"name":"winner","type":"address"}],"name":"AuctionSuccessful","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"AuctionCancelled","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
window._address = '0xf710aa8b730afdd991322de95336b84a9b8737c6';//正式接口的合约地址
if(DEBUG) {
    window._address = '0x0f271d4bec4ea8688722ce6a30d0b69d133f9bd5';
}
window.buyDogMeta = new web3.eth.Contract(_buyDogAbi,_address)


var _buyDogAbi2 = [{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"},{"name":"_seller","type":"address"}],"name":"createAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isSiringClockAuction","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getAuction","outputs":[{"name":"seller","type":"address"},{"name":"startingPrice","type":"uint256"},{"name":"endingPrice","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"startedAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerCut","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"cancelAuctionWhenPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"cancelAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_to","type":"address"}],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getCurrentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nonFungibleContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_nftAddr","type":"address"},{"name":"_cut","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"startingPrice","type":"uint256"},{"indexed":false,"name":"endingPrice","type":"uint256"},{"indexed":false,"name":"duration","type":"uint256"}],"name":"AuctionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"totalPrice","type":"uint256"},{"indexed":false,"name":"winner","type":"address"}],"name":"AuctionSuccessful","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"AuctionCancelled","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
window._address2 = '0x838802fc2280a75344b66634adc31125ae0fab3a'; //正式接口的合约地址
if(DEBUG) {
    window._address2 = '0x7c5be91c121bb0d760fd0a7581108b6f5877d901';
}
window.siringMetacoin = new web3.eth.Contract(_buyDogAbi2,_address2)

// 分红合约
var _ownerProfit = [{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dogCore","type":"address"}],"name":"setDogCoreAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_term","type":"uint256"},{"name":"_dogIdList","type":"uint256[]"},{"name":"_amount","type":"uint256"}],"name":"registerByDogId","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"termHistory","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dogCore","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_term","type":"uint256"},{"name":"_ownerList","type":"address[]"},{"name":"_amount","type":"uint256"}],"name":"registerByOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ownerProfit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_term","type":"uint256"}],"name":"Register","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
window._address3 = '0x838802fc2280a75344b66634adc31125ae0fab3a'; //正式接口的合约地址
if(DEBUG) {
    window._address3 = '0xfcdD18BB4C5340130AeB821b17e107385f2C2cc6';
}
window.ownerProfit = new web3.eth.Contract(_ownerProfit, _address3)

web3.eth.getGasPrice().then(function(data){
    window.gasPrice = data;
});

window.defaultAccount = localStorage.getItem("address") ? localStorage.getItem("address").toLowerCase() : "";
// window.defaultAccount = '0xcb39BB2F85f4592f47e7Bda68583A9B4a3147456';

if(defaultAccount){
    web3.eth.getTransactionCount(defaultAccount).then(function(data){
        window.nonce = data;
    });
}else{
    window.nonce = Math.floor(Math.random()*100000);
}
// 获取默认账户余额
function getBalance(account) {
    web3.eth.getBalance(account, function(error, result){
        var  _value = result.toString();
        window.defaultAccountBalance = Number(web3.utils.fromWei(_value))
    })
}

if(defaultAccount) {
    getBalance(defaultAccount)
}

window.$http = function (url, data) {
    commonUtil.loading();
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: 'get',
            url: base_host + '/dog-web' + url,
            data : data,
            dataType : "jsonp",
            jsonp:'callback',
            success: function(data) {
                commonUtil.removeLoading();
                // if(!defaultAccount || !data || data.code == "1200"){
                // if(!data || data.code == "1200"){
                //     return false
                // }
                if(data.code != "0000" && data.code != "1200" && data){
                    winAlert.show(HD_lANG[data.code][globalLang]);
                }
                resolve(data)
            },
            error: function(xhr, errorType, error) {
                commonUtil.removeLoading();
                reject(error)
            }
        })

    })
}


function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
function checkClient(){
    if( IsPC() ){
        window.location.href = "/index.html";
    }else{

    }
}
checkClient();
window.onresize = checkClient

window.addEventListener('load', function(event,callback) {
    // 修复伪类active无效问题
    document.body.addEventListener('touchstart', function () {});
    
    // 适配H5页面
    if(!commonUtil.isApp()) {
        $('body').css('padding-bottom', '1rem')
    }
});

var commonUtil =  {
    //防止重复提交合约，抛出异常
    addNonce (nonce){
        var prveNonce = localStorage.getItem("nonce");
    },

    // 加载中。。。
    loading() {
        var loading = '<div class="loading"><div class="loader-inner ball-clip-rotate-pulse">\
                        <div></div>\
                        <div></div>\
                    </div></div>';
        if(!$('.loading').length){
            $('body').append(loading);
        }
        $('.loading').show();
    },

    // 删除加载中。。。
    removeLoading() {
        $('.loading').hide();
    },

    // 使用原生设置title
    setPageTitle(title) {
        try{
            if( this.isIos() ){
                window.webkit.messageHandlers.setPageTitle.postMessage(title);
            }else{
                window.ScriptAction.setPageTitle(title);
            }
        }catch (e){}
    },

    // 使用原生返回宠物中心
    popRootPage(title) {
        try{
            if( this.isIos() ){
                window.webkit.messageHandlers.popRootPage.postMessage(null)
            }else{
                window.ScriptAction.popRootPage();
            }
        }catch (e){
            window.location.href = '/mobile/myDog/myDog.html'
            // window.location.href = document.referrer
        }
    },

    // 使用原生跳转
    getClientPushMethod(url, event) {
        try{
            if( this.isIos() ){
                window.webkit.messageHandlers.pushNewPage.postMessage(url);
                if(event){
                    event.preventDefault();
                }
            }else{
                window.ScriptAction.pushNewPage(url);
                if(event){
                    event.preventDefault();
                }
            }
        }catch (e){

            window.location.href = url
        }
    },
    //原生存交易订单号 hash 值

    setHashVal(str){
        var keyVal = "hash="+str;
        try{
            if( this.isIos() ){
                window.webkit.messageHandlers.saveCoreInfoForKey.postMessage(keyVal);
            }else{
                window.ScriptAction.saveCoreInfoForKey(keyVal);
            }
        }catch (e){
            localStorage.setItem("hash",str);
        }
    },

    setNonceVal(str){

        var _str = Number(str) + 1;
        var keyVal = "nonce="+_str;
        try{
            if( this.isIos() ){
                window.webkit.messageHandlers.saveCoreInfoForKey.postMessage(keyVal);
            }else{
                window.ScriptAction.saveCoreInfoForKey(keyVal);
            }
        }catch (e){
            localStorage.setItem("nonce",_str);
        }
        /*var number;
        var prevNonce = localStorage.getItem("nonce");
        prevNonce = prevNonce ? Number(prevNonce) : 0;
        if( localStorage.getItem("nonce") > window.nonce ){
            number = window.nonce + 1;
        }else{
            number = window.nonce + 1;
        }


        localStorage.setItem("nonce",number);*/
    },
    getNonceVal(){
        try{
            if( this.isIos() ){
                window.webkit.messageHandlers.getCoreInfoForKey.postMessage("nonce")
            }else{
                window.ScriptAction.getCoreInfoForKey("nonce");
            }
        }catch (e){
            window.storageNonce = localStorage.getItem("nonce");
        }
    },
    // 计算价格
    getDogCurrentPrice(startPrc,endPrc,currentBlockNum,eventBloNumber,duration){
        startPrc = parseFloat(startPrc)  // 开始价格
        endPrc = parseFloat(endPrc)      // 结束价格
        currentBlockNum = Number(currentBlockNum)
        let currentPrice = (endPrc - startPrc)* ( ((currentBlockNum - eventBloNumber) * 15)/duration >= 1 ? 1 : ((currentBlockNum - eventBloNumber) * 15)/duration ) + startPrc;
        currentPrice = parseInt(currentPrice*10000)/10000
        return currentPrice;
    },

    // 获取冷却时间
    getCoolTime(number){
        var mss = number*20*1000; //区块数*20s 得到s数
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (mss % (1000 * 60)) / 1000;
        var _str = ""
        if(mss<=0 ){
            _str = "";
        }else{
            if(days == 0){
                _str = hours + HD_lANG['list12'][globalLang] + minutes + HD_lANG['list13'][globalLang];
            }
            if(days != 0 && hours == 0){
                _str = days + HD_lANG['list11'][globalLang];
            }
            if(days != 0 && hours != 0){
                _str = days + HD_lANG['list11'][globalLang] + hours + HD_lANG['list12'][globalLang];
            }
            if(days == 0&&hours == 0){
                if(minutes <= 0){
                    _str = "";
                }else{
                    _str = minutes + HD_lANG['list13'][globalLang];
                }
            }
        }
        return _str
    },

    // 获取当前状态值
    getStateText(state, currentBlock, endBlock){
        if(currentBlock == 0){
            return ''
        }
        let differBlock = Number(endBlock) - Number(currentBlock);
        let text = "";
        if(state == 0){ //正常 or 冷却
            if(differBlock > 0 ){
                text = HD_lANG['list14-0'][globalLang] + this.getCoolTime(differBlock);
            }else{ //nothing

            }
        }else if(state == 1){ //出售
            text = HD_lANG['list14-1'][globalLang] + " Ξ ";
        }else if(state == 2){ //繁殖
            text = HD_lANG['list14-2'][globalLang] + " Ξ ";
        }else if(state == 3){// 怀孕中
            text = HD_lANG['list14-3'][globalLang] + this.getCoolTime(differBlock);
        }else{      //系统回收
            text = HD_lANG['list14-4'][globalLang]
        }
        return text;
    },

    // 匹配冷却区块
    switchCoolDownIndex(num) {
        if(num == 0 ){
            return HD_lANG['list8-0'][globalLang]
        }
        if(num == 1 || num == 2){
            return HD_lANG['list8-1'][globalLang]
        }
        if(num == 3 || num == 4){
            return HD_lANG['list8-2'][globalLang]
        }
        if(num == 5 || num == 6){
            return HD_lANG['list8-3'][globalLang]
        }
        if(num == 7 || num == 8){
            return HD_lANG['list8-4'][globalLang]
        }
        if(num == 9 || num == 10){
            return HD_lANG['list8-5'][globalLang]
        }
        if(num == 11 || num == 12){
            return HD_lANG['list8-6'][globalLang]
        }
        if(num >= 13){
            return HD_lANG['list8-7'][globalLang]
        }
    },

    // 匹配奖励
    switchAwards(num) {
        let awards = [HD_lANG['petCenter14-1'][globalLang], HD_lANG['petCenter14-2'][globalLang], HD_lANG['petCenter14-3'][globalLang], HD_lANG['petCenter14-4'][globalLang], HD_lANG['petCenter14-5'][globalLang], HD_lANG['petCenter14-6'][globalLang], HD_lANG['petCenter14-7'][globalLang]];
        return awards[num]
    },

    // 匹配狗狗状态值
    switchStatus(status) {
        let statusTxt = [HD_lANG['petCenter22'][globalLang], HD_lANG['petCenter23'][globalLang], HD_lANG['petCenter24'][globalLang], HD_lANG['petCenter25'][globalLang]];
        return statusTxt[status]
    },

    // 根据基因获取背景色
    getBgColorClass(genStr, index){
        if(!genStr){
            return parseInt(Math.random()*8 + 1)
        }
        let gen = genStr.charAt(index);
        return gen
    },

    // 是否近亲
    canBreedWith(obj) {
        // A Kitty can't breed with itself!
        if (obj.mid == obj.sid) {
            return false;
        }

        // Kitties can't breed with their parents.
        if (obj.midMontherId == obj.sid || obj.midFatherId == obj.sid) {
            return false;
        }
        if (obj.sidMontherId == obj.mid || obj.sidFatherId == obj.mid) {
            return false;
        }

        // We can short circuit the sibling check (below) if either cat is
        // gen zero (has a matron ID of zero).
        if (obj.sidMontherId == 0 || obj.midMontherId == 0) {
            return true;
        }

        // Kitties can't breed with full or half siblings.
        if (obj.sidMontherId == obj.midMontherId || obj.sidMontherId == obj.midFatherId) {
            return false;
        }
        if (obj.sidFatherId == obj.midMontherId || obj.sidFatherId == obj.midFatherId) {
            return false;
        }

        // Everything seems cool! Let's get DTF.
        return true;
    },

    // 获取URL参数
    getUrlPar(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return encodeURIComponent(r[2]); return null;
    },

    // 是否app内打开
    // 安卓：HelloDog/android   iOS:/HelloDog/iOS
    isApp() {
        var u = navigator.userAgent;
        if(u.match(/HelloDog/)){
            return true
        }
        return false
    },

    //判断 IOS or Android
    isIos(){
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

    // 匹配图标
    switchIcon (status) {
        var icon = ''
        switch (status) {
            case 0:
                icon = 'icon-tag'
                break;
            case 1:
                icon = 'icon-tag'
                break;
            case 2:
                icon = 'icon-leaf2'
                break;
            case 3:
                icon = 'icon-preg'
                break;
            default:
                break;
        }
        return icon
    },

    //cookie 存取
    setCookie (name,value,time){
        var strsec = this.getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec*1);
        document.cookie = name + "="+ escape (value) + ";path=/;";
    },
    getCookie  (name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return (arr[2]);
        }else{
            return null;
        }
    },
    getsec  (str){
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s"){
            return str1*1000;
        }else if (str2=="h"){
            return str1*60*60*1000;
        }else if (str2=="d"){
            return str1*24*60*60*1000;
        }
    },
    delCookie : function (name){
        this.setCookie(name,"","0s");
    },
}


/****************一直解锁钱包**********************/

window.walletIsUnLock = 0;
window.hashVal = "";
window.storageNonce = "";
function getPassWold() {
    var tPopPassWord = "";
    if(localStorage.getItem("web3js_wallet")){
        try{
            
            if(localStorage.getItem("address")){
                try{
                    
                    window.webkit.messageHandlers.getCoreInfoForKey.postMessage(localStorage.getItem("address"))
                }catch (e){
                    
                    window.ScriptAction.getCoreInfoForKey(localStorage.getItem("address"));
                }
            }
            //window.webkit.messageHandlers.getCoreInfoForKey.postMessage(localStorage.getItem("address"));

        }catch (e){
            if(commonUtil.getCookie('passWord') || localStorage.getItem("passWord")){
                tPopPassWord = commonUtil.getCookie('passWord')|| localStorage.getItem("passWord");
                if( tPopPassWord ){
                    var web3Wallet = web3.eth.accounts.wallet;
                    if( web3Wallet.length ){
                        return false;
                    }
                    var data = [];
                    if( window.location.href.indexOf('/mywallet.html') >-1 ||window.location.href.indexOf('/myWallet.html') >-1 || window.location.href.indexOf('/myDog.html') >-1 || window.location.href.indexOf('/detail.html') >-1|| window.location.href.indexOf('/winning.html') >-1 ||window.location.href.indexOf('/saleIng.html') >-1||  window.location.href.indexOf('/breed.html') >-1 ||  window.location.href.indexOf('/mating.html') >-1 ||window.location.href.indexOf('/worldcup') >-1 || window.location.href.indexOf('/transfer.html') >-1  ){
                        data = web3.eth.accounts.wallet.load(tPopPassWord);
                        window.messagesKey = data[0].privateKey;
                        commonUtil.setCookie("privateKey",data[0].privateKey,'d7');
                        localStorage.setItem("privateKey",data[0].privateKey);
                    }
                    
                    window.walletIsUnLock = localStorage.getItem("web3js_wallet") ? web3.eth.accounts.wallet.length : 0
                }
            }else{
                //window.html5NeedToPass = true;
            }
        }
    }else{ //本地存储不存在

    }
}
getPassWold();

window.getPassWordCallBack = function (str) {
    //alert('收到的str值==='+str)

    if(str && str.length == 6){
        var web3Wallet = web3.eth.accounts.wallet;
        if( web3Wallet.length ){
            return false;
        }
        var data = [];
        if( window.location.href.indexOf('/mywallet.html') >-1 ||window.location.href.indexOf('/myWallet.html') >-1 || window.location.href.indexOf('/myDog.html') >-1 || window.location.href.indexOf('/detail.html') >-1 || window.location.href.indexOf('/winning.html') >-1 ||  window.location.href.indexOf('/saleIng.html') >-1||  window.location.href.indexOf('/breed.html') >-1 ||  window.location.href.indexOf('/mating.html') >-1||window.location.href.indexOf('/worldcup') >-1 || window.location.href.indexOf('/transfer.html') >-1 ){
            data = web3.eth.accounts.wallet.load(str);
            window.messagesKey = data[0].privateKey;
            commonUtil.setCookie("privateKey",data[0].privateKey,'d7');
            localStorage.setItem("privateKey",data[0].privateKey);
        }

        window.walletIsUnLock = localStorage.getItem("web3js_wallet") ? web3.eth.accounts.wallet.length : 0;

    }else if(str && str.length > 10){ //收到hash

        window.hashVal = str;
        //alert('window.hashVal===='+window.hashVal)
    }else if(str){

        window.storageNonce = str;
    }

}

export default commonUtil;