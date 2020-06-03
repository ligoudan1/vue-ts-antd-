/***
 * 该文件主要存放项目中的所有过滤器
 * 书写过滤器代码时需要确定传入形参类型以及形参备注
 */

const filters: any = {
    /***
     * 测试用例,格式化字符串
     * @param val 为传入的字符串
     */
    formatStr(val: string): string {
        return `格式化${val}`
    }
}
export default filters