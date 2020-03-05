<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="7">
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
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportOrder">导出</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAudit">审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus"  @click="Receiving">收货确认</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// ---------------------------  新增客户没做完

import { mapGetters } from "vuex";
import { exportData } from "@/api/indent/returns";
export default {
  data() {
    return {
      search: {
        keyword: null
      },
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
  computed: {
    ...mapGetters(["node","clickData"])
  },
  methods:{
      Receiving() {
          if (this.clickData.reOdId) {
              this.$emit('receiving',{
                  reOdId:this.clickData.reOdId,
              })
          } else {
              this.$message({
                  message: "无选中行",
                  type: "warning"
              });
          }
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
    //关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
     /* if((typeof this.search.keyword != null) && (this.search.keyword !='')){
        this.$emit('queryBtn',{query: this.search.keyword})
      }*/
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null || this.search.keyword != undefined ? obj.query = this.search.keyword : null
      this.value[1] != null || this.value[1] != undefined ? obj.endDate = this.value[1] : null
      this.value[0] != null || this.value[0] != undefined ? obj.startDate = this.value[0] : null
      return obj
    },

    upload() {
      this.$emit('uploadList')
      this.search.keyword = ''
      this.value = ''
    },
    exportOrder() {
      exportData(this.qFilter()).then(res => {
        this.download(res)
      })
    },
      handleAudit(){
          if (this.clickData.reId) {
            if (this.clickData.isAudit == '已审核') {
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
  }
};
</script>

<style>
</style>
