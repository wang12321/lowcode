<template>
  <div>
    <el-container>
      <el-aside width="200px" style="height: calc(100vh - 60px);background: #f7f7f7; ">
        <templateLeft />
      </el-aside>
      <el-main>
        <showTemp />
        <!--        <draggableMain />-->
      </el-main>
      <el-aside width="50px" style="height: calc(100vh - 60px);background: #f7f7f7; ">
        <div style="padding: 15px;padding-top: calc(50vh - 150px);color: red" @click="clickAside">
          <p>打</p>
          <p>开</p>
          <p>配</p>
          <p>置</p>
          <p><i class="el-icon-back" /></p>
        </div>
      </el-aside>
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
import showTemp from '@/views/common/template/showTemp'

// import adTemp from '@/views/common/template/adTemp'
import propertyConfig from '@/views/common/propertyConfig'

// import draggableMain from '@/views/common/draggableMain'
import templateLeft from '@/views/common/templateLeft'

export default {
  name: 'Index',
  components: {
    templateLeft,
    propertyConfig,
    showTemp
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

