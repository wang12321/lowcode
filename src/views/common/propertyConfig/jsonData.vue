<template>
  <div>
    <div>
      <el-input
        v-model="jsonDataStr"
        style="width: 80%"
        type="textarea"
        :rows="4"
        disabled
        placeholder="请输入JSON"
        @change="formatAction"
      />
      <el-button style=" float: right;width: 15%" type="primary" @click="formatAction()">配置</el-button>
      <!--                -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonData',
  data() {
    return {
      jsonDataStr: `{}`,
      dialogVisible: false
    }
  },
  methods: {
    formatAction() {
      try {
        // this.jsonData = JSON.parse(this.jsonDataStr)

        this.$emit('jsonDataAction')
        // [{ "label": "前端定义", "value": "前端定义"}]
        //  后续判断是否数组
        // this.formData['options'] = this.jsonData
        // this.$set(this.formData, 'options', this.jsonData)
      } catch (error) {
        this.$message.error(`${error}`)
      }
    }
  }
}
</script>

