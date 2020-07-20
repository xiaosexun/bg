export default {
    //触发修改state
    reqMenuList(state,payload){
        state.menuList = payload
    },
    reqRoleList(state,payload){
        state.roleList = payload
    },
    reqUserList(state,payload){
        state.userList = payload
    },
    reqCateList(state,payload){
        state.cateList = payload
    }
}