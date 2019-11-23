审核
<template>
  <el-form v-model="form" :size="'mini'" :label-width="'80px'">
    <el-row>
      <el-col :span="24">
        <el-form-item >
          <el-checkbox v-model="form.checked">审核</el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item :label="'审核人'">
          <el-input v-model="form.name"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="'审核时间'">
          <el-date-picker
              v-model="form.name"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item :label="'备注'">
          <el-input type="textarea" v-model="form.name"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data(){
    return{
      form:{
        checked:null,
        name:""
      }
    }
  }
}
</script>

<style scoped>

</style>
