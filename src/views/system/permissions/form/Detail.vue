<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'rid'">
            <el-input v-model="form.rid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'角色名称'" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'用户权限'" prop="roleLevel">
            <el-select v-model="form.roleLevel" class="width-full" placeholder="请选择用户权限">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import {saveRoles,updateRoles,getRoles} from "@/api/system/permissions";

export default {
  props: {
      rid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
          rid: null,
          roleName: null, // 名称
          roleLevel:null,
      },
        rules: {
            roleName: [
                {required: true, message: '请输入名稱', trigger: 'blur'},
            ],
            roleLevel: [
                {required: true, message: '请选择等级', trigger: 'change'},
            ],

        },
      levelFormat: [['1','一级'],['2','二级']]
    };
  },
  created() {
      this.form.rid=this.rid
  },
  mounted() {
    if (this.form.rid) {
      this.fetchData(this.form.rid);
    }
  },
  methods: {
    saveData(form) {
        this.$refs[form].validate((valid) => {
            //判断必填项
            if (valid) {
                if (typeof (this.form.rid) != undefined && this.form.rid != null) {
                    updateRoles(this.form).then(res => {
                        this.$emit('hideDialog', false)
                        this.$emit('uploadList')
                    });
                }else{
                    saveRoles(this.form).then(res => {
                        this.$emit('hideDialog', false)
                        this.$emit('uploadList')
                    });
                }


            }else {
                return false;
            }
        })

    },
    fetchData(val) {
        getRoles(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style>
</style>
