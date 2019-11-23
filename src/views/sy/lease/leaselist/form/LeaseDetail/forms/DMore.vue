<template>
  <el-form v-model="form" :size="'mini'" :label-width="'100px'">
    <div class="border-gray">
      <el-table :data="form.div">
        <el-table-column>
          <div slot="header" style="    width: 100%;">
            <span>自定义合同条款</span>
            <el-button-group style="float:right">
              <el-button :size="'mini'">查看全部</el-button>
              <el-button :size="'mini'">定义租赁合同条款</el-button>
            </el-button-group>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <div class="border-gray">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'代理行'">
            <el-select v-model="form.name" class="width-full">
              <el-option :value="'1'">中国银行</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'招商人员'">
            <el-select v-model="form.name" class="width-full">
              <el-option :value="'1'">admin</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'信息来源'">
            <el-select v-model="form.name" class="width-full">
              <el-option :value="'1'">微信</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="'经办人'">
            <el-select v-model="form.name" class="width-full">
              <el-option :value="'1'">admin</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="'代办人'">
            <el-select v-model="form.name" class="width-full">
              <el-option :value="'1'">admin</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="'证件号码'">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="'联系方式'">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'发票类型'">
            <el-select v-model="form.name" class="width-full">
              <el-option :value="'1'">admin</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'纳税识别号'">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'联系电话'">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'开户银行'">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'银行账号'">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="'注册地址'">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="12">
        <div class="border-gray">
          <el-table :data="form.div">
            <el-table-column>
              <div slot="header" style="width: 100%;">
                <span>销售类设置</span>
                <el-button-group style="float:right">
                  <el-button :size="'mini'">添加</el-button>
                  <el-button :size="'mini'">修改</el-button>
                  <el-button :size="'mini'">删除</el-button>
                </el-button-group>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="border-gray">
          <el-table :data="form.div">
            <el-table-column>
              <div slot="header" style="width: 100%;">
                <span>租金抽成设置</span>
                <el-button-group style="float:right">
                  <el-button :size="'mini'">添加</el-button>
                  <el-button :size="'mini'">修改</el-button>
                  <el-button :size="'mini'">删除</el-button>
                </el-button-group>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="border-gray">
          <el-table :data="form.div">
            <el-table-column>
              <div slot="header" style="width: 100%;">
                <span>相关其他合同</span>
                <el-button-group style="float:right">
                  <el-button :size="'mini'">添加</el-button>
                  <el-button :size="'mini'">修改</el-button>
                  <el-button :size="'mini'">删除</el-button>
                </el-button-group>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="border-gray">
          <el-table :data="form.div">
            <el-table-column>
              <div slot="header" style="width: 100%;">
                <span>租金拆分设置</span>
                <el-button-group style="float:right">
                  <el-button :size="'mini'">添加</el-button>
                  <el-button :size="'mini'">修改</el-button>
                  <el-button :size="'mini'">删除</el-button>
                </el-button-group>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        div: []
      }
    };
  }
};
</script>

<style scoped>
</style>
