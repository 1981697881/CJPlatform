<template>
  <div >
    <el-form  label-width="100px" :size="'mini'">
      <el-row :gutter="20" type="flex"  justify="center">
        <el-col :span="12" >
          <el-form-item :label="'账号'">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"  type="flex"  justify="center">
        <el-col :span="12">
          <el-form-item :label="'原密码'">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex"  justify="center">
        <el-col :span="12">
          <el-form-item :label="'新密码'">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button @click.native="visible= false">取 消</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
    export default {

    }
</script>

<style scoped>

</style>
