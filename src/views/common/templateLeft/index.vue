<template>
  <div>
    <div class="col">
      <draggable v-model="templateList" :options="{group:{name: 'itxst',pull:'clone'},sort: true}" animation="300" @start="onStart" @end="onEnd">
        <transition-group>
          <div v-for="item in templateList" :key="item.id" :class="item.id==1?'item forbid':'item'">{{ item.name }}</div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      drag: false,
      // 定义要被拖拽对象的数组
      templateList: [
        { id: 1, name: '增删改查模板', type: 'temp' }
      ]
    }
  },
  methods: {
    // 开始拖拽事件
    onStart() {
      this.drag = true
    },
    // 拖拽结束事件
    onEnd() {
      this.drag = false
    }
  }
}
</script>

<style lang="scss" scoped>
/* 定义要拖拽元素的样式 */
.ghostClass {
  background-color: blue !important;
}

.chosenClass {
  background-color: red !important;
  opacity: 1 !important;
}

.dragClass {
  background-color: blueviolet !important;
  background-image: none !important;
  outline: none !important;
  box-shadow: none !important;
  opacity: 1 !important;
}

.title {
  padding: 6px 12px;
}

.col {
  flex: 1;
  float: left;
  width: 100%;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px ;
}

.col+.col {
  margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0 10px 0 10px;
  background-color: #f1f1f1;
  border: solid 1px #eee;
}

.item:hover {
  cursor: move;
  background-color: #fdfdfd;
}
</style>
