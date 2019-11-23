<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" name="1">
        <el-form v-model="form" :label-width="'110px'" :size="'mini'">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="'收费项目'">
                <el-select v-model="form" class="width-full">
                  <el-option :value="1" :label="'测试'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'序号'">
                <el-input type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'币种'">
                <el-select v-model="form" class="width-full">
                  <el-option :value="1" :label="'测试'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item :label="'用量公式'">
                <el-input type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button :size="'mini'">设置</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item :label="'公摊公式'">
                <el-input type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button :size="'mini'">设置</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="17">
              <el-form-item :label="'标准单价'">
                <el-input type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-checkbox>启用阶梯单价</el-checkbox>
            </el-col>
            <el-col :span="2">
              <el-button :size="'mini'">设置</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item :label="'费项类别'">
                <el-input type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button :size="'mini'">设置</el-button>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary">设置周期性费用</el-button>
            <el-button type="primary">取消周期性费用</el-button>
            <el-button type="primary">成批修改周期性费用</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="高级设置" name="2">高级设置</el-tab-pane>
      <el-tab-pane label="进退场设置" name="3">进退场设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fetchJsonp from "fetch-jsonp";
import { finReceiveItemList } from "@/api/cw/finance/rateslist";
import List from "@/components/List";

export default {
  props: {
    height: {
      type: String,
      default: "100%"
    }
  },
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      form: {},
      activeName: "1",
      loading: false,
      list: {},
      columns: [
        { text: "费项名称", name: "feeName" },
        { text: "收费项目", name: "projectName" },
        { text: "费项类别", name: "feeType" },
        { text: "系统类别", name: "systemType" },
        { text: "单价", name: "price" },
        { text: "费项编号", name: "feeNo" },
        { text: "用量公式", name: "userFormula" },
        { text: "公摊公式", name: "sharedFormula" },
        { text: "启用阶梯单价", name: "isLadder" }
      ]
    };
  },
  watch: {
    node(val) {
      return;

      this.fetchData(val.data.status);
    },
    list(val) {
      // 转换列表的审核状态
      let nlist = this.list.list;
      for (let i in nlist) {
        let audit = nlist[i].audit;

        if (audit == 0) {
          this.list.list[i].audit = "未审核";
        } else if (audit == 1) {
          this.list.list[i].audit = "已审核";
        }
      }
    }
  },
  methods: {
    //审核
    audit(index, row) {
      //获取时间
      let date = new Date();
      let y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate();
      let time = y + "-" + m + "-" + d;

      const data = {
        fid: row.fid,
        reviewTime: time,
        audit: row.audit == "已审核" ? "-3" : 1
      };
      auditRentContract(data).then(res => {
        if (res.status == 0) {
          this.refresh();
        }
      });
    },
    //启用
    start(index, row) {
      startRentContract({ contractId: row.fid }).then(res => {
        if (res.status == 0) {
          this.refresh();
        }
      });
    },
    //删除当前行
    delRow(index, row) {
      deleteContract({ fid: row.fid }).then(res => {
        if (res.status == 0) {
          this.refresh();
        }
      });
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    //监听双击某一行
    dblclick(obj) {
      this.$emit("handlerColumn", true, obj.row);
    },
    //监听每页显示几条
    handleSize(val) {
      this.list.pageSize = val;
      this.fetchData(this.node.data.status);
    },
    //监听当前页
    handleCurrent(val) {
      this.list.pageNum = val;
      this.fetchData(this.node.data.status);
    },
    //获取列表
    fetchData(projectId, systemType) {
      this.loading = true;
      const data = {
        projectId: projectId,
        systemType: systemType,
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 30
      };
      finReceiveItemList(data)
        .then(res => {
          this.$store.dispatch("list/setClickData", {});
          this.list = res.data;
          console.log(this.list);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    //刷新列表
    refresh() {
      let node = this.node;
      //清空node在赋值node  触发列表重新获取并刷新列表
      this.$store.dispatch("tree/setNode", "");
      this.$store.dispatch("tree/setNode", node);
    }
  }
};
</script>

<style scoped>
.list-main {
  height: calc(100vh - 377px);
}
</style>
