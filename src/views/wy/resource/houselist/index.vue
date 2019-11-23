<template>
  <div class="app-list">
    <Tree
      class="list-tree"
      @handler-node="handlerTree"
    />
    <div class="list-container">
      <div>
        <tabs-bar @addUnit="handlerTabs" />
      </div>
      <list
        :id="treeId"
        ref="list"
        :pr-id="floorId"
      />
    </div>
  </div>
</template>

<script>
import { Tree, TabsBar, List } from './components'

export default {
  components: {
    Tree,
    TabsBar,
    List
  },
  data() {
    return {
      treeId: null, // null
      floorId: null
    }
  },
  methods: {
    handlerTree(id) {
      this.treeId = id
    },
    handlerTabs(prId) {
      this.$refs.list.addUnit(prId)
      this.floorId = prId
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
