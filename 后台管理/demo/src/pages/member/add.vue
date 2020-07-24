<template>
    <div>
        <el-dialog title="会员编辑" :visible.sync="addInfo.dialogIsShow" center :before-close="cancel">
            <el-form :model="memberInfo" :rules="rules" ref="memberInfo">
                <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="memberInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" :label-width="formLabelWidth" prop="nickname">
                    <el-input v-model="memberInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="memberInfo.password"></el-input>
                </el-form-item>

                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="memberInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="memberInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="subInfo('memberInfo')">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//引入会员接口
import { getmemberEdit, getmemberInfo } from '../../util/axios'
export default {
    props: ['addInfo'],
    data() {
        return {
            formLabelWidth: '100px', //label宽度
            memberInfo: {
                uid: 0, //上级分类编号
                phone: '', //手机号
                password: '', //密码
                nickname: '', //昵称
                status: '1', //1是启用 2是禁用
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                    }
                ],
                nickname: [
                    {
                        required: true,
                        message: '请输入昵称',
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    methods: {
        //关闭弹框事件
        cancel() {
            this.reset()
            this.$emit('cancel', false)
        },
        //重置输入内容
        reset() {
            this.memberInfo = {
                uid: 0, //上级分类编号
                phone: '', //手机号
                password: '', //密码
                nickname: '', //昵称
                status: '1', //1是启用 2是禁用
            }
        },
        //点击编辑按钮出现弹框并携带数据
        update(uid) {
            this.editId = uid
            //调取会员查询一条数据
            getmemberInfo({ uid }).then((res) => {
                if (res.data.code == 200) {
                    console.log(res)
                    this.memberInfo = res.data.list
                    this.memberInfo.status = this.memberInfo.status.toString()
                }
            })
        },
        //确定添加或者更新事件
        subInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        let data = this.memberInfo
                        data.uid = this.editId
                        //调取更新接口
                        getmemberEdit(data).then((res) => {
                            if (res.data.code == 200) {
                                //关闭弹框 清空输入框
                                this.cancel()
                                //添加成功重新查询列
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
    },
}
</script>

<style  lang="" scoped>
</style>
