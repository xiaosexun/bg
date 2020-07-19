<template>
  <div>
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#">菜单管理</a>
      </el-breadcrumb-item>
    </el-breadcrumb>-->
    <bread-crumb></bread-crumb>
    <el-button size="small" type="primary" @click="add">添加</el-button>

    <el-table :data="getStateMenuList" style="width: 100%" border row-key="id" :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="上级编号" width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="180"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag type="success" v-if="item.row.status==0">启动</el-tag>
          <el-tag type="danger" v-if="item.row.status!=0">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button size="small" type="primary" @click="update(item.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="isAdd ? '菜单添加' : '菜单编辑' "
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="menuInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid">
          <el-select v-model="menuInfo.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            
            <el-option v-for='item in getStateMenuList' :key='item.id' :label="item.title" :value="item.id">{{item.title}}</el-option>
            
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio :disabled="menuInfo.pid!=0" v-model="menuInfo.type" label="1">目录</el-radio>
          <el-radio :disabled="menuInfo.pid==0" v-model="menuInfo.type" label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item  v-if='menuInfo.type==1' label="菜单图标">
          <el-input :disabled="menuInfo.pid!=0" v-model="menuInfo.icon"></el-input>
        </el-form-item>
        <el-form-item  v-if='menuInfo.type==2' label="菜单地址">
          <el-input :disabled="menuInfo.pid==0" v-model="menuInfo.url"></el-input>
        </el-form-item>
        <el-form-item label="状态">
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
import breadCrumb from "../common/breadcrumb";
import {
  getMenuAdd,
  getMenuInfo,
  getMenuEdit,
  getMenuDelete
} from "../../util/axios";
//调取辅助性函数
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
      isAdd: true,
      menuInfo: {
        pid: 0,
        title: "",
        icon: "",
        url: "",
        type: "1",
        status: "1" //0启用1禁用
      },
      editId: 0,
      // getStateMenuList: [],
      dialogIsShow: false,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapGetters(['getStateMenuList'])
  },
  mounted() {
    this.getActionMenuList();
  },
  methods: {
    cancel() {
      this.reset();
      this.dialogIsShow = false;
    },
    reset() {
      this.menuInfo = {
        pid: 0,
        title: "",
        icon: "",
        url: "",
        type: "1",
        status: "1" //0启用1禁用
      };
    },
    //获取菜单列表事件
   ...mapActions(['getActionMenuList']),

    add() {
      console.log("添加");
      this.dialogIsShow = true;
      this.isAdd = true;
    },
    update(id) {
      this.dialogIsShow = true;
      this.isAdd = false;
      this.editId = id;
      getMenuInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.menuInfo = res.data.list;
          this.menuInfo.type = this.menuInfo.type.toString();
          this.menuInfo.status = this.menuInfo.status.toString();
        }
      });
    },
    del(id) {
      console.log("删除");
      this.$confirm("确定要删除该文件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getMenuDelete({id}).then(res => {
            if (res.data.code == 200) {
              this.getActionMenuList();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //根据isAdd状态去判断执行接口
          if (this.isAdd) {
            //调取添加接口
            getMenuAdd(this.menuInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionMenuList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.menuInfo;
            data.id = this.editId;
            //调取更新接口
            getMenuEdit(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionMenuList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    breadCrumb
  }
};
</script>
<style lang="stylus" scoped>
.el-button {
  margin: 10px 0px;
}

.el-input {
  width: 80%;
}
</style>