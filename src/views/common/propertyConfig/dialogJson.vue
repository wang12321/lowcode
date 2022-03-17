<template>
  <el-dialog :visible.sync="isShowDialogNode" :title="title" width="80%" append-to-body @open="resetEditForm">
    <!--    <dialog-form-->
    <!--      :label-width="'80px'"-->
    <!--      :form-list="formList"-->
    <!--      :form-data="formData"-->
    <!--      :rules="rules"-->
    <!--    />-->
    <TableComponent
      :table-data="tableData"
      :table-column="tableColumn"
      :options="options"
      :operates="operates"
      class="tableFK"
    />
    <span slot="footer" class="dialog-footer" style="text-align: center">
      <el-button @click="CANCEL">取 消</el-button>
      <el-button type="primary" @click="addData">新增</el-button>
      <el-button type="primary" @click="submitSave">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: 'AssetChange',
  props: {
    formInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isShowDialog: {
      type: Boolean,
      default: false
    },
    isCreateData: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: [{
        id: 0,
        key: '',
        value: '',
        isInt: false,
        optionsInt: [{ label: '是', value: true }, { label: '否', value: false }]
      }],
      operates: { // 按钮配置
        isButton: false,
        width: '120px',
        label: '操作',
        align: 'left',
        list: [
          {
            label: '确定删除',
            show: true,
            btnType: 'danger',
            type: 'delete',
            method: (index, row) => {
              console.log(index, row)
              this.tableData = this.tableData.filter(item => item.id !== row.id)
            }
          }
        ]
      },
      options: {
        loading: false,
        border: true
      },
      tableColumn: [
        {
          label: 'key',
          prop: 'key',
          align: 'left',
          render: (h, params) => {
            return h('div', {}, [
              h('el-input', {
                on: {
                  input: (value) => {
                    params.row.key = value
                  }
                },
                attrs: {
                  placeholder: '请输入字段名'
                },
                props: {
                  value: params.row.key,
                  clearable: true
                }
              }, '')])
          }
        },
        {
          label: 'value',
          prop: 'value',
          align: 'left',
          render: (h, params) => {
            // 下拉框内容包裹在一个div里面
            return h('div', {}, [
              h('el-input', {
                on: {
                  input: (value) => {
                    params.row.value = value
                  }
                },
                attrs: {
                  placeholder: '请输入值'
                },
                props: {
                  value: params.row.value,
                  clearable: true
                }
              }, '')])
          }
        },
        {
          label: '是否Int类型',
          prop: 'isInt',
          align: 'left',
          render: (h, params) => {
            return h('div', {}, [
              h('el-select', { // el-select实现下拉框
                on: {
                  input: (value) => {
                    params.row.isInt = value
                  }
                },
                props: {
                  value: params.row.isInt,
                  clearable: true
                }
              }, [
                // 下拉框里面填充选项，通过filters遍历map，为每一个选项赋值。
                params.row.optionsInt.map(item => {
                  return h('el-option', {
                    props: {
                      value: item.value,
                      label: item.label
                    }
                  })
                })
              ])])
          }
        }
      ],
      index: 0,
      uploadImgKey: 0,
      rules: {

      },
      formData: {},
      fileList: [],
      formLists: [
        { span: 7, title: 'key', key: 'key', type: 'input', clearable: true },
        { span: 7, title: 'value', key: 'value', type: 'input', clearable: true },
        { span: 6, title: '是否int', clearable: true, key: 'isInt', type: 'radio', options: [{ value: true, label: true }, { value: false, label: false }], label: 'label', value: 'value' },
        { span: 4, title: '删除', clearable: true, key: 'delete', type: 'checkbox', options: [{ value: '0', label: '' }], label: 'label', value: 'value' }
      ]
    }
  },
  computed: {
    loading() {
      return this.$store.state.user.btnLoading
    },
    isShowDialogNode: {
      set(val) {
        this.$emit('update:isShowDialog', val)
      },
      get() {
        return this.isShowDialog
      }
    },
    formList() {
      return this.formLists
    }
  },
  methods: {
    delAction(e) {
      console.log(this.formData)
    },
    addData() {
      this.index += 1
      this.tableData.push({
        id: this.index,
        key: '',
        value: '',
        isInt: false,
        optionsInt: [{ label: '是', value: true }, { label: '否', value: false }]
      })
    },
    CANCEL() {
      this.isShowDialogNode = false
    },
    submitSave() {

    },
    resetEditForm() {
      this.uploadImgKey += 1
      if (this.title === 'POST请求') {
        this.$store.state.tableConfig.addConfig.apiConfig.post.data.forEach(item => {

        })
      }
    }
  }
}
</script>
