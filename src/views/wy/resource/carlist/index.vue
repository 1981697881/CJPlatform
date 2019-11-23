<template>
  <div class="app-list">
    <Tree class="list-tree" @handler-node="handlerTree" />
    <div class="list-container">
      <div>
        <tabs-bar @addUnit="handlerTabs" @open-dialog="handlerVisible" @clean-store="cleanStore" />
      </div>
      <list ref="list" @open-dialog="handlerVisible" />
    </div>

    <el-dialog
      :visible.sync="visible"
      title="编辑"
      :width="'70%'"
      destroy-on-close
      @close="cleanStore"
    >
      <car-info ref="carInfo" v-if="carVisible" @close-dialog="closeVisible" />
      <park-info-n ref="parkInfoN" v-if="parkVisibleN" @close-dialog="closeVisible" />
       <park-info ref="parkInfo" v-if="parkVisible" @close-dialog="closeVisible" />
      <!-- <car-info ref="carInfo" v-if="parkInfoN" @close-dialog="closeVisible" /> -->
      <div slot="footer">
        <el-button @click.native="visible= false">取 消</el-button>
        <el-button type="primary" @click.native="handlerForm">保存</el-button>
      </div>
    </el-dialog>

    <!--  <el-dialog
      :visible.sync="visiblePark"
      title="车库信息"
      :width="'70%'"
      destroy-on-close
      @close="cleanStore"
    >
      <car-info ref="carInfo" v-if="visible" @close-dialog="closeVisible" />
      <div slot="footer">
        <el-button @click.native="visible= false">取 消</el-button>
        <el-button type="primary" @click.native="handlerForm">保存</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import { Tree, TabsBar, List } from "./components";
import { CarInfo, ParkInfo, ParkInfoN } from "./form";
import { mapGetters } from "vuex";
export default {
  components: {
    Tree,
    TabsBar,
    List,
    CarInfo,
    ParkInfo,
    ParkInfoN
  },
  data() {
    return {
      visible: false,
      carVisible: false,
      parkVisibleN: false,
      parkVisible: false
    };
  },
  computed: {
    ...mapGetters(["node"])
  },
  methods: {
    // 弹窗关闭清空store
    cleanStore() {
      this.carVisible = false;
      this.parkVisibleN = false;
      this.parkVisible = false;

      let node = this.node;
      //清空node在赋值node  触发列表重新获取并刷新列表
      this.$store.dispatch("tree/setNode", "");
      this.$store.dispatch("tree/setNode", node);

      this.$store.dispatch("list/setData", {});
    },
    closeVisible() {
      this.visible = false;
    },
    handlerVisible(activName) {
      this.visible = true;
      this[activName] = true;
    },
    handlerForm() {
      this.$refs["carInfo"].saveData();
    },
    handlerTree(data) {
      //this.$refs.list.fetchData(data);
    },
    handlerTabs(prId) {
      this.$refs.list.addUnit(prId);
      this.floorId = prId;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
