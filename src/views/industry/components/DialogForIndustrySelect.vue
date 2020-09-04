<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    class="indusrty-select-dialog"
    width="30%">
    <div slot="title">品类搜索</div>

    <tree-transfer
      :title="title"
      :from_data='fromData'
      :to_data='toData'
      :defaultProps="{label:'label'}"
      @addBtn='add'
      @removeBtn='remove'
      :mode='mode'
      height='50vh'
      filter
      openAll
      class="tree-transfer"/>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import treeTransfer from 'el-tree-transfer' // 引入
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  components: { treeTransfer },
  data () {
    return {
      mode: 'transfer',
      title: ['品类树', '已选中品类项'],
      fromData: [
        {
          id: '1',
          pid: 0,
          label: '1',
          children: [
            {
              id: '1-1',
              pid: '1',
              label: '二级 1-1',
              disabled: true,
              children: []
            },
            {
              id: '1-2',
              pid: '1',
              label: '二级 1-2',
              children: [
                {
                  id: '1-2-1',
                  pid: '1-2',
                  children: [],
                  label: '二级 1-2-1'
                },
                {
                  id: '1-2-2',
                  pid: '1-2',
                  children: [],
                  label: '二级 1-2-2'
                }
              ]
            }
          ]
        }
      ],
      toData: []
    }
  },

  methods: {
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    onCancel () {
      this.closeDialog()
    },
    onSubmit () {
      this.closeDialog()
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode () {
      if (this.mode === 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    },
    add (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log(fromData)
      console.log(toData)
      console.log(obj)
    },
    remove (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log(fromData)
      console.log(toData)
      console.log(obj)
    }
  }
}
</script>

<style lang="stylus" scoped>
.indusrty-select-dialog >>> .el-dialog
  .el-dialog__header
    border-bottom 2px solid $color-border
  .el-dialog__footer
    text-align center
  .el-dialog__body > .tree-transfer
    .transfer-left
      border-radius 1px
    .transfer-right
      border-radius 1px
</style>
