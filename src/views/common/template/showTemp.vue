<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <search-form
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
          :table-data="tableConfig.data.tableData"
          :table-column="collapseList"
          :options="tableConfig.data.options"
          :operates="tableConfig.data.operates"
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
export default {
  name: 'ShowTemp',
  data() {
    return {
      tableComponentKey: 1,
      total: 100,
      pageKey: 0,
      searchData: {},
      isShowDialogNode: false,
      isCreateData: true,
      formData: {}
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
    }
  },
  mounted() {
    this.$store.commit('tableConfig/set_saveConfig')
  },
  methods: {
    submit() {

    },
    buttonAction() {
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

