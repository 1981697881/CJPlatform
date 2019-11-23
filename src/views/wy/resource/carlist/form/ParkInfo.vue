<template>
  <div>
    <el-form :model="form" :label-width="'100px'" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'车库名称'">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'车库编号'">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'车库面积'">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'物业接盘时间'">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'所属楼盘'">
            <el-select v-model="form.buildId" class="width-full">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in buildFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'附加说明'">
            <el-input type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { buildFormat } from "@/api/format";
export default {
  data() {
    return {
      form: {
          num:0
      },
      buildFormat: []
    };
  },
  created() {
    this.fetchFormat();
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    fetchFormat() {
      buildFormat().then(res => {
        this.buildFormat = res.data;
      });
    }
  }
};
</script>

<style>
</style>