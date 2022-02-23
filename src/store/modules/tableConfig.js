import { REQUIRED } from '@/utils/Reg/validate'

const getDefaultState = () => {
  return {
    allConfig: [{
      id: '1',
      label: '第一列',
      prop: 'name',
      isSearch: true,
      isForm: true,
      isRule: true
    }],
    addConfig: {
      SearchForm: {
        component: 'search-form',
        data: {
          limits: '',
          searchData: {}
        },
        methods: {}, // 事件列表
        mounted: {},
        computed: {
          formOptions: [
            // { id: '1', titleShow: true, title: 'title', clearable: true, key: 'key', type: 'input', options: [], label: 'label', value: 'value', disabled: false },
            // { id: '2', titleShow: true, title: 'title2', clearable: true, key: 'key1', type: 'input', options: [], label: 'label', value: 'value', disabled: false }
          ]
        }
      },
      TableComponent: {
        component: 'TableComponent',
        data: {
          operates: {
            isButton: false,
            width: '80px',
            label: '操作',
            align: 'left',
            list: [
              {
                label: '编辑',
                show: true,
                btnType: 'danger',
                method: (index, row) => {
                  this.formData = { ...row }
                  this.isCreateData = false
                  this.isShowDialogNode = true
                }
              }
            ]
          },
          tableData: [],
          options: {
            loading: false,
            border: true
          },
          tableColumn: [
            // {
            //   id: '1',
            //   label: '第一列',
            //   showOverflowTooltip: true,
            //   prop: 'one',
            //   align: 'center',
            //   width: '100px'
            // },
            // {
            //   id: '2',
            //   label: '第二列',
            //   showOverflowTooltip: true,
            //   prop: 'tow',
            //   align: 'center'
            // },
            // {
            //   id: '3',
            //   label: '第三列',
            //   showOverflowTooltip: true,
            //   prop: 'three',
            //   align: 'left'
            // }
          ]
        },
        methods: {}, // 事件列表
        mounted: {},
        computed: {}
      },
      Pagination: {
        component: 'Pagination',
        data: {
          pageKey: 0, // 刷新分页组件key
          total: 0
        },
        methods: {}, // 事件列表
        mounted: {},
        computed: {}
      },
      DialogForm: {
        component: 'dialog-form',
        data: {
          isCreateData: true,
          isShowDialogNode: false,
          rules: {
            // one: [REQUIRED('第一列')],
            // tow: [REQUIRED('第二列')],
            // three: [REQUIRED('第三列')]
          },
          formData: {}
        },
        methods: {}, // 事件列表
        mounted: {},
        computed: {
          formList: [
            // { id: '1', title: '活动名称', key: 'activity_id', type: 'input', clearable: true, options: [], label: 'label', value: 'value' }
          ]
        }
      }

    }
  }
}

const state = getDefaultState()

const mutations = {
  // 全局配置应用，会配置表格,搜索，表单and必填数据
  set_saveConfig(state) {
    console.log('state.allConfig', state.allConfig)
    state.addConfig.TableComponent.data.tableColumn = []
    state.addConfig.SearchForm.computed.formOptions = []
    state.addConfig.DialogForm.computed.formList = []
    state.addConfig.DialogForm.data.rules = {}
    state.addConfig.TableComponent.data.tableData = []

    const obj = {}
    state.allConfig.forEach(item => {
      obj[item.prop] = ''
      state.addConfig.TableComponent.data.tableColumn.push({
        id: item.id,
        label: item.label,
        showOverflowTooltip: true,
        prop: item.prop,
        align: 'left'
      })
      // isSearch: false,
      //   isForm: true,
      //   isRule: true
      if (item.isSearch) {
        state.addConfig.SearchForm.computed.formOptions.push({
          id: item.id,
          title: item.label,
          clearable: true,
          key: item.prop,

          type: 'input',
          titleShow: true,
          options: [],
          label: 'label',
          value: 'value',
          disabled: false
        })
      }

      if (item.isForm) {
        state.addConfig.DialogForm.computed.formList.push({
          id: item.id,
          title: item.label,
          clearable: true,
          key: item.prop,
          type: 'input',
          isRule: item.isRule,
          options: [],
          label: 'label',
          value: 'value',
          disabled: false
        })
      }
      if (item.isRule) {
        state.addConfig.DialogForm.data.rules[item.prop] = [REQUIRED(`${item.label}`)]
      }
    })
    state.addConfig.TableComponent.data.tableData.push(obj)
  },
  // config数据
  set_allConfig: (state, index) => {
    state.allConfig.push({
      id: `${index}`,
      label: `新增${index}`,
      prop: `${index}`,
      placeholder: '',
      isSearch: false,
      isForm: true,
      isRule: true
    })
  },
  // table数据
  set_tableColumn: (state, index) => {
    state.addConfig.TableComponent.data.tableColumn.push({
      id: `${index}`,
      label: `第${index}列`,
      showOverflowTooltip: true,
      prop: `${index}`,
      align: 'left'
    })
  },
  // search数据
  set_formOptions: (state, index) => {
    state.addConfig.SearchForm.computed.formOptions.push({
      id: `${index}`,
      title: `title${index}`,
      clearable: true,
      key: `key${index}`,
      type: 'input',
      titleShow: true,
      options: [],
      label: 'label',
      value: 'value',
      disabled: false
    })
  },
  // DialogForm 数据
  set_DialogForm: (state, index) => {
    state.addConfig.DialogForm.computed.formList.push({
      id: `${index}`,
      title: `title${index}`,
      clearable: true,
      key: `key${index}`,
      type: 'input',
      isRule: true,
      options: [],
      label: 'label',
      value: 'value',
      disabled: false
    })
  },
  // 配置是否必填
  set_DialogFormRule: (state, data) => {
    if (data.isRule === 'false') {
      // eslint-disable-next-line no-prototype-builtins
      if (state.addConfig.DialogForm.data.rules.hasOwnProperty(`${data.key}`)) {
        delete state.addConfig.DialogForm.data.rules[data.key]
      }
    } else {
      state.addConfig.DialogForm.data.rules[data.key] = [REQUIRED(`${data.title}`)]
    }
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

