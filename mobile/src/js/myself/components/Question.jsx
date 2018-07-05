import React from 'react';
import common from '../../common.js';
import $ from 'n-zepto';

class Index extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.artFadeToggle()
        common.setPageTitle(HD_lANG['footer6'][globalLang])
    }
    // 文章显隐
    artFadeToggle() {
        $('.msg-list .select').on('click', function() {
            if( $(this).hasClass("isSelect") ){
                $(this).removeClass("isSelect");
                $(this).parent('.tit').siblings('.art').hide();
            }else{
                $(this).addClass("isSelect");
                $(this).parent('.tit').siblings('.art').show();
            }
        })
    }

    render(){
        return(
            <div className="question-wrap">
                <div className="msg-list">
                    <div className="top-title">新手上路</div>
                    <ul>
                        <li>
                            <div className="tit">
                                玩HelloDog需要什么？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>您开始游戏时所需要：</p>
                                <p>一台装有Chrome或火狐浏览器的电脑</p>
                                <p>装好插件MetaMask</p>
                                <p>购买好以太币，HelloDog唯一支持货币。HelloDog唯一支持货币。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                安装MetaMask，您的数字钱包
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>要想购买HelloDog你需要准备MetaMask数字钱包，然后给MetaMask充值才能购买您的狗狗。</p>
                                <p>注意： MetaMask这样的数字钱包的功能与银行账户是一致的请谨慎保管好账号密码不要忘记您的密码或密码暗号（种子短语）。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                为什么MetaMask会被锁定？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>宠物中心页面偶尔会显示锁屏。这种情况之所以会发生是因为MetaMask在经过一段时间之后会自动锁定您的账户。想要解锁，只需点击MetaMask插件并输入您的密码即可。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                重新安装MetaMask
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>当用户遇到安装错误时，可能需要卸载并重新安装MetaMask。如果您保留好您的密码暗号（Seed Phrase）的话，只需要删除扩展包，重新安装它，并导入您的密码暗号（Seed Phrase） 。然后，设置您要使用的密码（可以是您之前使用的密码或全新密码），然后在HelloDog网站上再次确认您的电子邮件地址和用户名。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                获取以太币，您的数字货币
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>仅限美国公民：您可以在MetaMask购买以太币（ETH）。ETH是一种作为此游戏运行基础的数字货币。</p>
                                <p>其他用户：您将需从交易所购买ETH，然后将ETH从您的交易所钱包转入您的MetaMask钱包。您无法直接使用账号来玩HelloDog</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="msg-list">
                    <div className="top-title">了解HelloDog</div>
                    <ul>
                        <li>
                            <div className="tit">
                                什么是HelloDog？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>《hello dog》是个宠物狗的养成与繁殖游戏，利用宠物币作为该游戏的唯一交易货币，玩家必须以宠物币购买hello dog，由玩家自定价格。两只狗狗交配而生出的子孙会遗传到他们各自的基因组，如外观、个性与特征等，总计有2380万种可能性。。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                HelloDog意义何在?
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>在Hello Dog中，用户收集和繁衍我们称之为狗狗的数字宠物！每只狗都有独一无二的数字基因组，这些数字基因定义了它的外观、特征和其他数字宠物特征。用户可以通过“繁殖”他们的狗创造全新的数字宠物，并有极大的可能获得罕见的特征。 Hello Dog不是一款游戏！而是一款专门针对区块链技术的应用。Hello Dog也不是数字货币！它仅仅是智能合约中的一段全局变量，但它依旧具备数字货币的安全性等特点：这将使每只狗都是独一无二的，并且由您100%拥有。它不能被复制，带走或毁坏。在这里必须说明的一点是hello Dog具有收藏价值当然品种越稀有收藏的价值越高。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                玩HelloDog需要花钱吗？?
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>只有游戏的早期玩家可获得免费的HelloDog，其余用户都需要用以太币来买狗狗。</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="msg-list">
                    <div className="top-title">购买和出售</div>
                    <ul>
                        <li>
                            <div className="tit">
                                我如何才能获得一只HelloDog？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>前往“宠物市场”，查看一下出售或者官方发布的狗狗，或者通过两只狗的交配繁殖来获得新生的狗宝宝。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                0代狗的优势？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>0代狗由官方售卖，拥有0代狗的用户也可以进行交易，0代狗繁殖散播出去的后代狗进行繁殖都将收到繁殖者给与的0.0005eth手续费。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                我如何出售或繁殖HelloDog？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>宠物中心点击你狗狗的资料，内容页里面有两个按钮一个是出售，另一个是繁殖。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                购买一只HelloDog需要花多少钱？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>HelloDog是没有标准价格的。用户在出售其狗狗的时候会设定它们自己的起始价格。出售价格可在选定时间内上涨或下跌，直至被另外一个用户购买或出售时间结束。</p>
                                <p>HelloDog团队每15分钟会发布一只全新的“零代”狗。“零代”狗的起始价格是由最新5只出售的狗的平均价格再加均价50％来确定的。请注意，您需要使用以太币来购买HelloDog。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                我需要几只狗以开始玩此游戏？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>只需要1只就可以！但是，我们建议您从两只狗开始玩，这样您就可以让它们育种繁殖了。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                为什么HelloDog上手如何复杂？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>HelloDog是架构在区块链技术上的，这种技术相对而言还是新技术。它是安全无虞的，但是在这一潮流普及之前将难免显得有些复杂。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                什么是以太币（ETH）？为什么我需要有了它才能玩HelloDog？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>以太币为以太坊网络提供支持，而以太坊网络正是架构HelloDog的载体以太币的功能与任何其他货币一样;其价值随着市场状况的变化而波动。您需要将您的货币（例如人民币，美元，CAD等等）转换成以太币，只有这样才能在我们的网络上使用。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                如何终止出售或育种？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>狗狗出售/育种价格可以上涨或下跌，当出售/育种时间到期，价格会停止浮动。如果您取消出售或育种，或者您的狗已经育种，狗狗会返回您的宠物中心。狗狗育种或出售皆是区块链上的交易，所以你必须支付手续费（燃气）。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                拍卖或拍卖如何结束？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>狗狗拍卖价格可以上涨或下跌，当时间到期时，价格会停止浮动。如果你下架了出售或租借狗，狗会退还给你。出售、租借等操作属于区块链上的交易，因此您必须支付手续费（燃气）。</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="msg-list">
                    <div className="top-title">繁殖</div>
                    <ul>
                        <li>
                            <div className="tit">
                                为啥不能简单粗暴地创造新的HelloDog？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>为了保护您的HelloDog可以不受人为引起的通货膨胀或是内幕交易的影响，区块链技术会防止我们篡改自己所构建的生态系统。一旦所有的狗狗发布完毕，我们就不会再推出新的品种。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                为什么HelloDog育种要花费ETH？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>产生购过的成本有两部分：交易费和生育费发送到以太坊网络的每笔交易都需要手续费（燃气）向以太坊矿工支付手续费程序员在母狗怀孕到期时会开启生育功能，从而收取生育费。</p>
                                <p>未来的繁殖费可能会发生变化，但目前为0.008以太币。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                我的狗是公狗还是母狗？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>请您先不要忙着给狗狗分类。</p>
                                <p>每个狗都可以作为母狗。然而，一只狗在育种过程中出生后只有母狗能得到新生小狗。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                我如何将自己的狗育种？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>先选择您的宠物中心的一只狗作为种狗（狗爸爸）。然后您可以在您的其他狗狗中选择一只来当母狗（狗妈妈）。</p>
                                <p>进入“繁殖页面”</p>
                                <p>选择一只将作为种狗的狗狗</p>
                                <p>按繁殖按钮</p>
                                <p>准许以太币交易</p>
                                <p>然后一只全新的狗狗就会很快出现在宠物中心页面了！</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                我可以多频繁的将HelloDog育种？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>HelloDog无法在待产期或者休息时间内再次交配。狗狗每繁殖一次，休息时间就会相应地增长。产生的后代狗狗子孙将会有更长的休息时间。每一只狗狗的休息时间会显示在它们的简介页面中。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                手续费（燃气）是什么？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>手续费（燃气）是以太坊网络为处理交易所收取的费用。 因为区块链是分散的，每笔交易都由多部计算机执行，而非集中处理，这样做可以确保代币也就是HelloDog绝对安全并且独一无二。然而，这些都需花费大大量电脑运转费用，所以收取的手续费就可为其提供支持。以太坊通常把这称为为gwei（10亿gwei = 1以太币/ ETH）。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                世上有多少只HelloDog？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>此游戏上线时我们将发布一百只HelloDog，大约每隔15分钟就会产生一只新的狗我们把这些没有父母的狗狗称为“零代”狗。一旦所有的‘零代’狗发布完毕，只有通过育种繁殖或在狗市上从众玩家手中购买才能获得新的HelloDog。然而，通过育种繁殖，您可以创造大约2380万只狗。</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="msg-list">
                    <div className="top-title">兑奖</div>
                    <ul>
                        <li>
                            <div className="tit">
                                如何兑奖？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>每期开奖后，开奖宝石将在首页展示，您可以通过宠物重新查看自己的狗狗有无中奖，中奖的狗狗将盖着中奖印章。有这个印章那么恭喜你，你可以点击兑奖。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                兑奖有效期？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>每期开奖产生的中奖者兑奖有效期为下一次开奖前。如在这期间内不进行兑奖将视为放弃，狗狗将参与下一期的开奖（没中奖的狗或中奖不兑奖的狗可以永久参与开奖）。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                无中奖的狗狗可以永久兑奖？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>是的。无中奖的狗狗将有永久兑奖的权利，越多狗狗的拥有者中奖概率越大，当然，这也需要点运气。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                哪些狗狗能参与抽奖？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>除0代狗、创世狗以及变异狗以外的狗，都可参与开奖，当然如果你有0代狗、创世狗以及变异狗你已经获得了不少的报酬。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                兑奖后什么时候到账？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>开奖后中奖狗的拥有者可以点击页面兑奖进行兑奖，兑奖的奖金将在下一期开奖后发送到中奖者的钱包。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                一个月开几次奖？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>每期开奖时间11520个区块（大约2天），如必中开奖一等奖中奖者无兑奖下期将还开必中抽奖。</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="msg-list">
                    <div className="top-title">交易异常处理</div>
                    <ul>
                        <li>
                            <div className="tit">
                                以太坊交易长时间未被执行？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>通常由于支付的GAS，算力费用偏低，以太坊矿工会优先执行算力费用较高的交易，可偿试增加Gas Price或者继续等待</p>
                                <p>平台的所有与时间相关的交易，如销售，配对，掘金等。 以最终矿工执行的时间为准。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                以太坊交易成功了，但平台上数据未生效。
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>遇到此类问题，请不用担心，平台的一切数据以区块上的数据为准。 如以太坊交易成功了，狗未到账，宠物中心看不到相关狗的信息等等，原因如下：</p>
                                <p>区块同步到平台的延时造成，可继续等待。</p>
                                <p>玩家变更过交易，例如：在钱包软件中重新输入Gas Price重新下单。</p>
                                <p>PS：当玩家重新在钱包软件下单后，单号将变更，最终单号以以太坊最后提供的单号为准。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                如何查询以太坊交易单号？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>平台在交易时会返回交易单号，请复制下来</p>
                                <p>查看钱包软件中的交易单号</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="msg-list">
                    <div className="top-title">其他问题</div>
                    <ul>
                        <li>
                            <div className="tit">
                                为什么我不能在Etherscan看到我的出售或育种交易？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>出售和拍卖付款在Etherscan中被称为“内部交易”。他们有自己的标签。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                这是一个骗局吗？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>这不是骗局。区块链真正的应用场景是它去中心化的特点，我们的智能合约都是开源的，而且对总奖金池以及蓄奖池做了限制，官方没有任何人有权限能提取里面的金额，请大家放心。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                开奖能作弊吗？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>我们开奖都将是以智能合约开奖，能真正的做到公平、公正、公开的形式。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                我可以用我的手机玩HelloDog吗？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>可以，www.olgame.io点击下载，目前支持安卓、IOS以及H5。但目前只支持中文，后续语言版本会更新上。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                你们团队怎样用HelloDog赚钱？
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>你们团队怎样用HelloDog赚钱？</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                HelloDog团队如何获得项目，合作伙伴或投资机会?
                                <span className="select"></span>
                            </div>
                            <div className="art">
                                <p>HelloDog是一个创业工作室。请留下您的详细信息和联系方式发送到官网邮箱：official@haloudog.com；我们会有专人联系你。</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}



export default Index;