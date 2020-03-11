<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'rid'" style="display: none">
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
          <el-form-item :label="'审核权限'" prop="roleLevel">
            <el-select v-model="form.roleLevel" class="width-full" placeholder="请选择用户权限">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'字段权限'" >
            <el-select v-model="form.pidS" multiple  placeholder="请选择">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.permissionName"
                :value="t.pid">
              </el-option>
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
import {saveRoles,updateRoles,getRoles,getPermission} from "@/api/system/permissions";

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
        pidS:[],
        pArray:[],
        rules: {
            roleName: [
                {required: true, message: '请输入名稱', trigger: 'blur'},
            ],
            roleLevel: [
                {required: true, message: '请选择等级', trigger: 'change'},
            ],

        },
      levelFormat: [[1,'是'],[0,'否']]
    };
  },
  created() {
      this.form.rid=this.rid
  },
  mounted() {
      this.fetchFormat();
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
      fetchFormat() {
          getPermission().then(res => {
              console.log(res)
              this.pArray = res.data;
          });
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
