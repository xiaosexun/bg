<template>
    <div>
        <!-- 面包屑 -->
        <bread-Crumb></bread-Crumb>
        <!-- 按钮 -->
        <div>
            <el-button size="small" type="primary" @click="add">添加</el-button>
        </div>
        <!-- 表格信息 -->
        <el-table :data="getStateUserList" border style="width: 100%" row-key="id">
            <el-table-column prop="uid" label="用户编号"></el-table-column>
            <el-table-column prop="username" label="用户名称"></el-table-column>
            <el-table-column prop="rolename" label="所属角色"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status==1" type="success">启动</el-tag>
                    <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="item">
                    <el-button size="small" type="primary" @click="update(item.row.uid)">编辑</el-button>
                    <el-button size="small" type="danger" @click="del(item.row.uid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 
            分页器 
            background 是否为分页按钮添加背景色
            layout  组件布局，子组件名用逗号分隔
            total 总条目数
            page-size 每页显示条目个数，支持 .sync 修饰符
            currentPage 改变时会触发 当前页
        -->
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageInfo.size"
            :total="count"
            @current-change="getPage"
        ></el-pagination>
        <!-- 弹框内容 -->
        <el-dialog
            :title="isAdd ? '用户添加':'用户编辑'"
            :visible.sync="dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="userInfo" :rules="rules" ref="userInfo">
                <el-form-item
                    label="所属角色："
                    :label-width="formLabelWidth"
                    placeholder="请选择所属角色"
                    prop="roleid"
                >
                    <el-select v-model="userInfo.roleid" placeholder="请选择">
                        <el-option
                            v-for="item in getStateRoleList"
                            :key="item.id"
                            :label="item.rolename"
                            :value="item.id"
                        >{{item.rolename}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名称：" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="userInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="userInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="isAdd" type="primary" @click="subInfo('userInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('userInfo')">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//引入用户接口
import {
    getuserAdd,
    getuserInfo,
    getuserEdit,
    getuserDelete,
    getuserCount
} from '../../util/axios'
//调取辅助性函数
import { mapActions, mapGetters } from 'vuex'
//引入面包屑组件
import breadCrumb from '../common/breadcrumb'
export default {
    data() {
        return {
            count: 0, //总条目
            //分页数据
            pageInfo: {
                size: 2, //代表一个页面查询2条数据
                page: 1 //一共有多少页面
            },
            isAdd: true, //添加
            formLabelWidth: '100px', //label宽度
            userInfo: {
                username: '', //用户名称
                roleid: '', //角色编号
                password: '', //密码
                status: '1'
            },
            editId: 0,
            dialogIsShow: false, //是否出现弹框
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 6,
                        message: '长度在 2 到 6 个字符',
                        trigger: 'blur'
                    }
                ],
                roleid: [
                    {
                        required: true,
                        message: '请选择所属角色',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['getStateUserList', 'getStateRoleList'])
    },
    mounted() {
        //组件一加载就调取用户接口
        //触发才调取vuex中的用户列表
        this.getCount()
    },
    methods: {
        //关闭弹框事件
        cancel() {
            this.reset()
            this.dialogIsShow = false
        },
        //重置输入内容
        reset() {
            this.userInfo = {
                username: '', //用户名称
                roleid: '', //角色编号
                password: '', //密码
                status: '1'
            }
        },
        //封装一个获取用户列表事件
        ...mapActions(['getActionRoleList']),
        //点击添加按钮出现弹框
        add() {
            console.log('出现弹框')
            //出现弹框
            this.dialogIsShow = true
            this.isAdd = true
            //调取角色列表
            this.getActionRoleList()
        },
        //点击编辑按钮出现弹框并携带数据
        update(uid) {
            //调取角色列表
            this.getActionRoleList()
            this.dialogIsShow = true
            this.isAdd = false
            //给编辑id赋值
            this.editId = uid
            //调取用户查询一条数据
            getuserInfo({ uid }).then(res => {
                if (res.data.code == 200) {
                    console.log(res)
                    this.userInfo = res.data.list
                    this.userInfo.status = this.userInfo.status.toString()
                }
            })
        },
        //删除事件
        del(uid) {
            this.$confirm('你确定要删除这条数据吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    //调取删除逻辑
                    getuserDelete({ uid }).then(res => {
                        if (res.data.code == 200) {
                            //重新调取接口列表
                            this.getCount()
                            this.$message.success(res.data.msg)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        //确定添加或者更新事件
        subInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.userInfo, '官员表单')
                    //根据isAdd状态去判断执行接口
                    if (this.isAdd) {
                        //调取添加接口
                        getuserAdd(this.userInfo).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框
                                this.dialogIsShow = false
                                //清空输入框
                                this.reset()
                                //添加成功重新查询列表
                                this.getCount()
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        let data = this.userInfo
                        data.id = this.editId
                        //调取更新接口
                        getuserEdit(data).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框
                                this.dialogIsShow = false
                                //清空输入框
                                this.reset()
                                //添加成功重新查询列表
                                this.getCount()
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
        },
        //封装获取总条目接口
        getCount() {
            //调取总条数接口
            getuserCount().then(res => {
                if (res.data.code == 200) {
                    this.count = res.data.list[0].total
                    //如果当前不是第一页并且只有一条数据，我就让页面数量--
                    if(this.pageInfo.page !=1 && this.getStateUserList.length==1){
                        this.pageInfo.page--
                    }
                     //调取获取用户接口列表的行动
                        this.$store.dispatch('getActionUserList', this.pageInfo)
                }
            })
        },
        //当页面发生变化的时候触发该方法
        getPage(n) {
            //n是当前页
            this.pageInfo.page = n
            //重新调取列表页面
            this.$store.dispatch('getActionUserList', this.pageInfo)
        }
    },
    components: {
        breadCrumb
    }
}
</script>

<style  lang="stylus" scoped>
.el-button {
    margin-bottom: 10px;
}

.el-input {
    width: 85%;
}

.el-pagination {
    float: right;
    margin: 16px 0;
}
</style>
