<template>
  <div style="padding: 0 20px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Table属性配置" name="Table">
        <collapseProperty />
      </el-tab-pane>
      <el-tab-pane label="Form属性配置" name="Form">
        <collapseProperty />
      </el-tab-pane>
      <el-tab-pane label="Page属性配置" name="Page">
        <collapseProperty />
      </el-tab-pane>
      <el-tab-pane label="API配置" name="second">API配置</el-tab-pane>
      <el-tab-pane label="生成代码" name="three">生成代码</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import collapseProperty from './collapseProperty'
export default {
  name: 'Index',
  components: {
    collapseProperty
  },
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>
