<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'uid'" style="display: none">
            <el-input v-model="form.uid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'平台'" prop="plaIdS">
            <el-select v-model="form.plaIdS" multiple placeholder="请选择">
              <el-option
                v-for="(t,i) in plaArray"
                :key="i"
                :label="t.platformName"
                :value="t.plaId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'用户账号'" prop="username">
            <el-input v-model="form.username" :readonly="read"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系号码'">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'所属公司'">
            <el-input v-model="form.comp"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户权限'" prop="rid">
            <el-select v-model="form.rid" class="width-full" placeholder="请选择用户权限">
              <el-option :label="t.roleName" :value="t.rid" v-for="(t,i) in buildFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'是否启用'">
            <el-switch v-model="form.status"  active-value="0" inactive-value="1"></el-switch>
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
    import {getRoles, saveUsers, getUsers, updateUsers, getPlas} from "@/api/system/users";

    export default {
        props: {
            uid: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                form: {
                    comp:null,
                    tel:null,
                    uid: null,
                    username: null, // 账号
                    rid: null,
                    name: null,// 名称
                    plaIdS: [],
                    status: '0',
                },
              read: null,
                rules: {
                    username: [
                        {required: true, message: '请输入名稱', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    rid: [
                        {required: true, message: '请选择角色', trigger: 'change'},
                    ],
                    plaIdS: [
                        {required: true, message: '请选择平台', trigger: 'change'},
                    ],

                },
                buildFormat: [],
                plaArray: [],
            };
        },
        created() {

        },
        mounted() {
            this.form.uid = this.uid
            this.fetchFormat();
            if (this.form.uid) {
                this.read = true
                this.fetchData(this.form.uid);
            }
        },
        methods: {
            saveData(form) {
                this.$refs[form].validate((valid) => {
                    //判断必填项
                    if (valid) {
                        console.log(this.uid)
                        if (typeof (this.uid) != undefined && this.uid != null) {
                            updateUsers(this.form).then(res => {
                                if(res.flag){
                                    this.$emit('hideDialog', false)
                                    this.$emit('uploadList')
                                }
                            });
                        } else {
                            saveUsers(this.form).then(res => {
                                if(res.flag){
                                    this.$emit('hideDialog', false)
                                    this.$emit('uploadList')
                                }
                            });
                        }


                    } else {
                        return false;
                    }
                })

            },
            fetchFormat() {
                getRoles().then(res => {
                    console.log(res)
                    this.buildFormat = res.data;
                });
                getPlas().then(res => {
                    console.log(res)
                    this.plaArray = res.data;
                });
            },
            fetchData(val) {
                getUsers(val).then(res => {
                    this.form = res.data;
                    this.form.status = (res.data.status=="正常状态"?"0":"1");
                });
            }
        }
    };
</script>

<style>
</style>
