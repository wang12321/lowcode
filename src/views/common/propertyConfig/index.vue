<template>
  <div style="padding: 0 20px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全局配置" name="config">
        <configData />
      </el-tab-pane>
      <el-tab-pane label="Table属性配置" name="Table">
        <collapseProperty />
      </el-tab-pane>
      <el-tab-pane label="searchForm属性配置" name="Form">
        <searchFormProperty />
      </el-tab-pane>
      <el-tab-pane label="dialogForm属性配置" name="dialogForm">
        <dialogFormProperty />
      </el-tab-pane>
      <!--      <el-tab-pane label="Page属性配置" name="Page">-->
      <!--        <pageProperty />-->
      <!--      </el-tab-pane>-->
      <el-tab-pane label="API配置" name="API">
        <apiConfig />
      </el-tab-pane>
      <el-tab-pane label="生成代码" name="Code">
        <editor v-model="content" lang="html" theme="chrome" width="100%" height="calc(100vh - 200px)" @init="editorInit" />
        <div style="margin-top: 10px; text-align: center">
          <el-button type="primary" @click="onCopy">复制代码</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import collapseProperty from './collapseProperty'
import apiConfig from './apiConfig'
import editorMixin from '../mixins/editorCode'
// import pageProperty from './pageProperty'
import dialogFormProperty from './dialogFormProperty'
import searchFormProperty from './searchFormProperty'
import configData from './configData'

import { generateCode } from './vueCode'
export default {
  name: 'Index',
  components: {
    collapseProperty,
    configData,
    dialogFormProperty,
    searchFormProperty,
    apiConfig
  },
  mixins: [
    editorMixin
  ],
  data() {
    return {
      activeName: 'config'
    }
  },
  computed: {
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
    handleClick(tab, event) {
      if (tab.name === 'Code') {
        this.content = generateCode(this.$store.state.tableConfig.addConfig)
      } else if (tab.name === 'API') {
        this.$store.commit('tableConfig/set_JsonData', this.$store.state.tableConfig.addConfig.apiConfig.post.data)
      }
    }
  }
}
</script>
