<template>
  <div class="list-header">
    <el-row :gutter="10" class="margin-bottom">
      <el-col :span="1">
        <el-button :size="'mini'" type="primary" @click.native="handlerTab('detail')">新增</el-button>
      </el-col>
      <el-col :span="1">
        <el-button :size="'mini'" type="primary" @click.native="handlerTab('sublet')">转租</el-button>
      </el-col>
      <el-col :span="1">
        <el-button :size="'mini'" type="primary" @click.native="handlerTab('relet')">续租</el-button>
      </el-col>
      <el-col :span="1">
        <el-button :size="'mini'" type="primary" @click.native="handlerTab('change')">变更</el-button>
      </el-col>
      <el-col :span="1">
        <el-button :size="'mini'" type="primary" @click.native="handlerTab('out')">退租</el-button>
      </el-col>
      <el-col :span="1">
        <el-button :size="'mini'" type="primary" @click.native="handlerTab('break')">违约</el-button>
      </el-col>
      <el-col :span="1">
        <el-button :size="'mini'" type="primary">刷新</el-button>
      </el-col>
    </el-row>
    <el-form v-model="search" :size="'mini'" :label-width="'80px'" class=" box-shadow">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item :label="'签约日期'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'租赁类型'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'审核状态'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'递增租金'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'来源'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'状态筛查'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'是否违约'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item :label="'快速查找'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      search:{
        name:"",
        
      }
    }
  },
  methods:{
    // 监听每个按钮要打开的对应窗口
    handlerTab(element){
      this.$emit('handlerTab',true,element)
    }
  }
}
</script>

<style scoped>

</style>
