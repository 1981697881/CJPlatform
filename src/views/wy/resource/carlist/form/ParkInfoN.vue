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
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="批量新增车位" name="1">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'车位个数'">
                <el-input-number  v-model="form.num" controls-position="right" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'车位编号由两段构成，即XX001-XX00n,第一段XX为:'" :label-width="'370px'">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'第二段的数字位的位数为:'" :label-width="'200px'">
                <el-input-number v-model="form.num" controls-position="right" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'第二段的数字的起始数为:'" :label-width="'200px'">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
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
      activeNames: ["1"],
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