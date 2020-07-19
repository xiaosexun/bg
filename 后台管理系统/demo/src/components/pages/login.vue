<template>
    <div class="bg-login">
        <!-- 表单视图 -->
        <el-form
            :model="userInfo"
            :rules="rules"
            ref="ruleForm"
            label-width="90px"
            class="demo-ruleForm login"
        >
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="userInfo.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
                <el-input v-model="userInfo.pass" show-password clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="login('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                name: '',
                pass: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 16,
                        message: '长度在 2 到 16 个字符',
                        trigger: 'blur'
                    }
                ],
                pass: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min:6,
                        max:16,
                        message:'请输入6-16正确密码',
                        trigger:'blur'
                    }
                ]
            }
        }
    },
    methods: {
        login(formName){
            console.log(this.userInfo,'表单对象')
            //validate 它的验证是基于什么都不填直接登录的一个验证
            this.$refs[formName].validate((valid) => {
          if (valid) {
              //调取登录接口
              if(this.userInfo.name=='admin' && this.userInfo.pass=='123456'){
                  this.$message.success('登录成功');
                  //登录成功之后就要跳转到index
                  this.$router.push('/home')
              }else{
                  this.$message.error('用户名或者密码错误');
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        }
    },
}
</script>

<style  lang="stylus" scoped>
@import '../../stylus/index.styl'
.bg-login
    width 100vw
    height 100vh
    background $bgColorFirst
    .login
        background $bgColorDefault
        padding: 40px 10px;
        margin: -150px 0 0 -150px;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 430px;
        height: 220px;
        border-radius 15px
        .el-input
            width 300px

</style>
