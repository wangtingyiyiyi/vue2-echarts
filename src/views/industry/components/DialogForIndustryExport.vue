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
      {{form}}
      <el-form-item label="目标行业">
        <Select-Tree />
      </el-form-item>
      <el-form-item label="时间范围">
        <el-button-group v-model="form.range">
          <el-button
            v-for="item in RANGE_LEVEL"
            :key="item.value"
            @click="handleRange(item)"
            :type="form.range === item.value ? 'primary' : ''">{{item.label}}</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="颗粒度">
        <el-button-group v-model="form.group">
          <el-button
            v-for="item in GROUP_LEVEL"
            :key="item.value"
            @click="handleGroup(item)"
            :type="form.group === item.value ? 'primary' : ''">{{item.label}}</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="品类展开">
        <el-checkbox-group v-model="cateFlat">
          <el-checkbox
            v-for="item in CATEGORY_LEVEL"
            :key="item.value"
            :label="item.industryWeights">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="品类聚合">
        <el-checkbox-group v-model="agg">
          <el-checkbox
            v-for="item in CATEGORT_GROUP"
            :key="item.value"
            :label="item.industryWeights">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数据指标">
        <el-checkbox-group v-model="indicator">
          <el-checkbox
            v-for="item in DATA_INDEX"
            :key="item.value"
            :label="item.industryWeights">{{item.label}}</el-checkbox>
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
import { replenishSum } from '@/utils/common.js'
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
      cateFlat: [],
      agg: [],
      indicator: [],
      form: {
        id: '',
        range: '1',
        group: '0',
        cateFlat: 0,
        agg: 0,
        indicator: 0
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
  watch: {
    // 按照品类展开
    cateFlat: {
      deep: true,
      handler: function (arr) {
        this.handleSum(arr, 'cateFlat', 3)
      }
    },
    // 按照品类聚合
    agg: {
      deep: true,
      handler: function (arr) {
        this.handleSum(arr, 'agg', 3)
      }
    },
    // 数据指标
    indicator: {
      deep: true,
      handler: function (arr) {
        this.handleSum(arr, 'indicator', 4)
      }
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
      this.$message.info('该功能正在开发，敬请期待')
    },
    handleSum (arr, key, len) {
      this.form[key] = replenishSum(arr, len)
    },
    handleRange (item) {
      this.form.range = item.value
    },
    handleGroup (item) {
      this.form.group = item.value
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
