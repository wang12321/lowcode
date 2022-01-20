<template>
  <div>
    <el-container>
      <el-aside width="300px" style="height: calc(100vh - 60px);background: #f7f7f7; ">
        <templateLeft />
      </el-aside>
      <el-main>
        <adTemp />
        <!--        <draggableMain />-->
      </el-main>
      <el-aside width="50px" style="height: calc(100vh - 60px);background: #f7f7f7; "><div @click="clickAside">>></div></el-aside>
      <el-drawer
        title=""
        :visible.sync="drawer"
        :direction="direction"
        size="50%"
        :before-close="handleClose"
      >
        <propertyConfig />

      </el-drawer>
    </el-container>
  </div>
</template>

<script>
import adTemp from '@/views/common/template/adTemp'
import propertyConfig from '@/views/common/propertyConfig'

import draggableMain from '@/views/common/draggableMain'
import templateLeft from '@/views/common/templateLeft'

export default {
  name: 'Index',
  components: {
    draggableMain,
    templateLeft,
    adTemp,
    propertyConfig
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    }
  },
  methods: {
    clickAside() {
      this.drawer = true
    },
    handleClose(done) {
      done()
    }

  }
}
</script>

