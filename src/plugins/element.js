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
  MessageBox
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
  OptionGroup
]

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
const install = function (Vue) {
  components.map(component => {
    Vue.use(component)
  })
}
export default install
