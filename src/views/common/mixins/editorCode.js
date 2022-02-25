
export default {
  components: {
    editor: require('vue2-ace-editor')
  },
  data() {
    return {
      content: ''
    }
  },
  mounted() {
  },
  methods: {
    editorInit: function() {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript') // snippet
    }
  }
}
