import projectSelect from './projectSelect.vue'
import { projectList } from '@/services/api'
export default {
  components: {
    projectSelect
  },
  data() {
    return {
      projectOptions: [],
      projectValue: {},
      keyLabel: 'label',
      keyValue: 'value'
    }
  },
  mounted() {
  },
  methods: {

  }
}
