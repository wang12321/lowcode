// const prettier = require('prettier') // 处理文件格式
// import prettier from 'prettier'

export const generateCode = function(formJson) {
  return `<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <div>
          ${searchForm(formJson.SearchForm.computed.formOptions)}
        </div>
      </el-header>
      <el-main>
        <TableComponent
          :table-data="tableData"
          :table-column="tableColumn"
          :options="options"
          :operates="operates"
        />
        <Pagination :key="pageKey" :total="total" :page-data="pageData" @reloadData="reloadData" />
      </el-main>
    </el-container>
    <el-dialog :visible.sync="isShowDialogNode" :title="isCreateData?'添加':'编辑'" width="50%">
      <dialog-form
        :form-list="formList"
        :form-data="formData"
        :rules="rules"
        @submit="submitSave"
        @CANCEL="CANCEL"
      />
    </el-dialog>
  </div>
</template>

<script>
  import { REQUIRED } from '@/utils/Reg/validate'
  export default {
    name: 'GuaranteedConfig',
    meta: {
      title: '增删改查模板',
      icon: 'form',
      sortIndex: 4
    },
    data() {
      return {
        searchData:{},
        ${rules(formJson.DialogForm.data.rules)},
        formData: {},
        isCreateData: true,
        isShowDialogNode: false,
        pageKey: 0, // 刷新分页组件key
        total: 0,
        ${tableComponentData(formJson.TableComponent.data)}
      }
    },
    computed: {
      ${formList(formJson.DialogForm.computed.formList)},
      ${formOptions(formJson.SearchForm.computed.formOptions)},
      pageData() {
        return { total: this.total, page: 1, rows: 20 }
      },
    },
    mounted() {
      this.updata()
    },
    methods: {
      CANCEL() {
        this.isShowDialogNode = false
      },
      buttonAction() {
        this.formData = {}
        this.isCreateData = true
        this.isShowDialogNode = true
      },
      submitSave() {

      },
      // 数据请求
      updata() {

      },
      // 查询
      submit() {
        this.pageData.page = 1
        this.pageKey += 1
        this.updata()
      },
      // 分页
      reloadData() {
        this.updata()
      }

    }
  }
</script>`
}

//  table递归
const tableComponentData = function(data) {
  return `operates: ${operates(data.operates)}
        tableColumn: ${tableColumn(data.tableColumn)}
        tableData:[],
        options: ${JSON.stringify(data.options)}`
}

// operates
const operates = function(data) {
  return `{
           isButton:${data.isButton},
           width:'${data.width}',
           label:'${data.label}',
           align:'${data.align}',
           list: [
            ${list(data.list)}
           ]
        },`
  function list(listdata) {
    let listStr = ``
    listdata.forEach(item => {
      listStr += `{
               label:'${item.label}',
               show:${item.show},
               btnType:'${item.btnType}',
               method:(index, row) => {
                  this.formData = { ...row }
                  this.isCreateData = false
                  this.isShowDialogNode = true
               }
            },`
    })
    return listStr
  }
}
// tableColumn
const tableColumn = function(data) {
  let tableColumnStr = ``
  data.forEach(item => {
    if (item.width) {
      tableColumnStr += `{
              label: '${item.label}',
              showOverflowTooltip: ${item.showOverflowTooltip},
              prop: '${item.prop}',
              align: '${item.align}',
              width: '${item.width}'
            },`
    } else {
      tableColumnStr += `{
              label: '${item.label}',
              showOverflowTooltip: ${item.showOverflowTooltip},
              prop: '${item.prop}',
              align: '${item.align}'
            },`
    }
  })
  return `[${tableColumnStr}
          ],`
}

const rules = function(data) {
  let rulestr = ``
  Object.keys(data).forEach(item => {
    rulestr += `
          '${item}':[REQUIRED('${data[item][0].message}')],`
  })
  return `rules:{${rulestr}
        }`
}

const formList = function(data) {
  let formListstr = ``
  data.forEach(item => {
    if (item.type === 'select') {
      formListstr += `
          { title: '${item.title}', key: '${item.key}', type: '${item.type}', clearable: ${item.clearable}, options: ${item.options}, label: '${item.label}', value: '${item.value}'`
    } else {
      formListstr += `
          { title: '${item.title}', key: '${item.key}', type: '${item.type}', clearable: ${item.clearable}`
    }
    if (item.disabled) {
      formListstr += `,disabled: ${item.disabled}`
    }
    formListstr += `},`
  })

  return `formList() {
        return [${formListstr}
        ]
      }`
}

const formOptions = function(data) {
  let formOptionsstr = ``
  data.forEach(item => {
    if (item.type === 'select') {
      formOptionsstr += `
          { titleShow: ${item.titleShow}, title: '${item.title}', key: '${item.key}', type: '${item.type}', clearable: ${item.clearable}, options: ${JSON.stringify(item.options)}, label: '${item.label}', value: '${item.value}'`
    } else {
      formOptionsstr += `
          { titleShow: ${item.titleShow}, title: '${item.title}', key: '${item.key}', type: '${item.type}', clearable: ${item.clearable}`
    }
    formOptionsstr += `},`
  })

  return `formOptions() {
        return [${formOptionsstr}
        ]
      }`
}

const searchForm = function(data) {
  let searchFormStr = `<search-form
            :form-options="formOptions"
            :form-data="searchData"`
  if (data && data.length > 0) {
    searchFormStr += `
             @submit="submit"
  `
  }
  searchFormStr += `>
            <template v-slot:button>
              <el-button type="primary" @click="buttonAction">新增</el-button>
            </template>
            </search-form>`
  return searchFormStr
}

