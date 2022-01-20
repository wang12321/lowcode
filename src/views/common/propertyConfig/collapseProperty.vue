<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="item in collapseList" :key="item.id" :title="'列'+item.id" :name="item.id">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formList"
            :form-data="item.formData"
            :rules="rules"
          />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'CollapseProperty',
  data() {
    return {
      activeName: '1'
    }
  },
  computed: {
    collapseList() {
      const tableList = this.$store.state.tableConfig.tableColumn
      tableList.forEach((item, index) => {
        item['id'] = index + 1
        item['formData'] = item
      })
      return tableList
    },
    formList() {
      return [
        { title: '显示名称', key: 'label', type: 'input', clearable: true },
        { title: '读取字段', key: 'prop', type: 'input' },
        { title: '固定宽度', key: 'width', type: 'input' },
        { title: '对齐方式', key: 'align', type: 'radio', options: [{ value: 'left', label: 'left' }, { value: 'center', label: 'center' }, { value: 'right', label: 'right' }], label: 'label', value: 'value' },
        { title: '内容过长隐藏', clearable: true, key: 'showOverflowTooltip', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' }
      ]
    }
  },
  methods: {
    CANCEL() {
    },
    submitSave() {
    }
  }
}
</script>

<style lang="scss">
.table {

  .el-col-24 {
    width: 100%;
    height: 45px;
  }
}
</style>
