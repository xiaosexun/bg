<template>
    <div>
        <!-- 面包屑 -->
        <bread-Crumb></bread-Crumb>
        <!-- 按钮 -->
        <div>
            <el-button size="small" type="primary" @click="add">添加</el-button>
        </div>
        <!-- 表格信息 -->
        <el-table
            :data="getStateRoleList"
            border
            style="width: 100%"
            row-key="id"
            :tree-props="{children: 'children'}"
        >
            <el-table-column prop="id" label="角色编号"></el-table-column>
            <el-table-column prop="rolename" label="角色名称"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status==1" type="success">启动</el-tag>
                    <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="item">
                    <el-button size="small" type="primary" @click="update(item.row.id)">编辑</el-button>
                    <el-button size="small" type="danger" @click="del(item.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹框内容 -->
        <el-dialog
            :title="isAdd ? '角色添加':'角色编辑'"
            :visible.sync="dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
                <el-form-item label="角色名称：" :label-width="formLabelWidth" prop="rolename">
                    <el-input v-model="menuInfo.rolename"></el-input>
                </el-form-item>
                <el-form-item label="角色权限：" :label-width="formLabelWidth" prop="rolename">
                    <el-tree
                        :data="getStateMenuList"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        :props="defaultProps"
                        :default-checked-keys="defaultKey"
                        check-strictly
                    ></el-tree>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="menuInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="menuInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="isAdd" type="primary" @click="subInfo('menuInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('menuInfo')">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//引入角色接口
import {
    getroleAdd,
    getroleInfo,
    getroleEdit,
    getroleDelete
} from '../../util/axios'
//调取辅助性函数
import { mapActions, mapGetters } from 'vuex'
//引入面包屑组件
import breadCrumb from '../common/breadcrumb'
export default {
    data() {
        return {
            defaultKey: [], //默认tree节点选中
            isAdd: true, //添加
            formLabelWidth: '100px', //label宽度
            menuInfo: {
                rolename: '', //角色名称
                menus: '', //角色权限
                status: '1'
            },
            editId: 0,
            dialogIsShow: false, //是否出现弹框
            rules: {
                rolename: [
                    {
                        required: true,
                        message: '请输入角色名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 6,
                        message: '长度在 2 到 6 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    computed: {
        ...mapGetters(['getStateRoleList', 'getStateMenuList'])
    },
    mounted() {
        //组件一加载就调取角色接口
        //触发才调取vuex中的角色列表
        this.getActionRoleList()
        this.getActionMenuList()
    },
    methods: {
        //关闭弹框事件
        cancel() {
            this.reset()
            this.dialogIsShow = false
        },
        //重置输入内容
        reset() {
            this.menuInfo = {
                rolename: '', //角色名称
                menus: '', //角色权限
                status: '1'
            }
            //重置我们tree的key选中状态
            this.$refs.tree.setCheckedKeys([])
        },
        //封装一个获取角色列表事件
        ...mapActions(['getActionRoleList', 'getActionMenuList']),
        //点击添加按钮出现弹框
        add() {
            console.log('出现弹框')
            //出现弹框
            this.dialogIsShow = true
            this.isAdd = true
        },
        //点击编辑按钮出现弹框并携带数据
        update(id) {
            this.dialogIsShow = true
            this.isAdd = false
            //给编辑id赋值
            this.editId = id
            //调取角色查询一条数据
            getroleInfo({ id }).then(res => {
                if (res.data.code == 200) {
                    console.log(res)
                    //对返回的数据类型进行转化
                    this.menuInfo = res.data.list
                    //把menus 转化数组的格式
                    this.defaultKey = this.menuInfo.menus
                        ? this.menuInfo.menus.split(',')
                        : []
                    this.menuInfo.status = this.menuInfo.status.toString()
                }
            })
        },
        //删除事件
        del(id) {
            this.$confirm('你确定要删除这条数据吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    //调取删除逻辑
                    getroleDelete({ id }).then(res => {
                        if (res.data.code == 200) {
                            //重新调取接口列表
                            this.getActionRoleList()
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
                    //对角色权限进行数据类型转化
                    this.menuInfo.menus = this.$refs.tree
                        .getCheckedKeys()
                        .join(',')
                    //根据isAdd状态去判断执行接口
                    if (this.isAdd) {
                        //调取添加接口
                        getroleAdd(this.menuInfo).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框
                                this.dialogIsShow = false
                                //清空输入框
                                this.reset()
                                //添加成功重新查询列表
                                this.getActionRoleList()
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
                        getroleEdit(data).then(res => {
                            if (res.data.code == 200) {
                                //关闭弹框
                                this.dialogIsShow = false
                                //清空输入框
                                this.reset()
                                //添加成功重新查询列表
                                this.getActionRoleList()
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
</style>
