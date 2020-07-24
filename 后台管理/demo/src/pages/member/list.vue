<template>
    <div>
        <el-table :data="mList" border style="width: 100%">
            <el-table-column prop="uid" label="用户编号"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status==1" type="success">启动</el-tag>
                    <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="item">
                    <el-button size="small" type="primary" @click="update(item.row.uid)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
//引入用户接口
import { getmemberList } from '../../util/axios'
export default {
    data() {
        return {
            mList:[]
        }
    },
    mounted() {
        //组件一加载就调取会员接口
        this.getList()
    },
    methods: {
        //封装一个获取会员列表事件
        getList() {
            getmemberList().then((res) => {
                console.log(res, '会员列表')
                if(res.data.code==200){
                    this.mList = res.data.list
                }
            })
        },

        //点击添加按钮修改父组件数据
        update(id) {
            this.$emit('edit', {
                isAdd: false,
                dialogIsShow: true,
                id
            })
        },
    },
}
</script>

<style  lang="" scoped>
</style>
