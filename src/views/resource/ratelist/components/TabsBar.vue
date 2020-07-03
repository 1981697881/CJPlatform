<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'客户名称'">
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
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportOrder">导出</el-button>
        </el-button-group>
        <!--<el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleTab(node)">价格同步</el-button>
        </el-col>-->
      </el-row>
    </el-form>
  </div>
</template>

<script>
// ---------------------------
import { mapGetters } from "vuex";
import {getPlas} from "@/api/system/users";
import {exportRateData} from "@/api/resource/rate";
export default {
  data() {
    return {
      search: {
        keyword: null
      },
      flag: true,
      plaIdS: null,
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
            this.$emit('showTable', { query: this.search.keyword ,plaId: this.plaIdS})
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
      this.$emit('showTable', {plaId: val,query: this.search.keyword })
    },
    fetchFormat() {
      getPlas().then(res => {
        if(res.flag){
          console.log(res)
          this.plaArray = res.data;
          this.plaIdS = res.data[0].plaId;
          this.$emit('showTable', {plaId: res.data[0].plaId})
        }
      });
    },
    handleTab(node){
     /*   this.$emit('showDialog')*/
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
      exportRateData(this.plaIdS).then(res => {
        this.download(res)
      })
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null || this.search.keyword != undefined ? obj.query = this.search.keyword : null
      this.plaIdS != null || this.plaIdS != undefined ? obj.plaId = this.plaIdS : null
      return obj
    },
    // 关键字查询
    query(){
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.keyword = ''
      this.$emit('showTable', {plaId: this.plaIdS})
    }
  }
};
</script>

<style>
</style>
