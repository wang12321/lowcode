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
          />
        </div>
      </el-collapse-item>
      <el-collapse-item title="POST请求 ">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formListGet"
            :form-data="post"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item title="PATCH请求 ">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formListGet"
            :form-data="patch"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item title="DELECT请求 ">
        <div class="table">
          <dialog-form
            label-width="140px"
            :form-list="formListGet"
            :form-data="delect"
          />
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 10px; text-align: center">
      <!--      <el-button type="primary" @click="addCol"></el-button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiConfig',
  data() {
    return {
      dialogVisible: false,
      activeName: '1',
      formData: {},
      indexData: 1,
      jsonDataStr: '',
      jsonData: {},
      radioRule: false
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
    delect() {
      const delect = this.$store.state.tableConfig.addConfig.apiConfig.delect
      return delect
    },
    formListGet() {
      return [
        { title: '设置API', key: 'api', type: 'input' },
        { title: '传参数据', key: 'data', type: 'input' },
        { title: 'ID', key: 'id', type: 'input' }
      ]
    }
  },
  methods: {
    onChange() {
      this.$store.commit('tableConfig/set_apiConfig')
    },
    changeCollapse() {

    }

  }
}
</script>

<style lang="scss">
.table {

  .el-col-24 {
    width: 100%;
    height: 45px;
  }
}
</style>
