<template>
  <div class="list-header">
    <el-form :model="search" label-width="80px" :size="'mini'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'快速查找'">
            <el-input v-model="search.text"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button size="mini">查询</el-button>
        </el-col>
        <el-col :span="8" :offset="4">
          <el-dropdown @command="handlerTabs">
            <el-button size="mini">
              新增
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addCar" :command="1">新增车位</el-dropdown-item>
              <el-dropdown-item @click.native="addPark" :command="2">新增车库</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handlerTabs">
            <el-button size="mini">
              修改
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updCar" :command="1">修改车位</el-dropdown-item>
              <el-dropdown-item @click.native="updPark" :command="2">修改车库</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handlerTabs">
            <el-button size="mini">
              删除
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="delCar" :command="1">删除车位</el-dropdown-item>
              <el-dropdown-item @click.native="delPark" :command="2">删除车库</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini">审核</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteSpaceByIds} from "@/api/wy/resource/carlist";

export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"]),
    nd() {
      return this.node.data;
    }
  },
  data() {
    return {
      search: {
        text: ""
      }
    };
  },
  methods: {
    addCar() {
      if (this.nd.type == 3) {
        this.$emit("open-dialog",'carVisible');
      } else {
        this.$message({
          message: "请选择车库",
          type: "warning"
        });
      }
    },
    addPark() {
      if (this.nd.type == 2 || this.nd.type == 3) {
         this.$emit("open-dialog",'parkVisibleN');
      } else {
        this.$message({
          message: "请选择楼盘",
          type: "warning"
        });
      }
    },
    updCar() {
      if (this.clickData.fid) {
          this.$emit("open-dialog",'carVisible');
      } else {
        this.$message({
          message: "请选中车位",
          type: "warning"
        });
      }
    },
    updPark() {
      if (this.nd.type == 2) {
         this.$emit("open-dialog",'parkVisible');
      } else {
        this.$message({
          message: "请选择车库",
          type: "warning"
        });
      }
    },
    delCar() {
      if (this.selections.length!=0) {
        let ids = []
        this.selections.forEach(item => {
          ids.push(item.fid)
        });
        const data = {
          ids:ids
        }
        deleteSpaceByIds(data).then(res=>{
           if(res.status == 0 )  this.$emit('clean-store')
        })
      } else {
        this.$message({
          message: "请选中要删除的车位",
          type: "warning"
        });
      }
    },
    delPark() {
      if (this.nd.type == 3) {
        console.log("正常");
      } else {
        this.$message({
          message: "请选择车库",
          type: "warning"
        });
      }
    },

    handlerTabs(val) {}
  }
};
</script>

<style>
</style>