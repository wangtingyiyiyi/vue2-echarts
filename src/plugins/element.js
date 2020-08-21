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
  Option
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
  Option
]

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$message = Message
const install = function (Vue) {
  components.map(component => {
    Vue.use(component)
  })
}
export default install
