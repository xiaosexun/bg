//接口集合模块
import http from './axios'

//封装一个菜单列表接口
export function getMenuList(params){
    return http.get('/api/menulist',{
        params
    })
}
//添加
export function getMenuAdd(data){
    return http.post('/api/menuadd',data)
}
//获取一条
export function getMenuInfo(params){
    return http.get('/api/menuinfo',{
        params
    })
}
//修改
export function getMenuEdit(data){
    return http.post('/api/menuedit',data)
}
//删除
export function getMenuDelete(data){
    return http.post('/api/menudelete',data)
}
/* ============== 角色接口  ================== */
//封装一个角色列表接口
export function getroleList(){
    return http.get('/api/rolelist')   
}
//封装一个角色添加接口
export function getroleAdd(data){
    return http.post('/api/roleadd',data)   
}
//封装一个角色获取（一条）接口
export function getroleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })   
}
//封装一个角色修改接口
export function getroleEdit(data){
    return http.post('/api/roleedit',data)   
}
//封装一个角色删除接口
export function getroleDelete(data){
    return http.post('/api/roledelete',data)   
}