//在这个模块中，我们可以引入N个组件 
//引入返回按钮
import goBack from './goBack.vue'
//引入搜索按钮
import goSearch from './search.vue'

//把所有的组件以一个对象的形式暴露出去
export default {
    goBack,
    goSearch
}