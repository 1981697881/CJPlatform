<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'商品名称'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
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
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-col>
        <!--<el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleTab(node)">商品同步</el-button>
        </el-col>-->
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
    ...mapGetters(["node"])
  },
  mounted() {
    this.fetchFormat();
  },
  methods:{
    handleTab(node) {
        /*this.$emit('showDialog')*/
    },
    //关键字查询
    query() {
      if ((typeof this.search.keyword != null) && (this.search.keyword !='')) {
        this.$emit('showTable', { query: this.search.keyword, plaId: this.plaIdS })
      }
    },
    selectChange(val) {
      this.$emit('showTable', {plaId: val, query: this.search.keyword })
    },
    fetchFormat() {
      getPlas().then(res => {
        if(res.flag) {
          console.log(res)
          this.$emit('showTable', {plaId: res.data[0].plaId})
          this.plaArray = res.data;
          this.plaIdS = res.data[0].plaId;
        }
      });
    },
    upload() {
      this.$emit('showTable' ,{plaId: this.plaIdS})
      this.search.keyword = ''
    }
  }
};
</script>

<style>
</style>
