<template>
  <el-dialog
    title="房产选择"
    :visible.sync="visible"
    width="60%"
    v-if="visible"
    destroy-on-close
    append-to-body
  >
    <el-container :style="{'min-height':'500px','max-height':'500px',}">
      <el-scrollbar :style="{'border-right':'1px solid #ececec'}">
        <el-aside>
          <el-tree
            ref="tree"
            :props="defaultProps"
            :default-expand-all="false"
            :load="loadTree"
            lazy
            node-key="id"
            highlight-current
            :expand-on-click-node="false"
            show-checkbox
          />
        </el-aside>
      </el-scrollbar>
      <el-main>
        <el-form v-model="form" :label-width="'80px'" :size="'mini'">
          <el-form-item :label="'房屋名称'">
            <el-input v-model="form.text" />
          </el-form-item>
          <el-form-item :label="'房屋编号'">
            <el-input v-model="form.unitCode" />
          </el-form-item>
          <el-form-item :label="'业户名称'">
            <el-input v-model="form.currentOwner" />
          </el-form-item>
          <el-form-item :label="'房屋状态'">
            <el-input v-model="form.statusName" disabled />
          </el-form-item>
          <el-form-item :label="'建筑面积'">
            <el-input v-model="form.buildArea" disabled />
          </el-form-item>
          <el-form-item :label="'计费面积'">
            <el-input v-model="form.costArea" disabled />
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div slot="footer" class="dialog-footer" :style="{'text-align':'center'}">
      <el-button :size="'mini'" @click="onSelect">确定</el-button>
      <el-button :size="'mini'">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { customerList } from "@/api/wy/customer/commoditylist";
import { getHousesTree } from "@/api/treeList";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "text",
        isLeaf: "leaf",
        id: "status"
      },
      visible: false,
      form: {
        text: null,
        unitCode: null,
        statusName: null,
        currentOwner: null,
        buildArea: null,
        costArea: null
      },
      isLeaf: false
    };
  },
  watch: {
    visible(val) {
      if (val) this.fetchData();
    }
  },
  mounted() {},
  methods: {
    onSelect() {
      let checks = this.$refs.tree.getCheckedNodes();
      let units = [];
      checks.forEach(item => {
        if (item.leaf) {
          // 挑出房间data
          units.push(item);
        }
      });
      if(units.length != 0){
      this.$emit("click", units);
      this.$message({
        message: "已选中" + units.length + "间房间",
        type: "success"
      });
      }else{
         this.$message({
        message: "请选择至少一间房间",
        type: "warning"
      });
      }
    },
    handlerVisible(val) {
      this.visible = val;
    },
    //监听node点击
    handlerNode(data, node) {
      return console.log(data);
      for (let key in data) {
        if (typeof (this.form[key] != undefined)) {
          this.form[key] = data[key];
        }
      }
      this.isLeaf = data.leaf;
    },
    loadTree(node, resolve) {
      var ndata = node.data;
      getHousesTree(ndata != null ? ndata.fid : "", node.level, 1).then(res => {
        var data = res.data;
        if (data.type === 1) {
          return resolve([{ text: data.text, id: 333 }]);
        }
        data.forEach(item => {
          //返回的leaf是string类型  要转为boolean才能正常加载
          item.leaf = eval(item.leaf.toLowerCase());
        });
          return resolve(data);
      });
    },
    fetchData() {}
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100% - 100px);
}
</style>
