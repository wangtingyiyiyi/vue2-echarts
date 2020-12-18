import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Badge,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Aside,
  Menu,
  MenuItem,
  Main,
  Tabs,
  TabPane,
  ButtonGroup,
  Input,
  Form,
  FormItem,
  Message,
  Select,
  Option,
  Table,
  TableColumn,
  Loading,
  Dialog,
  Checkbox,
  Tree,
  OptionGroup,
  MessageBox,
  Pagination,
  Radio,
  RadioGroup,
  RadioButton,
  CheckboxGroup,
  Cascader,
  Tag,
  Backtop,
  Icon,
  Divider,
  Tooltip,
  InputNumber
} from 'element-ui'

const components = [
  Button,
  Container,
  Header,
  Badge,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Aside,
  Menu,
  MenuItem,
  Main,
  Tabs,
  TabPane,
  ButtonGroup,
  Input,
  Form,
  FormItem,
  Select,
  Option,
  Table,
  TableColumn,
  Loading,
  Dialog,
  Checkbox,
  Tree,
  OptionGroup,
  Pagination,
  Radio,
  RadioGroup,
  RadioButton,
  CheckboxGroup,
  Cascader,
  Tag,
  Backtop,
  Icon,
  Divider,
  Tooltip,
  InputNumber
]

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$msgbox = MessageBox
const install = function (Vue) {
  components.map(component => {
    Vue.use(component)
  })
}
export default install
