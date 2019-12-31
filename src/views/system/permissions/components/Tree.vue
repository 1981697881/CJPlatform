<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="管理平台" name="first">
      <el-scrollbar>
        <el-tree
          ref="tree1"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :default-expand-all="false"
          :data="platformData"
          show-checkbox
          :default-checked-keys="Checkeds"
          node-key="menuId"
          highlight-current
          :expand-on-click-node="false"
        />
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="下单平台" name="second">
      <el-scrollbar>
        <el-tree
          ref="tree2"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :default-expand-all="false"
          :data="clientDdata"
          show-checkbox
          :default-checked-keys="Checkeds"
          node-key="menuId"
          highlight-current
          :expand-on-click-node="false"
        />
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import {getSysMenuTree, getRoleMenu} from "@/api/system/permissions";

    export default {
        data() {
            return {
                activeName: 'first',
                platformData: [],
                clientDdata: [],
                filterText: "",
                Checkeds:[],
                defaultProps: {
                    children: "children",
                    label: "text",
                    isLeaf: "leaf",
                    id: "menuId"
                }
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        created() {
            this.loadTree();
        },
        mounted() {
            //window.addEventListener("scroll", this.handleScroll);
        },
        methods: {
            getChecked() {
                let array = this.$refs.tree1.getCheckedKeys();
                array = array.concat(this.$refs.tree2.getCheckedKeys())
                return  array
            },
            handleScroll(el) {
                console.log(el);
            },
            setMeunKeys(val){
                getRoleMenu(val.rid).then(res => {
                    this.resetChecked();
                    this.Checkeds = res.data;


                });
            },
            resetChecked() {
                this.$refs.tree1.setCheckedKeys([]);
                this.$refs.tree2.setCheckedKeys([]);
            },
            loadTree() {
                getSysMenuTree().then(res => {
                    var data1 = res.data.adminTreeVoList,
                        data2 = res.data.userTreeVoList;
                    data1.forEach(item => {
                        //返回的leaf是string类型  要转为boolean才能正常加载
                        item.leaf = eval(item.leaf.toLowerCase());
                    });
                    data2.forEach(item => {
                        //返回的leaf是string类型  要转为boolean才能正常加载
                        item.leaf = eval(item.leaf.toLowerCase());
                    });
                    this.platformData = data1;
                    this.clientDdata = data2;
                });
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        }
    };
</script>

