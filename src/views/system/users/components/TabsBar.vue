<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" @click="handleAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" @click="upload">刷新</el-button>
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
    import {resetPWD} from "@/api/system/users";
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                search: {
                  keyword: null
                }
            };
        },
        computed: {
            ...mapGetters(["node", "clickData"])
        },
        methods: {
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
          //关键字查询
          query(){
            if((typeof this.search.keyword != null) && (this.search.keyword !='')){
              this.$emit('queryBtn',this.search.keyword)
            }
          },
          upload() {
            this.$emit('uploadList')
            this.search.keyword = ''
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
