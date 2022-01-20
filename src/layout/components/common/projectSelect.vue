<template>
  <el-popover
    ref="popoverPS"
    placement="bottom-start"
    width="180"
    trigger="click"
    popper-class="projectSelect"
    @show="showAction"
    @hide="hideAction"
  >
    <div>
      <el-input
        v-model="inputValue"
        placeholder="搜索项目"
        size="mini"
        prefix-icon="el-icon-search"
      />
    </div>
    <div class="tab_content">
      <ul>
        <template v-for="item in options">
          <li v-if="showFilter(item)" :key="item[keyLabel] +item[keyValue]" :class="item[keyValue] === inputData[keyValue]?'is-active':''" @click="selectAttribute(item)">
            {{ item[keyLabel] }}
          </li>
        </template>
      </ul>
    </div>
    <div slot="reference" class="attribute_popover">
      <span class="span_name">{{ inputData[keyLabel] || '暂无项目' }}<i style="position: absolute;top: 10px;right: 10px" :class="isShow?'el-icon-caret-top':'el-icon-caret-bottom'" /></span>
    </div>
  </el-popover>
</template>

<script>
import { hasOwn } from '@/utils'

export default {
  name: 'ProjectSelect',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    // tab列表
    options: {
      type: Array,
      required: true
    },
    keyValue: {
      type: String,
      default: 'value'
    },
    keyLabel: {
      type: String,
      default: 'label'
    }
  },
  data() {
    return {
      isShow: false,
      inputValue: '',
      inputData: {} // 绑定数据
    }
  },
  watch: {
    value(val) {
      if (val && hasOwn(val, this.keyValue)) {
        this.inputData = val
      } else {
        this.inputData = this.options ? this.options[0] : {}
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.value && hasOwn(this.value, this.keyValue)) {
        this.inputData = this.value
      } else {
        this.inputData = this.options.length > 0 ? this.options[0] : {}
      }
    })
  },
  methods: {
    // 输入过滤数据
    showFilter(item) {
      return item[this.keyLabel] ? item[this.keyLabel].indexOf(this.inputValue) > -1 : false
    },
    showAction() {
      this.isShow = true
    },
    hideAction() {
      this.isShow = false
    },
    // 选择属性只能为单选
    selectAttribute(item) {
      this.$emit('input', item)
      this.$emit('projectAction')
      this.$refs.popoverPS.doClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.attribute_popover:hover,
.attribute_popover:focus {

  .span_name {
    color: #fff;
    background: #000;

    i {
      color: #fff;
    }
  }
}

.attribute_popover {
  display: inline-block;
  //padding: 0 10px;
  width: 180px;
  height: 55px;
  font-size: 16px;
  font-weight: bold;
  line-height: 55px;
  color: $navbarColor;
  cursor: pointer;
  background: rgba(0,0,0,0);
  //margin: 2px;
  border-radius: 4px;
  //margin: 10px 0;
  .span_name {
    position: relative;
    display: inline-block;
    width: 180px;
    height: 35px;
    padding: 0 10px;
    line-height: 35px;
    background: rgba(0,0,0,0)
  }
}

.tab_content {
  margin-top: 10px;

  ul {
    padding: 0;
    margin: 0;

    li {
      position: relative;
      padding: 5px;
      margin: 2px 0;
      list-style-type: none;

      i {
        position: absolute;
        right: 0;
        display: none;
        color: $textColorThree;
      }
    }

    li:focus,
    li:hover {
      position: relative;
      background: $focusBackground;

      i {
        position: absolute;
        right: 0;
        z-index: 99;
        display: inline-block;
        color: $textColorThree;
      }
    }

    .is-active {
      color: #409eff;
      background: $textBackground;
    }
  }
}

</style>
