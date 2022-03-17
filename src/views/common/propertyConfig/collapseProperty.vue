<template>
  <div>
    <!--    <draggable v-model="collapseList" style="height: 400px;" filter=".forbid" group="itxst" animation="300">-->
    <!--      <transition-group>-->
    <!--        <div>-->
    <!--          <div v-for="item in collapseList" :key="item.label" class="item2" @click="clickAction(item)">-->
    <!--            {{ item.name }}-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </transition-group>-->
    <!--    </draggable>-->
    <el-collapse v-model="activeName" accordion style="height: calc(100vh - 200px); overflow: auto">
      <el-collapse-item v-for="(item,index) in collapseList" :key="item.id" v-dragging="{ item: item, list: collapseList, group: 'item' }" :title="item.label" :name="index+1">
        <template slot="title">
          {{ item.label }} <i class="el-icon-delete" style="margin-left: 10px;color: red" @click.stop="onDelete(item)" />
        </template>
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formList"
            :form-data="item"
          />
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 10px; text-align: center">
      <el-button type="primary" @click="addCol">新增</el-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseProperty',
  data() {
    return {
      activeName: '1',
      formData: {}
    }
  },
  computed: {
    collapseList() {
      const tableList = this.$store.state.tableConfig.addConfig.TableComponent.data.tableColumn
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
    onDelete(data) {
      this.$store.commit('tableConfig/set_tableColumnDel', data)
    },
    addCol() {
      this.$store.commit('tableConfig/set_tableColumn', this.$store.state.tableConfig.addConfig.TableComponent.data.tableColumn.length + 1)
    },
    clickAction() {

    },
    CANCEL() {
    },
    submitSave() {
    }
  }
}
</script>

<style lang="scss" scoped>
.table {

  .el-col-24 {
    width: 100%;
    height: 45px;
  }
}
</style>
