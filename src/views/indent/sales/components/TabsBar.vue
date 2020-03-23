<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'">
      <el-row :gutter="10">
        <el-col :span="6.5">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'关键字'">
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
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAudit">审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="Delivery">发货确认</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { exportData } from "@/api/indent/sales";
import {getPlas} from "@/api/system/users";
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      search: {
        keyword: null
      },
      plaIdS:null,
      plaArray: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value: ''
    };
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
          this.$emit('queryBtn', this.qFilter())
          this.flag = false
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
    getPlaId() {
      return {plaId: this.plaIdS}
    },
    Delivery() {
      if (this.clickData.oid) {
        this.$emit('theDelivery',{
          oid:this.clickData.oid,
        })
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    selectChange(val) {
      this.$emit('queryBtn', {plaId: val, query: this.search.keyword })
    },
    // 下载文件
    download(res) {
      if (!res.data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([res.data]))
      console.log(url)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', res.headers['content-disposition'].split('filename=')[1])
      document.body.appendChild(link)
      link.click()
    },
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null || this.search.keyword != undefined ? obj.query = this.search.keyword : null
      this.value[1] != null || this.value[1] != undefined ? obj.endDate = this.value[1] : null
      this.value[0] != null || this.value[0] != undefined ? obj.startDate = this.value[0] : null
      obj.plaId = this.plaIdS
      return obj
    },
    upload() {
      this.$emit('uploadList', {plaId: this.plaIdS})
      this.search.keyword = ''
      this.value = ''
    },
    exportOrder() {
      exportData(this.qFilter()).then(res => {
        this.download(res)
      })
    },
    handleAudit() {
      if (this.clickData.oid) {
        if (this.clickData.auditStatus == '已审核' || this.clickData.auditStatus == '已驳回') {
          this.clickData.isAdd = false
          this.$emit('showDialog',this.clickData)
        }else{
          this.$emit('showDialog',this.clickData)
        }
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    fetchFormat() {
      getPlas().then(res => {
        if(res.flag) {
          this.$emit('uploadList', {plaId: res.data[0].plaId})
          this.plaArray = res.data;
          this.plaIdS = res.data[0].plaId;
        }
      });
    }
  }
};
</script>

<style>
</style>
