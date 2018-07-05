

/**
 * 公共函数库
 */
// 匹配冷却代数
export function switchCoolDownIndex(num) {
    //num = Math.floor(num/2);
    if(num == 0 ){
        return HD_lANG['petInfo4-2'][globalLang]
    }
    if(num == 1 || num == 2){
        return HD_lANG['petInfo4-3'][globalLang]
    }
    if(num == 3 || num == 4){
        return HD_lANG['petInfo4-4'][globalLang]
    }
    if(num == 5 || num == 6){
        return HD_lANG['petInfo4-5'][globalLang]
    }
    if(num == 7 || num == 8){
        return HD_lANG['petInfo4-6'][globalLang]
    }
    if(num == 9 || num == 10){
        return HD_lANG['petInfo4-7'][globalLang]
    }
    if(num == 11 || num == 12){
        return HD_lANG['petInfo4-8'][globalLang]
    }
    if(num >= 13){
        return HD_lANG['petInfo4-9'][globalLang]
    }
}

// 匹配奖励
export function switchAwards(num) {
    let awards = [HD_lANG['petCenter14-1'][globalLang], HD_lANG['petCenter14-2'][globalLang], HD_lANG['petCenter14-3'][globalLang], HD_lANG['petCenter14-4'][globalLang], HD_lANG['petCenter14-5'][globalLang], HD_lANG['petCenter14-6'][globalLang], HD_lANG['petCenter14-7'][globalLang]];
    return awards[num]
}

// 匹配狗狗状态值
export function switchStatus(num) {
    let statusTxt = [HD_lANG['petCenter22'][globalLang], HD_lANG['petCenter23'][globalLang], HD_lANG['petCenter24'][globalLang], HD_lANG['petCenter25'][globalLang]];
    return statusTxt[num]
}

// 根据基因获取背景色
export function getBgColorClass(genStr, index){
    if(!genStr){
        return parseInt(Math.random()*8 + 1)
    }
    let gen = genStr.charAt(index);
    return gen
}

// 是否近亲
export function canBreedWith(obj) {
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
}

