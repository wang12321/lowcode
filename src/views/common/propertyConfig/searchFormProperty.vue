<template>
  <div>
    <el-collapse v-model="activeName" accordion style="height: calc(100vh - 200px); overflow: auto" @change="changeCollapse">
      <el-collapse-item v-for="(item,index) in formOptionsList" :key="item.id" v-dragging="{ item: item, list: formOptionsList, group: 'item' }" :title="item.title" :name="index+1">
        <template slot="title">
          {{ item.title }} <i class="el-icon-delete" style="margin-left: 10px;color: red" @click.stop="onDelete(item)" />
        </template>
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formList"
            :form-data="item"
          >
            <template v-slot:dataJson>
              <div>
                <el-input
                  v-model="jsonDataStr"
                  style="width: 80%"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入JSON"
                  @change="formatAction"
                />
                <el-button style=" float: right;width: 15%" type="primary" @click="formatAction('true')">格式化</el-button>
                <!--                -->
              </div>

            </template>

          </dialog-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 10px; text-align: center">
      <el-button type="primary" @click="addCol">新增条件</el-button>
    </div>
    <el-dialog
      title="JSON格式化"
      :visible.sync="dialogVisible"
      width="50%"
      append-to-body
    >
      <json-viewer :value="jsonData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SearchFormProperty',
  data() {
    return {
      dialogVisible: false,
      activeName: '1',
      formData: {},
      indexData: 1,
      jsonDataStr: '',
      jsonData: {},

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
        { value: 'datePicker', label: 'datePicker' }
        // { value: 'slot', label: 'slot' }
      ]
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
      const formListArr = [{ title: '名称', key: 'title', type: 'input', clearable: true },
        { title: '是否隐藏名称', clearable: true, key: 'titleShow', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' },
        { title: '设置字段名', key: 'key', type: 'input' },
        { title: 'placeholder', key: 'placeholder', type: 'input' },
        { title: '固定宽度(带px)', key: 'width', type: 'input' },
        { title: 'clearable', clearable: true, key: 'clearable', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' },
        { title: 'disabled', clearable: true, key: 'disabled', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' },
        { title: '类型', key: 'type', type: 'select', options: this.type, label: 'label', value: 'value', change: this.changeAction }
      ]
      if (Object.keys(this.formData).length > 0 && this.formData.type === 'select') {
        formListArr.push(
          { title: '类型数据', key: 'optionsType', type: 'select', clearable: true, options: [{ label: '前端定义', value: '前端定义' }, { label: '后台返回', value: '后台返回' }], label: 'label', value: 'value', change: this.optionsAction },
          { title: '类型label', key: 'label', type: 'input', clearable: true },
          { title: '类型value', key: 'value', type: 'input', clearable: true },
          { title: '数据格式', key: 'dataJson', type: 'slotFormItem' }
        )
      }

      return formListArr
    }
  },
  methods: {
    onDelete(data) {
      this.$store.commit('tableConfig/set_formOptionsDel', data)
    },
    optionsAction() {
      this.formData['options'] = []
    },
    changeCollapse(index) {
      if (Number(index) > 0) {
        this.indexData = 0
        this.formData = this.$store.state.tableConfig.addConfig.SearchForm.computed.formOptions[Number(index) - 1]
      } else {
        this.formData = {}
      }
    },
    changeAction(item) {
    },
    addCol() {
      this.$store.commit('tableConfig/set_formOptions', this.$store.state.tableConfig.addConfig.SearchForm.computed.formOptions.length + 1)
    },
    clickAction() {

    },
    CANCEL() {
    },
    submitSave() {
    },
    formatAction(data) {
      try {
        this.jsonData = JSON.parse(this.jsonDataStr)
        if (data === 'true') {
          this.dialogVisible = true
        }
        // [{ "label": "前端定义", "value": "前端定义"}]
        //  后续判断是否数组
        this.formData['options'] = this.jsonData
        // this.$set(this.formData, 'options', this.jsonData)
      } catch (error) {
        this.$message.error(`${error}`)
      }
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
