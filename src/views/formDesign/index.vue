<template>
  <div class="webapp">
    <avue-form-design
      :options="options"
      @submit="handleSubmit"
    />
  </div>

</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      options: {
        column: []
      }
    }
  },
  methods: {
    handleSubmit(json) {
      console.log(json)
    },
    getFormInfo() {

    }
  }
}
</script>

<style scoped lang="scss">
.webapp {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;

  .form-designer {
    height: calc(100vh - 70px);
  }

  .form-designer .widget-config-container .el-tabs__header {
    position: relative;
  }
}
</style>
