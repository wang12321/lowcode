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
// import { x } from '@/services/api'
// const { getBlessActivitySupportRewardGuarantee, patchBlessActivitySupportRewardGuarantee, postBlessActivitySupportRewardGuarantee } = x
export default {
  name: 'GuaranteedConfig',
  meta: {
    title: '增删改查模板',
    icon: 'form',
    sortIndex: 4
  },
  data() {
    return {
      limits: this.$store.state.user.limits,
      isCreateData: true,
      isShowDialogNode: false,
      pageKey: 0, // 刷新分页组件key
      total: 0,
      rules: {
        activity_id: [
          REQUIRED('活动ID')
        ],
        prop_id: [
          REQUIRED('道具ID')
        ],
        prop_num: [
          REQUIRED('道具数量'), { validator: RULES.number }
        ],
        level: [
          REQUIRED('道具等级'), { validator: RULES.number }
        ],
        probability: [
          REQUIRED('概率'), { validator: RULES.number }
        ]
      },
      searchData: {},
      formData: {},
      operates: {
        isButton: false,
        width: '80px',
        label: '操作',
        align: 'left',
        list: [
          {
            label: '编辑',
            show: this.$store.state.user.limits,
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
      }
    }
  },
  computed: {
    tableColumn() {
      return this.$store.state.tableConfig.tableColumn
    },
    loading() {
      return this.$store.state.user.btnLoading
    },
    pageData() {
      return { total: this.total, page: 1, rows: 20 }
    },
    formList() {
      return [
        { title: '活动名称', key: 'activity_id', type: 'select', clearable: true, options: this.activityList, label: 'name', value: 'id' },
        { title: '道具ID', key: 'prop_id', type: 'select', options: this.sceneList, label: 'name', value: 'prop_id' },
        { title: '道具数量', clearable: true, key: 'prop_num', type: 'input' },
        { title: '道具概率', clearable: true, key: 'probability', type: 'input' },
        { title: '道具等级', clearable: true, key: 'level', type: 'input' }
      ]
    },
    formOptions() {
      return [
        { title: '道具等级', clearable: true, key: 'level', type: 'input' }

      ]
    }
  },
  mounted() {
    this.updata()
  },
  methods: {
    clickHeader() {
      console.log(12311)
    },
    buttonAction() {
      this.formData = {}
      this.isCreateData = true
      this.isShowDialogNode = true
    },
    CANCEL() {
      this.isShowDialogNode = false
    },
    submitSave() {
      // let data = {
      //   game_id: Number(this.$route.params.id),
      //   'activity_id': Number(this.formData.activity_id), // 活动id
      //   'prop_id': Number(this.formData.prop_id), // 道具id
      //   'prop_num': Number(this.formData.prop_num), // 道具数量
      //   'level': Number(this.formData.level), // 道具等级
      //   'probability': Number(this.formData.probability) // 概率
      // }
      // data = Object.assign({}, { ...this.formData }, data)
      // const apiName = this.isCreateData ? postBlessActivitySupportRewardGuarantee : patchBlessActivitySupportRewardGuarantee
      // apiName(data, this.formData.id).then((res) => {
      //   this.isShowDialogNode = false
      //   if (res) {
      //     this.$message({
      //       type: 'success',
      //       message: res.error_msg
      //     })
      //     this.isCreateData ? this.submit() : this.updata()
      //   }
      // })
    },
    // 数据请求
    updata() {
      // const data = {
      //   page: this.pageData.page,
      //   size: this.pageData.rows,
      //   ...this.searchData
      // }
      // getBlessActivitySupportRewardGuarantee(data).then((res) => {
      //   if (res && res.data) {
      //     this.tableData = res.data || []
      //     this.total = res.count
      //   }
      // })
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

