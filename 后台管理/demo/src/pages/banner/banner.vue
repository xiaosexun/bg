<template>
    <div>
        <!-- 面包屑 -->
        <bread-Crumb></bread-Crumb>
        <!-- 按钮 -->
        <div>
            <el-button size="small" type="primary" @click="add">添加</el-button>
        </div>
        <!-- 表格信息 -->
        <v-list @edit="edit"></v-list>
        <!-- 弹框内容 -->
        <v-add ref="vAdd" :addInfo="addInfo" @cancel="cancel"></v-add>
    </div>
</template>

<script>
//引入面包屑组件
import breadCrumb from '../../components/common/breadcrumb'
//引入list组件
import vList from './list'
//引入弹框
import vAdd from './add'
export default {
    data() {
        return {
            addInfo: {
                //控制弹框的信息
                isAdd: true, //添加
                dialogIsShow: false //是否出现弹框
            }
        }
    },
    methods: {
        //子传父去修改父级的数据
        cancel(e) {
            this.addInfo.dialogIsShow = e
        },
        //list组件传值并修改数据
        edit(e) {
            this.addInfo.isAdd = e.isAdd
            this.addInfo.dialogIsShow = e.dialogIsShow
            this.$refs.vAdd.update(e.id)
        },
        //点击添加按钮出现弹框
        add() {
            this.addInfo = {
                isAdd: true,
                dialogIsShow: true
            }
        }
    },
    components: {
        breadCrumb,
        vList,
        vAdd
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
