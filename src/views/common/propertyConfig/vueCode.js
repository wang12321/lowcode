// const prettier = require('prettier') // 处理文件格式
// import prettier from 'prettier'
export const generateCode = function(formJson) {
  console.log(111, `${formJson.TableComponent.data}`)
  tableComponentData(formJson.TableComponent.data)

  return `
  <template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <div @click="clickHeader">
          <search-form
            :form-options="formOptions"
            :form-data="searchData"
            @submit="submit"
          >
            <template v-slot:button>
              <el-button type="primary" @click="buttonAction">新增</el-button>
            </template>
          </search-form>
        </div>

      </el-header>
      <el-main>
        <TableComponent
          :table-data="tableData"
          :table-column="tableColumn"
          :options="options"
          :operates="operates"
        />
        <Pagination :key="pageKey" :page-data="pageData" @reloadData="reloadData" />
      </el-main>
    </el-container>
    <el-dialog :visible.sync="isShowDialogNode" :title="isCreateData?'添加保底配置':'编辑保底配置'" width="50%">
      <dialog-form
        :form-list="formList"
        :form-data="formData"
        :rules="rules"
        :loading="loading"
        @submit="submitSave"
        @CANCEL="CANCEL"
      />
    </el-dialog>
  </div>
</template>

<script>
  import { REQUIRED, RULES } from '@/utils/Reg/validate'
  export default {
    name: 'GuaranteedConfig',
    meta: {
      title: '增删改查模板',
      icon: 'form',
      sortIndex: 4
    },
    data() {
      return {
        ${tableComponentData(formJson.TableComponent.data)}

      }
    }
  }
</script>`
}

//  递归
const tableComponentData = function(data) {
  console.log(data)
  return `
        operates: ${operates(data.operates)}
        tableColumn: ${tableColumn(data.tableColumn)}
        tableData:[],
        options: ${JSON.stringify(data.options)}
  `
}

// operates
const operates = function(data) {
  return `{
           isButton:${data.isButton},
           width:${data.width},
           label:${data.label},
           align:${data.align},
           list:${list(data.list)}
        },
  `
  function list(listdata) {
    let listStr = ``
    listdata.forEach(item => {
      listStr += `{
               label:${item.label},
               show:${item.show},
               btnType:${item.btnType},
               method:(index, row) => {
                  this.formData = { ...row }
                  this.isCreateData = false
                  this.isShowDialogNode = true
               }
            },
  `
    })
    return listStr
  }
}
// tableColumn
const tableColumn = function(data) {
  let tableColumnStr = ``
  data.forEach(item => {
    tableColumnStr += `{
              label: ${item.label},
              showOverflowTooltip: ${item.showOverflowTooltip},
              prop: ${item.prop},
              align: ${item.align},
              width: ${item.width}
            },`
  })
  return `[${tableColumnStr}
          ],`
}
