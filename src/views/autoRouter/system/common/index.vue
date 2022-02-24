
<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <div>
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
        <Pagination :key="pageKey" :total="total" :page-data="pageData" @reloadData="reloadData" />
      </el-main>
    </el-container>
    <el-dialog :visible.sync="isShowDialogNode" :title="isCreateData?'添加保底配置':'编辑保底配置'" width="50%">
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
      searchData: {},
      rules: {
        '2': [REQUIRED('新增2')],
        '3': [REQUIRED('新增3')],
        'name': [REQUIRED('第一列')],
        'qwe': [REQUIRED('新增4')]
      },
      formData: {},
      isCreateData: true,
      isShowDialogNode: false,
      pageKey: 0, // 刷新分页组件key
      total: 0,

      operates: {
        isButton: false,
        width: '80px',
        label: '操作',
        align: 'left',
        list: {
          label: '编辑',
          show: true,
          btnType: 'danger',
          method: (index, row) => {
            this.formData = { ...row }
            this.isCreateData = false
            this.isShowDialogNode = true
          }
        }

      },

      tableColumn: [{
        label: '第一列',
        showOverflowTooltip: true,
        prop: 'name',
        align: 'left'
      }, {
        label: '新增2',
        showOverflowTooltip: true,
        prop: '2',
        align: 'left'
      }, {
        label: '新增3',
        showOverflowTooltip: true,
        prop: '3',
        align: 'left'
      }, {
        label: '新增4',
        showOverflowTooltip: true,
        prop: 'qwe',
        align: 'left'
      }
      ],
      tableData: [],
      options: { 'loading': false, 'border': true }

    }
  },
  computed: {
    formList() {
      return [
        { title: '第一列', key: 'name', type: 'input', clearable: true },
        { title: '新增2', key: '2', type: 'input', clearable: true },
        { title: '新增3', key: '3', type: 'input', clearable: true },
        { title: '新增4', key: 'qwe', type: 'input', clearable: true }
      ]
    },
    formOptions() {
      return [
        { titleShow: true, title: '第一列', key: 'name', type: 'input', clearable: true },
        { titleShow: true, title: '新增4', key: 'qwe', type: 'select', clearable: true, options: [{ 'label': '前端定义', 'value': '前端定义' }], label: 'label', value: 'value' }
      ]
    },
    pageData() {
      return { total: this.total, page: 1, rows: 20 }
    }
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
</script>
