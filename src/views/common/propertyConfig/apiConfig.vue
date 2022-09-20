<template>
  <div>
    <el-collapse v-model="activeName" accordion style="height: calc(100vh - 200px); overflow: auto" @change="changeCollapse">
      <el-collapse-item title="通用设置">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formListUrl"
            :form-data="domainName"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item title="GET请求 ">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formListGet"
            :form-data="get"
          >
            <template v-slot:dataJson>
              <jsonData @jsonDataAction="jsonDataAction('GET请求')" />
            </template>
          </dialog-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="POST请求 ">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formListGet"
            :form-data="post"
          >
            <template v-slot:dataJson>
              <jsonData @jsonDataAction="jsonDataAction('POST请求')" />
            </template>
          </dialog-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="PATCH请求 ">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formListGet"
            :form-data="patch"
          > <template v-slot:dataJson>
            <jsonData @jsonDataAction="jsonDataAction('PATCH请求')" />
          </template>
          </dialog-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="DELETE请求 ">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formListGet"
            :form-data="deleteData"
          > <template v-slot:dataJson>
            <jsonData @jsonDataAction="jsonDataAction('DELETE请求')" />
          </template>
          </dialog-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 10px; text-align: center">
      <el-button type="primary" @click="addAPI">新增API</el-button>
      <el-button type="primary" @click="apicode">生成api代码</el-button>
    </div>
    <dialogJson :is-show-dialog.sync="dialogVisible" :title="titleName" :form-info="jsonData" :is-create-data="isCreateData" @updata="updata" />
    <el-dialog
      title="API代码"
      :visible.sync="dialogVisibleCode"
      width="50%"
      append-to-body
    >
      <editor v-model="content" lang="html" theme="chrome" width="100%" height="calc(100vh - 200px)" @init="editorInit" />
      <div style="margin-top: 10px; text-align: center">
        <el-button type="primary" @click="onCopy">复制代码</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import jsonData from '@/views/common/propertyConfig/jsonData'
import dialogJson from '@/views/common/propertyConfig/dialogJson'
import editorMixin from '../mixins/editorCode'

export default {
  name: 'ApiConfig',
  components: {
    jsonData,
    dialogJson
  },
  mixins: [
    editorMixin
  ],
  data() {
    return {
      dialogVisibleCode: false,
      content: '',
      dialogVisible: false,
      isCreateData: false,
      activeName: '1',
      formData: {},
      indexData: 1,
      jsonDataStr: '',
      jsonData: {},
      radioRule: false,
      titleName: ''
    }
  },
  computed: {
    domainName() {
      const domainName = this.$store.state.tableConfig.addConfig.apiConfig.domainName
      return domainName
    },
    formListUrl() {
      return [
        { title: '设置域名', key: 'url', type: 'input' },
        { title: '设置API', key: 'api', type: 'input', change: this.onChange },
        { title: '接口名', key: 'name', type: 'input', change: this.onChange },
        { title: '总数', key: 'count', type: 'input', change: this.onChange },
        { title: '数据', key: 'data', type: 'input', change: this.onChange },
        { title: '错误信息', key: 'error_msg', type: 'input', change: this.onChange },
        { title: '是否成功', key: 'error_no', type: 'input', change: this.onChange },
        { title: '返回数据', key: 'res', disabled: true, type: 'textarea' }
      ]
    },
    get() {
      const get = this.$store.state.tableConfig.addConfig.apiConfig.get
      return get
    },
    post() {
      const post = this.$store.state.tableConfig.addConfig.apiConfig.post
      return post
    },
    patch() {
      const patch = this.$store.state.tableConfig.addConfig.apiConfig.patch
      return patch
    },
    deleteData() {
      const deleteApi = this.$store.state.tableConfig.addConfig.apiConfig.delete
      return deleteApi
    },
    formListGet() {
      return [
        { title: '设置API', key: 'api', type: 'input' },
        { title: '接口名', key: 'name', type: 'input' },
        { title: 'ID', key: 'id', type: 'input' },
        { title: '传参数据', key: 'dataJson', type: 'slotFormItem' }
      ]
    }
  },
  methods: {
    onCopy() {
      this.$copyText(this.content).then(
        res => {
          this.$message.success('已成功复制，可在相同类型中粘贴')
        },
        // eslint-disable-next-line handle-callback-err
        err => {
          this.$message.error('复制失败')
        })
    },
    jsonDataAction(data) {
      console.log(111, data)
      this.dialogVisible = true
      this.titleName = data
      // this.$store.commit('tableConfig/set_formOptions', this.$store.state.tableConfig.addConfig.SearchForm.computed.formOptions.length + 1)
    },
    addAPI() {
      // this.$store.commit('tableConfig/set_formOptions', this.$store.state.tableConfig.addConfig.SearchForm.computed.formOptions.length + 1)
    },
    apicode() {
      const config = this.$store.state.tableConfig.addConfig.apiConfig
      this.content = `export const ${config['domainName'].name} = {
      `
      Object.keys(config).forEach((item) => {
        if (item !== 'domainName') {
          if (item === 'delete' || item === 'patch') {
            this.content += `
          ${item}${config[item].name}Api(params,id) {
            return request.${item}(\`\${${config['domainName'].apiUrl}}${config[item].api}\`, params,id)
          },
          `
          } else {
            this.content += `
          ${item}${config[item].name}Api(params) {
            return request.${item}(\`\${${config['domainName'].apiUrl}}${config[item].api}\`, params)
          },
          `
          }
          // eslint-disable-next-line no-undef
        }
      })
      this.content += `
      }`

      this.dialogVisibleCode = true
    },
    updata() {

    },
    onChange() {
      this.$store.commit('tableConfig/set_apiConfig')
    },
    changeCollapse() {

    }

  }
}
</script>
