<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="12">
        <!--<el-col :span="4">
          <el-form-item :label="'商品名称'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" @click="query" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'平台'" prop="plaIdS">
            <el-select v-model="plaIdS"  placeholder="请选择" @change="selectChange">
              <el-option
                v-for="(t,i) in plaArray"
                :key="i"
                :label="t.platformName"
                :value="t.plaId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="2" style="float:right;">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-col>
        <el-col :span="2" style="float:right;">
          <el-button :size="'mini'" type="success" icon="el-icon-success" @click="forbidden">启用</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// ---------------------------  新增客户没做完

import { mapGetters } from "vuex";
import {getPlas} from "@/api/system/users";
export default {
  data() {
    return {
      search: {
        keyword: null
      },
        plaIdS:null,
        plaArray: [],
    };
  },
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
    mounted() {
        //this.fetchFormat();
    },
  methods:{
      selectChange(val) {
          this.$emit('showTable', {plaId: val, goodName: this.search.keyword})
      },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null || this.search.keyword != undefined ? obj.goodName = this.search.keyword : null
      this.plaIdS != null || this.plaIdS != undefined ? obj.plaId = this.plaIdS : null
      return obj
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    handleTab(node){
        /*this.$emit('showDialog')*/
    },
    forbidden() {
      //alterWarehouse
      this.$emit('selection')
    },
    fetchFormat() {
      getPlas().then(res => {
        if(res.flag) {
          this.plaArray = res.data;
          this.plaIdS = res.data[0].plaId;
          this.$emit('showTable', {plaId: res.data[0].plaId})
        }
      });
    },
    upload() {
      this.search.keyword = ''
      this.$emit('uploadList')
    }
  }
};
</script>

<style>
</style>
