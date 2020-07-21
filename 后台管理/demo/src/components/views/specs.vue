<template>
    <div>
        <!-- 面包屑 -->
        <bread-Crumb></bread-Crumb>
        <!-- 按钮 -->
        <div>
            <el-button size="small" type="primary" @click="add">添加</el-button>
        </div>
        <!-- 表格信息 -->
        <el-table :data="getStateSpecsList" border style="width: 100%" row-key="id">
            <el-table-column prop="id" label="商品规格编号"></el-table-column>
            <el-table-column prop="specsname" label="商品规格名称"></el-table-column>
            <el-table-column prop="attrs" label="商品规格属性">
                <template slot-scope="item">
                    <el-tag v-for="val in item.row.attrs" :key="val" type="info">{{val}}</el-tag>
                </template>
            </el-table-column>
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
            :title="isAdd ? '商品规格添加':'商品规格编辑'"
            :visible.sync="dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="specsInfo" :rules="rules" ref="specsInfo">
                <el-form-item label="规格名称：" :label-width="formLabelWidth" prop="specsname">
                    <el-input v-model="specsInfo.specsname"></el-input>
                </el-form-item>
                <el-form-item
                    v-for="(item, index) in specsArr"
                    label="规格属性:"
                    :key="item.value"
                    :label-width="formLabelWidth"
                >
                    <el-input style="width:70%" v-model="item.value"></el-input>
                    <el-button v-if="index==0" type="primary" @click="addSpecs">新增规格</el-button>
                    <el-button v-else type="primary" @click="removeSpecs(item)">删除</el-button>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="specsInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="specsInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="isAdd" type="primary" @click="subInfo('specsInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('specsInfo')">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//引入商品规格接口
import {
    getspecsAdd,
    getspecsInfo,
    getspecsEdit,
    getspecsDelete,
    getspecsCount
} from '../../util/axios'
//调取辅助性函数
import { mapActions, mapGetters } from 'vuex'
//引入面包屑组件
import breadCrumb from '../common/breadcrumb'
export default {
    data() {
        return {
            //动态的表单域
            specsArr: [
                {
                    value: ''
                }
            ],
            count: 0, //总条目
            //分页数据
            pageInfo: {
                size: 2, //代表一个页面查询2条数据
                page: 1 //一共有多少页面
            },
            isAdd: true, //添加
            formLabelWidth: '100px', //label宽度
            specsInfo: {
                specsname: '', //商品规格名称
                attrs: '', //商品规格属性值
                status: '1'
            },
            editId: 0,
            dialogIsShow: false, //是否出现弹框
            rules: {
                specsname: [
                    {
                        required: true,
                        message: '请输入商品规格名称',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['getStateSpecsList'])
    },
    mounted() {
        //组件一加载就调取商品规格接口
        //触发才调取vuex中的商品规格列表
        this.getCount()
    },
    methods: {
        //添加表单
        addSpecs() {
            //根据产品需求对添加规格属性进行限制,最多添加6个规格
            if (this.specsArr.length <= 6) {
                //在规格属性数组中添加对象
                this.specsArr.push({
                    value: ''
                })
            } else {
                this.$message.warning('最多添加6个规格，不能再多了呦')
            }
        },
        //移除属性
        removeSpecs(item) {
            var index = this.specsArr.indexOf(item)
            if (index !== -1) {
                this.specsArr.splice(index, 1)
            }
        },
        //关闭弹框事件
        cancel() {
            this.reset()
            this.dialogIsShow = false
        },
        //重置输入内容
        reset() {
            this.specsInfo = {
                specsname: '', //商品规格名称
                // attrs: '', //商品规格属性值
                status: '1'
            }
            //清除动态表单
            this.specsArr = [
                {
                    value: ''
                }
            ]
        },
        //封装一个获取商品规格列表事件
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
        update(id) {
            //调取角色列表
            this.getActionRoleList()
            this.dialogIsShow = true
            this.isAdd = false
            //给编辑id赋值
            this.editId = id
            //调取商品规格查询一条数据
            getspecsInfo({ id }).then(res => {
                if (res.data.code == 200) {
                    this.specsInfo = res.data.list[0]
                    console.log(this.specsInfo, '信息')
                    //对数据类型进行转化
                    //映射属性 取出每一个item 并赋值给 specsArr对象中的value
                    this.specsInfo.attrs.map((item, i) => {
                        if (i == 0) {
                            this.specsArr[0].value =item
                        } else {
                            this.specsArr.push({
                                value: item
                            })
                        }
                    })
                    this.specsInfo.status = this.specsInfo.status.toString()
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
                    getspecsDelete({ id }).then(res => {
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
                    //对提交数据进行转化 '红色，奶奶灰，白色。。'
                    let data = this.specsInfo
                    //对规格属性数组进行映射 映射成一个新数组 新数组有你的value
                    let arr = this.specsArr.map(item => {
                        return item.value
                    })
                    data.attrs = arr ? arr.join(',') : ''
                    //根据isAdd状态去判断执行接口
                    if (this.isAdd) {
                        //调取添加接口
                        getspecsAdd(this.specsInfo).then(res => {
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
                        let data = this.specsInfo
                        data.id = this.editId
                        //调取更新接口
                        getspecsEdit(data).then(res => {
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
            getspecsCount().then(res => {
                if (res.data.code == 200) {
                    this.count = res.data.list[0].total
                    //如果当前不是第一页并且只有一条数据，我就让页面数量--
                    if (
                        this.pageInfo.page != 1 &&
                        this.getStateSpecsList.length == 1
                    ) {
                        this.pageInfo.page--
                    }
                    //调取获取商品规格接口列表的行动
                    this.$store.dispatch('getActionSpecsList', this.pageInfo)
                }
            })
        },
        //当页面发生变化的时候触发该方法
        getPage(n) {
            //n是当前页
            this.pageInfo.page = n
            //重新调取列表页面
            this.$store.dispatch('getActionSpecsList', this.pageInfo)
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
