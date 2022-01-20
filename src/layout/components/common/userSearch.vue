<template>
  <div>
    <div @click="userSearchAction">
      <i class="el-icon-search" />
      <span>用户搜索</span>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="80%"
      append-to-body
      :before-close="handleClose"
      class="dialog_class"
    >
      <div slot="title" class="dialog-title">
        <div style="display: inline-block;width: calc(100% - 60px)">
          <globalFilter v-model="globalFilterData" :attribute-data="attributeData" :is-and-or.sync="isAndOr" :condition-show="conditionShow" :icon-show="iconShow" />
        </div>
        <div style="display: inline-block;width: 60px">搜索</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import globalFilterMixins from '@/views/autoRouter/behaviorAnalysis/common/mixin/globalFilter'

export default {
  name: 'UserSearch',
  mixins: [globalFilterMixins],
  data() {
    return {
      dialogVisible: false
    }
  },
  mounted() {
    this.globalFilterData = [[{}]]
  },
  methods: {
    handleClose(done) {
      done()
    },
    save(item) {
      const { data, indexs, type } = item
      console.log(data, indexs, type)
    },
    userSearchAction() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog_class {

  ::v-deep .el-dialog__body {
    padding: 0
  }
}

</style>
