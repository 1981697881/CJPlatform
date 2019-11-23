<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="border-gray">
          <el-table :data="form.div">
            <el-table-column>
              <div slot="header" style="width: 100%;">
                <el-button-group>
                  <el-button :size="'mini'">设置</el-button>
                  <el-button :size="'mini'">修改</el-button>
                  <el-button :size="'mini'">删除</el-button>
                </el-button-group>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="border-gray">
          <el-table :data="form.div">
            <el-table-column>
              <div slot="header" style="width: 100%;">
                <span>相关附件</span>
                <el-button-group style="float:right">
                  <el-button :size="'mini'">将单据存为附件</el-button>
                  <el-button :size="'mini'">添加</el-button>
                  <el-button :size="'mini'">查看</el-button>
                  <el-button :size="'mini'">删除</el-button>
                  <el-button :size="'mini'">设置类别</el-button>
                  <el-button :size="'mini'">另存</el-button>
                  <el-button :size="'mini'">生成合同PDF文件</el-button>
                </el-button-group>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="border-gray">
          <el-table :data="form.div">
            <el-table-column>
              <div slot="header" style="width: 100%;">
                <span>审核记录</span>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        div: []
      }
    };
  }
};
</script>

<style scoped>
</style>
