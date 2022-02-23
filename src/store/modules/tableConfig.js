import { REQUIRED } from '@/utils/Reg/validate'

const getDefaultState = () => {
  return {
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
            { id: '1', titleShow: true, title: 'title', clearable: true, key: 'key', type: 'input', options: [], label: 'label', value: 'value', disabled: false },
            { id: '2', titleShow: true, title: 'title2', clearable: true, key: 'key1', type: 'input', options: [], label: 'label', value: 'value', disabled: false }
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
            {
              id: '1',
              label: '第一列',
              showOverflowTooltip: true,
              prop: 'one',
              align: 'center',
              width: '100px'
            },
            {
              id: '2',
              label: '第二列',
              showOverflowTooltip: true,
              prop: 'tow',
              align: 'center'
            },
            {
              id: '3',
              label: '第三列',
              showOverflowTooltip: true,
              prop: 'three',
              align: 'left'
            }
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
            one: [REQUIRED('第一列')],
            tow: [REQUIRED('第二列')],
            three: [REQUIRED('第三列')]
          },
          formData: {}
        },
        methods: {}, // 事件列表
        mounted: {},
        computed: {}
      }

    }
  }
}

const state = getDefaultState()

const mutations = {
  // table
  set_tableColumn: (state, index) => {
    state.addConfig.TableComponent.data.tableColumn.push({
      id: `${index}`,
      label: `第${index}列`,
      showOverflowTooltip: true,
      prop: `${index}`,
      align: 'left'
    })
  },
  // search
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

