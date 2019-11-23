<template>
  <div>
    <div class="border-gray">
      <el-table :data="form.div">
        <el-table-column>
          <div slot="header" style="width: 100%;">
            <el-button-group>
              <el-button :size="'mini'">添加</el-button>
              <el-button :size="'mini'">修改</el-button>
              <el-button :size="'mini'">删除</el-button>
            </el-button-group>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <div class="border-gray">
      <el-table :data="form.div">
        <el-table-column>
          <div slot="header" style="width: 100%;">
            <el-button-group>
              <el-button :size="'mini'">查看</el-button>
              <el-button :size="'mini'">删除转经营</el-button>
            </el-button-group>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <div class="border-gray">
      <el-table :data="form.div">
        <el-table-column>
          <div slot="header" style="width: 100%;">
            <el-button-group>
              <el-button :size="'mini'">添加</el-button>
              <el-button :size="'mini'">修改</el-button>
              <el-button :size="'mini'">删除</el-button>
            </el-button-group>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        div:[]
      }
    }
  }
};
</script>

<style scoped>
</style>
