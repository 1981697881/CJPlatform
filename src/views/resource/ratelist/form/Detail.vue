<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'客户编号'">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户名称'">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button @click.native="visible= false">取 消</el-button>
        <el-button type="primary" @click.native="saveData">保存</el-button>
      </div>
  </div>
</template>

<script>
import { getCustomerById, saveCustomer } from "@/api/wy/customer/commoditylist";

export default {
  props: {
    fid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        fid: null,
        name: null, // 客户名称
        code: null, // 客户编号
      },
    };
  },
  created() {

  },
  mounted() {
    if (this.fid) {
      this.fetchData(this.fid);
    }
  },
  methods: {
    saveData() {
      if(!this.form.buildId) return this.$message({
        message: "请选择房产",
        type: "warning"
      });
      saveCustomer(this.form).then(res => {
        console.log(res)
      });
    },
    fetchData(val) {
      getCustomerById(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style>
</style>
