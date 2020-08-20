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
  ButtonGroup
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
  ButtonGroup
]

const install = function (Vue) {
  components.map(component => {
    Vue.use(component)
  })
}
export default install
