<template>
  <div>
    <el-collapse v-model="activeName" accordion style="height: calc(100vh - 200px); overflow: auto" @change="changeCollapse">
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
      <el-button type="primary" @click="save">应用</el-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigData',
  data() {
    return {
      activeName: '1',
      formData: {}
    }
  },
  computed: {
    collapseList() {
      const tableList = this.$store.state.tableConfig.allConfig
      return tableList
    },
    formList() {
      return [
        { title: '显示名称', key: 'label', type: 'input', clearable: true, change: this.onChange },
        { title: '读取字段', key: 'prop', type: 'input', clearable: true },
        { title: '字段类型', key: 'type', type: 'input', clearable: true },
        { title: '是否搜索配置', clearable: true, key: 'isSearch', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' },
        { title: '是否表单配置', clearable: true, key: 'isForm', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' },
        { title: '是否必填', clearable: true, key: 'isRule', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' }

      ]
    }
  },
  methods: {
    onDelete(data) {
      this.$store.commit('tableConfig/set_allConfigDel', data)
    },
    changeCollapse(index) {
      if (Number(index) > 0) {
        this.formData = this.$store.state.tableConfig.allConfig[Number(index) - 1]
      } else {
        this.formData = {}
      }
    },
    onChange() {
    },
    addCol() {
      this.$store.commit('tableConfig/set_allConfig', this.$store.state.tableConfig.allConfig.length + 1)
    },
    clickAction() {

    },
    CANCEL() {
    },
    submitSave() {
    },
    save() {
      this.$alert('该操作会初始化所有数据，如果表格，表单有修改，不建议操作此按钮', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$store.commit('tableConfig/set_saveConfig')
        }
      })
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
