<template>
  <el-dialog
    title="客户资料"
    :visible.sync="visible"
    width="70%"
    v-if="visible"
    destroy-on-close
    append-to-body
  >
    <el-row :gutter="30" style="height:500px">
      <el-col :span="12" class="box-shadow height-full" style="padding-top:10px">
        <div class="list-header">
          <el-form v-model="search" :size="'mini'" label-width="80px">
            <el-row :gutter="0">
              <el-col :span="8">
                <el-form-item :label="'客户类型'">
                  <el-select class="width-full" v-model="search.fast" placeholder="请选择">
                    <el-option label="身份证" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'快速查找'">
                  <el-input v-model="search.fast" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button :size="'mini'" type="primary">查询</el-button>
              </el-col>
              <el-col :span="2">
                <el-button :size="'mini'" type="primary">刷新</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="list-main">
          <el-table
            :data="list.list"
            border
            size="mini"
            :highlight-current-row="true"
            :height="'100%'"
            ref="table"
            @row-click="onTableClick"
          >
            <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              :prop="t.name"
              :label="t.text"
              :width="t.width?t.width:''"
            ></el-table-column>
          </el-table>

          <div class="text-center" v-if="list.total && list.total!=0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="list.pageNum"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="list.pageSize"
              :page-count="list.pages?list.pages:0"
              layout="total, sizes, prev, pager, next, jumper"
              :total="list.total?list.total:0"
            ></el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="height-full">
        <el-tabs type="border-card" class="height-full">
          <el-tab-pane label="基础资料">
            <el-row>
              <el-col :span="24">2</el-col>
            </el-row>
            <el-row>
              <el-col :span="24">3</el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="附属联系人">配置管理</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer" :style="{'text-align':'center'}">
      <el-button :size="'mini'" @click="onSelect">选择</el-button>
      <el-button :size="'mini'">保存</el-button>
      <el-button :size="'mini'">新增</el-button>
      <el-button :size="'mini'">删除</el-button>
      <el-button :size="'mini'">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { customerList } from "@/api/wy/customer/commoditylist";
export default {
  data() {
    return {
      visible: false,
      search: {
        fast: ""
      },
      list: {
        pageNum: 1,
        pageSize: 10,
        pages: 0,
        total: 0
      },
      columns: [
        { text: "客户类别", name: "type" },
        { text: "客户名称", name: "name" },
        { text: "联系电话", name: "phone", width: 120 },
        { text: "联系人", name: "contact" },
        { text: "身份证号", name: "idCard" },
        { text: "是否黑名单", name: "isBlack", width: 120 },
        { text: "客户编号", name: "code" },
        { text: "企业性质", name: "nature" },
        { text: "注册资本", name: "capital" },
        { text: "统一社会信用编号", name: "creditCode", width: 160 },
        { text: "税务识别号", name: "taxNo", width: 120 },
        { text: "手机号码", name: "mobPhone" },
        { text: "传真号码", name: "faxNo" },
        { text: "电子邮箱", name: "email" },
        { text: "开户银行", name: "bank" },
        { text: "银行账号", name: "bankNo" },
        { text: "经营业态", name: "status" },
        { text: "招牌名称", name: "signatureName" },
        { text: "品牌名称", name: "brandName" },
        { text: "品牌级别", name: "brandType" },
        { text: "附加说明", name: "remark" }
      ],
      CLICK_DATA: {}//单击行的数据
    };
  },
  watch: {
    visible(val) {
      if (val) this.fetchData();
    }
  },
  mounted() {},
  methods: {
    onTableClick(row) {
      this.CLICK_DATA = row;
    },
    //选择
    onSelect() {
      this.$emit('click',this.CLICK_DATA)
    },
    // 监听弹窗visible状态
    handlerVisible(val) {
      this.visible = val;
    },
    //监听每页显示几条
    handleSizeChange(val) {
      this.list.pageSize = val;
    },
    //监听当前页
    handleCurrentChange(val) {
      this.list.pageNum = val;
    },
    fetchData() {
      const data = {
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 5
      };
      customerList(data).then(res => {
        this.list = res.data;
        console.log(this.list);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100% - 100px);
}
</style>
