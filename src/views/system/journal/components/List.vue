<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { journalList} from "@/api/system/permissions";
import List from "@/components/List";

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: [
        { text: "lid", name: "lid",default:false },
        { text: "操作用户", name: "username" },
        { text: "操作时间", name: "createTime" },
        { text: "操作描述", name: "explanation" },
      ]
    };
  },
  methods: {
    //监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    //监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.$emit('uploadList')
    },
    dblclick(obj) {
      this.$emit('showDialog',obj.row)
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      /*  fid: fid,
        type: type,*/
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
     this.loading = true;
      journalList(data, val).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
