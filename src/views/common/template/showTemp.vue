<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <search-form
          v-if="formOptions.length === 0"
          :key="tableComponentKey"
          :form-options="formOptions"
          :form-data="searchData"
        >
          <template v-slot:button>
            <el-button type="primary" @click="buttonAction">新增</el-button>
          </template>
        </search-form>
        <search-form
          v-else
          :key="tableComponentKey"
          :form-options="formOptions"
          :form-data="searchData"
          @submit="submit"
        >
          <template v-slot:button>
            <el-button type="primary" @click="buttonAction">新增</el-button>
          </template>
        </search-form>
      </el-header>
      <el-main>
        <TableComponent
          :key="tableComponentKey"
          :table-data="tableData"
          :table-column="collapseList"
          :options="tableConfig.data.options"
          :operates="operates"
        />
        <Pagination :key="pageKey" :page-data="pageData" @reloadData="reloadData" />
      </el-main>
    </el-container>
    <el-dialog :visible.sync="isShowDialogNode" :title="isCreateData?'添加配置':'编辑配置'" width="50%">
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

<!--<component-->
<!--  v-for="item in componentData"-->
<!--  :key="item.id"-->
<!--  :is="item.component"-->
<!--  :style="item.style"-->
<!--  :propValue="item.propValue"-->
<!--/>-->
<script>
import request from '@/services/request'

export default {
  name: 'ShowTemp',
  data() {
    return {
      tableComponentKey: 1,
      total: 0,
      pageKey: 0,
      tableData: [{}],
      searchData: {},
      isShowDialogNode: false,
      isCreateData: true,
      formData: {},
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
      }
    }
  },
  computed: {
    rules() {
      const formLists = this.$store.state.tableConfig.addConfig.DialogForm.data.rules
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return formLists
    },
    formList() {
      const formLists = this.$store.state.tableConfig.addConfig.DialogForm.computed.formList
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return formLists
    },
    formOptions() {
      const formOptions = this.$store.state.tableConfig.addConfig.SearchForm.computed.formOptions
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return formOptions
    },
    pageData() {
      return { total: this.total, page: 1, rows: 20 }
    },
    collapseList() {
      const tableList = this.$store.state.tableConfig.addConfig.TableComponent.data.tableColumn
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.tableComponentKey += 1
      return tableList
    },
    dataProps() {
      return this.$store.state.tableConfig.addConfig
    },
    tableConfig() {
      return this.dataProps.TableComponent
    },
    apiConfig() {
      const apiConfig = this.$store.state.tableConfig.addConfig.apiConfig
      return apiConfig
    }
  },
  mounted() {
    this.$store.commit('tableConfig/set_saveConfig')
  },
  methods: {
    submit() {
      const domainName = this.apiConfig.domainName
      request.get(`${this.apiConfig.domainName.url}${this.apiConfig.get.api}`, this.apiConfig.get.data).then((res) => {
        console.log(1111, res, domainName)
        if (Number(res[domainName.error_no]) !== 0) {
          this.$message({
            message: res.error_msg || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          this.tableData = res[domainName.data]
          this.total = res[domainName.count]
        }
      })
    },
    buttonAction() {
      this.formData = {}
      this.isCreateData = true
      this.isShowDialogNode = true
    },
    reloadData() {

    },
    submitSave() {

    },
    CANCEL() {

    }
  }
}
</script>

