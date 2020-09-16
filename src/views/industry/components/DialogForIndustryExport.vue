<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    :modal="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="10vh"
    width="800px">
    <div slot="title">行业提数</div>

    <el-form ref="form" :model="form" label-width="80px" label-position="left" size="mini">
      <el-form-item label="目标行业">
        <Select-Tree />
      </el-form-item>
      <el-form-item label="时间范围">
        <el-button-group v-model="form.range">
          <el-button
            v-for="item in RANGE_LEVEL"
            :key="item.value"
            :type="form.range === item.value ? 'primary' : ''">{{item.label}}</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="颗粒度">
        <el-button-group v-model="form.group">
          <el-button
            v-for="item in GROUP_LEVEL"
            :key="item.value"
            :type="form.group === item.value ? 'primary' : ''">{{item.label}}</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="品类展开">
        <el-checkbox-group v-model="form.cate">
          <el-checkbox
            v-for="item in CATEGORY_LEVEL"
            :key="item.value"
            :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="品类聚合">
        <el-checkbox-group v-model="form.cateGroup">
          <el-checkbox
            v-for="item in CATEGORT_GROUP"
            :key="item.value"
            :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数据指标">
        <el-checkbox-group v-model="form.index">
          <el-checkbox
            v-for="item in DATA_INDEX"
            :key="item.value"
            :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">导出</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { RANGE_LEVEL, GROUP_LEVEL, CATEGORY_LEVEL, CATEGORT_GROUP, DATA_INDEX } from '@/utils/const.js'
import SelectTree from '@/views/industry/components/SelectTree.vue'
export default {
  name: 'DialogForIndustryExport',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        range: '1',
        group: '0',
        cate: [],
        cateGroup: [],
        index: []
      },
      RANGE_LEVEL: RANGE_LEVEL,
      GROUP_LEVEL: GROUP_LEVEL,
      CATEGORY_LEVEL: CATEGORY_LEVEL,
      CATEGORT_GROUP: CATEGORT_GROUP,
      DATA_INDEX: DATA_INDEX
    }
  },
  components: {
    SelectTree
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
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
