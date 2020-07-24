<template>
    <div>
        <el-dialog
            :title="addInfo.isAdd ? '秒杀活动添加':'秒杀活动编辑'"
            :visible.sync="addInfo.dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="seckInfo" :rules="rules" ref="seckInfo">
                <el-form-item label="活动名称：" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="seckInfo.title"></el-input>
                </el-form-item>
                <el-form-item label="活动期限：" :label-width="formLabelWidth" prop="title">
                    <el-date-picker
                        v-model="dateValue"
                        type="datetimerange"
                        align="right"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        value-format="timestamp"
                        @change="getTime"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item
                    label="一级分类："
                    :label-width="formLabelWidth"
                    placeholder="请选择一级分类"
                    prop="first_cateid"
                >
                    <el-select
                        @change="cateChange"
                        v-model="seckInfo.first_cateid"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in cateArr"
                            :key="item.id"
                            :label="item.catename"
                            :value="item.id"
                        >{{item.catename}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="二级分类："
                    :label-width="formLabelWidth"
                    placeholder="请选择二级分类"
                    prop="second_cateid"
                >
                    <el-select  @change="getGoods" v-model="seckInfo.second_cateid" placeholder="请选择">
                        <el-option
                            v-for="item in secondArr"
                            :key="item.id"
                            :label="item.catename"
                            :value="item.id"
                        >{{item.catename}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="商品："
                    :label-width="formLabelWidth"
                    placeholder="请选择商品"
                    prop="second_cateid"
                >
                    <el-select v-model="seckInfo.goodsid" placeholder="请选择">
                        <el-option
                            v-for="item in goodsArr"
                            :key="item.id"
                            :label="item.goodsname"
                            :value="item.id"
                        >{{item.goodsname}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="seckInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="seckInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="addInfo.isAdd" type="primary" @click="subInfo('seckInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('seckInfo')">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//引入秒杀活动接口
import {
    getseckAdd,
    getseckEdit,
    getseckInfo,
    getcateList,
    getgoodsList
} from '../../util/axios'
//调取辅助性函数
import { mapActions, mapGetters } from 'vuex'
export default {
    props: ['addInfo'],
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            )
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            )
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            )
                            picker.$emit('pick', [start, end])
                        },
                    },
                ],
            },
            formLabelWidth: '100px', //label宽度
            seckInfo: {
                title: '', //限时秒杀名称
                begintime: '', //开始时间
                endtime: '', //结束时间
                first_cateid: '', //商品一级分类编号
                second_cateid: '', //商品二级分类编号
                goodsid: '', //商品编号
                status: '1',
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入秒杀活动名称',
                        trigger: 'blur',
                    },
                    {
                        min: 2,
                        max: 20,
                        message: '长度在 2 到 20 个字符',
                        trigger: 'blur',
                    },
                ],
            },
            dateValue: [],
            cateArr: [],
            secondArr: [],
            goodsArr: [],
        }
    },
    computed: {
        //计算属性
        ...mapGetters(['getStateMenuList']),
    },
    mounted() {
        //组件一加载获取一级
        this.getCatesList()
    },
    methods: {
        //获取分类列表
        getCatesList(pid = 0) {
            getcateList({ pid }).then((res) => {
                if (res.data.code == 200) {
                    if(pid==0){
                         this.cateArr = res.data.list
                    }else{
                        this.secondArr = res.data.list
                    }
                   
                }
            })
        },
        //点击一级获取二级
        cateChange(e){
            this.secondArr = []
            this.getCatesList(e)
        },
        //获取商品
        getGoods(){
            //调取接口列表数据
            getgoodsList({
                fid:this.seckInfo.first_cateid,
                sid:this.seckInfo.second_cateid
            })
            .then(res=>{
                if(res.data.code==200){
                    this.goodsArr = res.data.list
                }
            })
        },
        //获取时间
        getTime(e) {
            this.seckInfo.begintime = e[0]
            this.seckInfo.endtime = e[1]
        },
        //封装一个获取秒杀活动列表事件
        ...mapActions(['getActionSeckList']),
        //关闭弹框事件
        cancel() {
            this.reset()
            this.$emit('cancel', false)
        },
        //重置输入内容
        reset() {
            this.seckInfo = {
                pid: 0, //上级分类编号
                title: '', //秒杀活动名称
                icon: '', //图标
                url: '', //秒杀活动地址
                type: '1', //类型1目录2秒杀活动
                status: '1', //1是启用 2是禁用
            }
        },
        //点击编辑按钮出现弹框并携带数据
        update(id) {
            //给编辑id赋值
            this.editId = id
            //调取秒杀活动查询一条数据
            getseckInfo({ id }).then((res) => {
                if (res.data.code == 200) {
                    console.log(res)
                    this.seckInfo = res.data.list
                    this.seckInfo.type = this.seckInfo.type.toString()
                    this.seckInfo.status = this.seckInfo.status.toString()
                }
            })
        },
        //确定添加或者更新事件
        subInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //根据isAdd状态去判断执行接口
                    if (this.addInfo.isAdd) {
                        //调取添加接口
                        getseckAdd(this.seckInfo).then((res) => {
                            if (res.data.code == 200) {
                                //关闭弹框 清空输入框
                                this.cancel()
                                //添加成功重新查询列表
                                this.getActionSeckList()
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        let data = this.seckInfo
                        data.id = this.editId
                        //调取更新接口
                        getseckEdit(data).then((res) => {
                            if (res.data.code == 200) {
                                //关闭弹框 清空输入框
                                this.cancel()
                                //添加成功重新查询列表
                                this.getActionSeckList()
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
    },
}
</script>

<style  lang="" scoped>
</style>
