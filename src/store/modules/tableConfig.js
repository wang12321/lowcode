const getDefaultState = () => {
  return {
    tableColumn: [
      {
        label: '第一列',
        showOverflowTooltip: true,
        prop: 'one',
        align: 'center',
        width: '100px'
      },
      {
        label: '第二列',
        showOverflowTooltip: true,
        prop: 'tow',
        align: 'center'
      },
      {
        label: '第三列',
        showOverflowTooltip: true,
        prop: 'three',
        align: 'left'
      }
    ]
  }
}

const state = getDefaultState()

const mutations = {
  set_tableColumn: (state, tableColumn) => {
    state.token = tableColumn
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

