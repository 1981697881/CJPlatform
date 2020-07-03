<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="12">
        <el-col :span="4">
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
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportOrder">导出</el-button>
        </el-button-group>
       <!-- <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleTab(node)">库存同步</el-button>
        </el-col>-->
      </el-row>
    </el-form>
  </div>
</template>

<script>
// ---------------------------  新增客户没做完

import { mapGetters } from "vuex";
import {getPlas} from "@/api/system/users";
import {exportStockData} from "@/api/resource/stock";
export default {
  data() {
    return {
      search: {
        keyword: null
      },
      flag: true,
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
  created() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  },destroyed() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    handleKeyDown(e) {
      var key = window.event.keyCode ? window.event.keyCode : window.event.which
      if( key === 13 ) {
        if(this.flag) {
          if((typeof this.search.keyword != null) && (this.search.keyword !='')){
            this.$emit('showTable', { goodName: this.search.keyword ,plaId: this.plaIdS})
            this.flag = false
          }

        }
        e.preventDefault() //取消浏览器原有的ctrl+s操作
      }
    },
    handleKeyUp(e) {
      // enter
      var key = window.event.keyCode ? window.event.keyCode : window.event.which
      if( key === 13 ){
        this.flag = true
        e.preventDefault()
      }
    },
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

      fetchFormat() {
          getPlas().then(res => {
              if(res.flag){
                this.plaArray = res.data;
                this.plaIdS = res.data[0].plaId;
                this.$emit('showTable', {plaId: res.data[0].plaId})
              }
          });
      },
    // 下载文件
    download(res) {
      if (!res.data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([res.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', res.headers['content-disposition'].split('filename=')[1])
      document.body.appendChild(link)
      link.click()
    },
    exportOrder() {
      exportStockData(this.plaIdS).then(res => {
        this.download(res)
      })
    },
    upload() {
      this.search.keyword = ''
      this.$emit('showTable' ,{plaId: this.plaIdS})
    }
  }
};
</script>

<style>
</style>
