//引入axios http库
import axios from 'axios'
//引入 message组件
import {Message} from 'element-ui'
//引入路由模块
import router from '../../router'

//重新创建自定义实例
//我可以给AXIOS实例添加很多自定义的属性
let http = axios.create({
    // /api是把http://localhost:3000地址重启
    //上线之后可以把基础地址更换成为域名
   baseURL:'/api'
})

//请求拦截
http.interceptors.request.use((config)=>{
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    //全局设置每一个请求头中携带token
    config.headers.authorization =userInfo?userInfo.token:{}
    return config
})

//响应拦截
http.interceptors.response.use((res)=>{
    console.log(res.data,'响应全局')
    //一般工作的时候 token 失效作为特殊的拦截，会暴露特殊的code值 3000
    //再响应拦截中 我们会拦截很多全局性错误代码
    if(res.data.code ==403){
        Message.error(res.data.msg)
        //如果token失效就返回登录页面
        router.push('/login')
    }
    //全局拦截错误
    return res
})

//暴露出http
export default http