<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    class="indusrty-select-dialog"
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="10vh"
    width="700px">
    <div slot="title">品类搜索</div>

    <tree-transfer
      :title="title"
      :from_data='cateTree'
      :to_data='toData'
      :defaultProps="{label:'label'}"
      @addBtn='add'
      @removeBtn='remove'
      :mode='mode'
      height='50vh'
      filter
      openAll
      class="tree-transfer"/>

    <el-form inline class="m-t-24" :model="form">
      <el-form-item label="自定义标签名称" prop="category" :rules="{ required: true, message: '请输入自定义品类标签名'}">
        <el-input placeholder="保存选中对比品类标签" v-model="form.category" style="width: 215px"/>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCategoryTree } from '@/api/industry'
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
      cateTree: [],
      form: {},
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
    },
    async getCategoryTree () {
      const res = await getCategoryTree()
      if (res.code === 200) {
        this.cateTree = res.result.children
        this.cateTree.forEach(level1 => {
          level1.pid = parseInt(level1.remark) - 1
          if (level1.children) {
            level1.children.forEach(level2 => {
              level2.pid = parseInt(level2.remark) - 1
              if (level2.children) {
                level2.children.forEach(level3 => {
                  level3.pid = parseInt(level3.remark) - 1
                })
              }
            })
          }
        })
      }
    }
  },
  mounted () {
    // this.getCategoryTree()
  }
}
</script>

<style lang="stylus" scoped>
.indusrty-select-dialog >>>
  .el-dialog
    margin-top 0px
    margin-bottom 50px
    margin-left calc((100vw - 1100px) / 2) // 屏幕宽度 - （抽屉宽度 + 弹出框宽度 ）的一半
  .el-dialog__header
    border-bottom 2px solid $color-border
  .el-dialog__footer
    text-align center
  .el-dialog__body > .tree-transfer
    .transfer-left
      border-radius 1px
      width 46%
    .transfer-right
      border-radius 1px
      width 46%
</style>
