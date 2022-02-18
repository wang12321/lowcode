<template>
  <div style="padding: 0 20px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Table属性配置" name="Table">
        <collapseProperty />
      </el-tab-pane>
      <el-tab-pane label="searchForm属性配置" name="Form">
        <searchFormProperty />
      </el-tab-pane>
      <el-tab-pane label="dialogForm属性配置" name="dialogForm">
        <dialogFormProperty />
      </el-tab-pane>
      <el-tab-pane label="Page属性配置" name="Page">
        <pageProperty />
      </el-tab-pane>
      <el-tab-pane label="API配置" name="API">API配置</el-tab-pane>
      <el-tab-pane label="生成代码" name="Code">
        <editor v-model="content" lang="html" theme="chrome" width="500" height="calc(100vh - 150px)" @init="editorInit" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import collapseProperty from './collapseProperty'
import pageProperty from './pageProperty'
import dialogFormProperty from './dialogFormProperty'
import searchFormProperty from './searchFormProperty'

import { generateCode } from './vueCode'
export default {
  name: 'Index',
  components: {
    collapseProperty,
    pageProperty,
    dialogFormProperty,
    searchFormProperty,
    editor: require('vue2-ace-editor')
  },
  data() {
    return {
      activeName: 'Table',
      content: ''
    }
  },
  computed: {
  },
  methods: {
    editorInit: function() {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript') // snippet
    },
    handleClick(tab, event) {
      console.log(tab, event)
      this.content = generateCode(this.$store.state.tableConfig.addConfig)
    }
  }
}
</script>
