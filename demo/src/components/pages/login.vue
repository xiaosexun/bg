<template>
    <div>
        <div>
            <h1>欢迎登录</h1>
            <div>
                用户名：
                <input type="text" v-model="userInfo.name" />
            </div>
            <div>
                密码：
                <input type="text" v-model="userInfo.pass" />
            </div>
            <button @click="login">登录</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                name: '',
                pass: ''
            }
        }
    },
    methods: {
        //封装一个登录事件
        login() {
            //前端做空判断
            if (this.userInfo.name == '' || this.userInfo.pass == '') {
                alert('请输入用户名或者密码')
            } else {
                //调取接口
                //模拟登录成功
                if (
                    this.userInfo.name == 'admin' &&
                    this.userInfo.pass == '123'
                ) {
                    //把登录状态存储到本地存储中
                    sessionStorage.setItem('isLogin','登录')
                    //跳转到首页
                    this.$router.push('/home')
                } else {
                    alert('用户名或者密码错误')
                }
            }
        }
    }
}
</script>

<style  lang="" scoped>
</style>

