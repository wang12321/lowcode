<template>
  <div>
    <!--使用draggable组件-->
    <div class="itxst">
      <div class="col">
        <draggable v-model="dragList" style="height: 400px;" filter=".forbid" group="itxst" animation="300" :move="onMove" @end="onEnd">
          <transition-group>
            <div>
              <div v-for="item in dragList" :key="item.id" :class="item.id === -1?'item1 forbid':(item.id === action?'item2 action':'item2')" @click="clickAction(item)">
                {{ item.name }}
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      action: '',
      drag: true,
      dragList: [
        { id: -1, name: '' }
      ]
    }
  },
  methods: {
    clickAction(item) {
      this.action = item.id
    },
    // move回调方法
    onMove(e, originalEvent) {
      return false
    },
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
<style scoped>
.action {
  border: #409eff solid 1px !important;
}

.itxst {
  margin: 10px;
  text-align: left;
}

.col {
  flex: 1;
  float: left;
  width: 100%;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
}

.col + .col {
  margin-left: 10px;
}

.item1 {
  padding: 6px 12px;
  margin: 0 10px 0 10px;
  border: solid 0 #eee;
}

.item2 {
  padding: 6px 12px;
  margin: 0 10px 0 10px;
  text-align: left;

  /* background-color: pink; */
  border: solid 1px #eee;
}

.item2 + .item2 {
  margin-top: 6px;
  border-top: none;
}

.item2:hover {
  cursor: move;
  outline: solid 1px #ddd;
}
</style>
