<template>
    <div>
        <el-dialog
            :title="addInfo.isAdd ? '菜单添加':'菜单编辑'"
            :visible.sync="addInfo.dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
                <el-form-item label="菜单名称：" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="menuInfo.title"></el-input>
                </el-form-item>
                <el-form-item
                    label="上级菜单："
                    :label-width="formLabelWidth"
                    placeholder="请选择菜单"
                    prop="pid"
                >
                    <el-select v-model="menuInfo.pid" placeholder="请选择">
                        <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
                        <el-option
                            v-for="item in getStateMenuList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        >{{item.title}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单类型：" :label-width="formLabelWidth">
                    <el-radio :disabled="menuInfo.pid!=0" v-model="menuInfo.type" label="1">目录</el-radio>
                    <el-radio :disabled="menuInfo.pid==0" v-model="menuInfo.type" label="2">菜单</el-radio>
                </el-form-item>
                <el-form-item v-if="menuInfo.type==1" label="菜单图标：" :label-width="formLabelWidth">
                    <el-input :disabled="menuInfo.pid!=0" v-model="menuInfo.icon"></el-input>
                </el-form-item>
                <el-form-item
                v-if="menuInfo.type==2" 
                    label="菜单地址："
                    :label-width="formLabelWidth"
                    placeholder="请选择菜单地址"
                >
                    <el-select :disabled="menuInfo.pid==0" v-model="menuInfo.url" placeholder="请选择">
                        <el-option
                            v-for="item in urlList"
                            :key="item"
                            :label="item"
                            :value="item"
                        >{{item}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="menuInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="menuInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="addInfo.isAdd" type="primary" @click="subInfo('menuInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('menuInfo')">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//引入菜单接口
import { getMenuAdd, getMenuEdit, getMenuInfo } from '../../util/axios'
//调取辅助性函数
import { mapActions, mapGetters } from 'vuex'
export default {
    props: ['addInfo'],
    data() {
        return {
            formLabelWidth: '100px', //label宽度
            menuInfo: {
                pid: 0, //上级分类编号
                title: '', //菜单名称
                icon: '', //图标
                url: '', //菜单地址
                type: '1', //类型1目录2菜单
                status: '1'
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入菜单名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 6,
                        message: '长度在 2 到 6 个字符',
                        trigger: 'blur'
                    }
                ],
                pid: [
                    {
                        required: true,
                        message: '请选择菜单',
                        trigger: 'blur'
                    }
                ]
            },
            urlList: [
                //用于管理所有组件的路由
                '/menu',
                '/user',
                '/goods',
                '/role',
                '/sort',
                '/specs',
                '/member',
                '/banner',
                '/seck'
            ]
        }
    },
    computed: {
        //计算属性
        ...mapGetters(['getStateMenuList'])
    },
    methods: {
        //封装一个获取菜单列表事件
        ...mapActions(['getActionMenuList']),
        //关闭弹框事件
        cancel() {
            this.reset()
            this.$emit('cancel', false)
        },
        //重置输入内容
        reset() {
            this.menuInfo = {
                pid: 0, //上级分类编号
                title: '', //菜单名称
                icon: '', //图标
                url: '', //菜单地址
                type: '1', //类型1目录2菜单
                status: '1' //1是启用 2是禁用
            }
        },
        //点击编辑按钮出现弹框并携带数据
        update(id) {
            //给编辑id赋值
            this.editId = id
            //调取菜单查询一条数据
            getMenuInfo({ id }).then(res => {
                if (res.data.code == 200) {
                    console.log(res)
                    this.menuInfo = res.data.list
                    this.menuInfo.type = this.menuInfo.type.toString()
                    this.menuInfo.status = this.menuInfo.status.toString()
                }
            })
        },
        //确定添加或者更新事件
        subInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //根据isAdd状态去判断执行接口
                    if (this.addInfo.isAdd) {
                        //调取添加接口
                        getMenuAdd(this.menuInfo).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框 清空输入框
                                this.cancel()
                                //添加成功重新查询列表
                                this.getActionMenuList()
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        let data = this.menuInfo
                        data.id = this.editId
                        //调取更新接口
                        getMenuEdit(data).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框 清空输入框
                                this.cancel()
                                //添加成功重新查询列表
                                this.getActionMenuList()
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style  lang="" scoped>
</style>
