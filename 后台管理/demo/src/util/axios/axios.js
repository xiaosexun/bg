import axios from 'axios'
//重新创建自定义实例
let http = axios.create({
    baseURL:'/api'
})

export default http

