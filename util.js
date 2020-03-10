/**
 *  lin
 */

/**
 *  金钱格式化，三位加逗号
 */
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


/**
 *  日期数字小于10，补“0”
 */
export function check(i) {
    let num;
    i < 10 ? num = "0" + i : num = i;
    return num;
}


