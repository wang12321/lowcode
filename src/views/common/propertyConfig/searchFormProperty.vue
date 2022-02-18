<template>
  <div>
    <el-collapse v-model="activeName" accordion style="height: calc(100vh - 200px); overflow: auto">
      <el-collapse-item v-for="(item,index) in formOptionsList" :key="item.id" v-dragging="{ item: item, list: formOptionsList, group: 'item' }" :title="item.title" :name="index+1">
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
      <el-button type="primary" @click="addCol">新增一例</el-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchFormProperty',
  data() {
    return {
      activeName: '1',
      formData: {},
      type: [{ value: 'input', label: 'input' },
        { value: 'select', label: 'select' },
        { value: 'month', label: 'month' },
        { value: 'year', label: 'year' },
        { value: 'cascader', label: 'cascader' },
        { value: 'date', label: 'date' },
        { value: 'daterange', label: 'daterange' },
        { value: 'datetimerange', label: 'datetimerange' },
        { value: 'dateH', label: 'dateH' },
        { value: 'time', label: 'time' },
        { value: 'radio', label: 'radio' },
        { value: 'checkbox', label: 'checkbox' },
        { value: 'inputNumber', label: 'inputNumber' },
        { value: 'datePicker', label: 'datePicker' },
        { value: 'slot', label: 'slot' }]
    }
  },
  computed: {
    formOptionsList() {
      const formOptions = this.$store.state.tableConfig.addConfig.SearchForm.computed.formOptions
      return formOptions
    },
    /*
    * *        @param {Boolean} titleShow    选传，表单项label是否显示，为true时显示，默认false
 *       @param {String} title          必传，表单项label
 *       @param {String} key            必传，表单项model
 *        @param {String} placeholder   选传，表单项placeholder
 *       @param {String} type           必传, 表单项type:['input','select','month','year','cascader','date','daterange','datetimerange','dateH',','time','datetime','radio','checkbox','inputNumber','datePicker','slot']
 *       @param {String} options        选传，type为select,radio时有效
 *       @param {String} label          选传，type为select,radio时有效，option label
 *       @param {String} value          选传，type为select时有效，option value
 *       @param {String} width          选传，设置input宽度
 *       @param {Boolean} isAdvanced    选传，当mode为normal时有效，为true时显示在高级搜索外面，默认false
 *       @param {Boolean} hidden        选传，是否显示当前表单项，默认false
 *       @param {Function} change       选传，@change回调事件
 *       @param {String} activeText     选传，type为switch时有效
 *       @param {String} inactiveText   选传，type为switch时有效
 *       @param {String} min            选传，type为inputNumber时有效
 *       @param {String} max            选传，type为inputNumber时有效
 *       @param {Boolean} border        选传，checkbox 有效
 *       @param {Boolean} disabled      选传，disabled 默认关闭
    * */
    formList() {
      return [
        { title: '名称', key: 'title', type: 'input', clearable: true },
        { title: '是否显示名称', clearable: true, key: 'titleShow', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' },
        { title: '设置字段名', key: 'key', type: 'input' },
        { title: 'placeholder', key: 'placeholder', type: 'input' },
        { title: '类型', key: 'type', type: 'select', options: this.type, label: 'label', value: 'value' },
        { title: '固定宽度', key: 'width', type: 'input' },
        { title: 'clearable', clearable: true, key: 'clearable', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' },
        { title: 'disabled', clearable: true, key: 'disabled', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' }
      ]
    }
  },
  methods: {
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

<style lang="scss">
.table {

  .el-col-24 {
    width: 100%;
    height: 45px;
  }
}
</style>
