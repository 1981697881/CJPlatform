<template>
  <div style="padding:10px;min-height: calc(100vh - 90px)">
    <el-alert :closable="false" :title="title"></el-alert>
    <router-view />
  </div>
</template>

<script>
export default {
  computed:{
    title(){
      return this.$route.meta.title
    }
  }
}
</script>

<style>

</style>