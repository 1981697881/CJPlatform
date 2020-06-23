<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="''">
            <el-checkbox v-model="checked" @change="clickChange">显示禁用</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" @click="handleAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary"  @click="exportOrder">导出</el-button>
         <!-- <el-button :size="'mini'" type="primary" >用户信息同步</el-button>-->
         <!-- <el-button :size="'mini'" type="primary">禁用</el-button>
          <el-button :size="'mini'" type="primary">启用</el-button>-->
          <el-button :size="'mini'" type="primary" @click="reset">密码重置</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    // ---------------------------  新增客户没做完
    import {resetPWD, exportUsersData} from "@/api/system/users";
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
              checked: false,
              flag: true,
                search: {
                  keyword: null
                }
            };
        },
        computed: {
            ...mapGetters(["node", "clickData"])
        },
      created() {
        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keyup', this.handleKeyUp)
      },
      destroyed() {
        document.removeEventListener('keydown', this.handleKeyDown)
        document.removeEventListener('keyup', this.handleKeyUp)
      },
      methods: {
        handleKeyDown(e) {
          var key = window.event.keyCode ? window.event.keyCode : window.event.which
          if( key === 13 ) {
            if(this.flag) {
              if((typeof this.search.keyword != null) && (this.search.keyword !='')){
                this.$emit('queryBtn',{ query: this.search.keyword, showIsDel: this.checked})
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
          clickChange(val) {
            this.$emit('queryBtn', { query: this.search.keyword, showIsDel: val})
          },
            handleAdd(node) {
                this.$emit('showDialog', {uid: null})
            },
            reset() {
                if (this.clickData.uid) {
                    resetPWD({uid:this.clickData.uid}).then(res => {
                        if (res.flag) {
                            this.$emit('uploadList')
                        }
                    });
                } else {
                    this.$message({
                        message: "无选中行",
                        type: "warning"
                    });
                }
            },
        // 查询条件过滤
        qFilter() {
          let obj = {}
          this.search.keyword != null || this.search.keyword != undefined ? obj.query = this.search.keyword : null
          this.checked != null || this.checked != undefined ? obj.showIsDel = this.checked : null
          return obj
        },
          //关键字查询
          query(){
            this.$emit('queryBtn', this.qFilter())
          },
          upload() {
            this.search.keyword = ''
            this.$emit('uploadList', {showIsDel: this.checked})
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
            exportUsersData().then(res => {
              this.download(res)
            })
          },
          returnPar() {
            return {showIsDel: this.checked, query: this.search.keyword}
          },
            handleAlter() {
                if (this.clickData.uid) {
                    this.$emit('showDialog', {uid: this.clickData.uid})
                } else {
                    this.$message({
                        message: "无选中行",
                        type: "warning"
                    });
                }
            }
        }
    };
</script>

<style>
</style>
