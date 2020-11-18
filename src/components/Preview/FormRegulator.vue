<template>
  <el-form ref="form" :model="form" label-width="80px" label-position="left" size="mini">
    <el-form-item label="时间范围">
      <el-button-group v-model="form.range">
        <el-button
          v-for="item in RANGE_LEVEL"
          :key="item.value"
          @click="changeRange(item)"
          :type="form.range === item.value ? 'primary' : ''">{{item.label}}</el-button>
      </el-button-group>
    </el-form-item>
    <el-form-item label="颗粒度">
      <el-button-group v-model="form.particle">
        <el-button
          v-for="item in GROUP_LEVEL"
          :key="item.value"
          @click="handleGroup(item)"
          :type="form.particle === item.value ? 'primary' : ''">{{item.label}}</el-button>
      </el-button-group>
    </el-form-item>
    <el-form-item label="品类展开" style="height: 28px;">
      <el-checkbox-group v-model="cateFlat" @change="changeCateFlat">
        <el-checkbox
          v-for="item in CATEGORY_LEVEL"
          :key="item.value"
          checked
          :label="item">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="品类聚合" style="height: 28px;">
      <el-checkbox-group v-model="agg" @change="changeAgg">
        <el-checkbox
          v-for="item in CATEGORT_GROUP"
          :key="item.value"
          :label="item"
          @change="val => handleCurrentAgg(val, item)">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="数据指标" style="height: 28px;">
      <el-checkbox-group v-model="indicator" @change="changeIndicator">
        <el-checkbox
          v-for="item in DATA_INDEX"
          :key="item.value"
          :disabled="item.disabled"
          :label="item">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  RANGE_LEVEL,
  GROUP_LEVEL,
  CATEGORY_LEVEL,
  CATEGORT_GROUP,
  DATA_INDEX,
  INDUSTRY_EXCEL_TABLE_PROP
} from '@/utils/const.js'
import { replenishSum } from '@/utils/common.js'
export default {
  name: 'PreviewFormRegulator',
  data () {
    return {
      cateFlat: [],
      agg: [],
      indicator: DATA_INDEX.slice(0, 3),
      particle: {},
      excelHeader: [],
      form: {
        range: 'one_year',
        particle: 'month',
        cateFlat: '111',
        agg: '0000',
        indicator: '0111'
      },
      RANGE_LEVEL,
      GROUP_LEVEL,
      CATEGORY_LEVEL,
      CATEGORT_GROUP,
      DATA_INDEX,
      INDUSTRY_EXCEL_TABLE_PROP,
      currentCheckedAgg: {}
    }
  },
  methods: {
    changeRange (item) {
      this.form.range = item.value
      this.handleFlat()
    },
    handleGroup (item) {
      this.form.particle = item.value
      this.handleFlat()
    },
    // 按照品类展开
    changeCateFlat (val) {
      this.handleSum(val, 'cateFlat', 3)
    },
    handleCurrentAgg (val, item) {
      val ? this.currentCheckedAgg = item : this.currentCheckedAgg = {}
    },
    // 按照品类聚合
    changeAgg (arr) {
      if (this.currentCheckedAgg.label === '按品名') {
        arr.push(CATEGORT_GROUP[0])
        this.agg = this._.uniqBy(arr, 'label')
      }
      this.handleSum(this.agg, 'agg', 4)
    },
    // 按照数据指标
    changeIndicator (arr) {
      this.handleSum(arr, 'indicator', 4)
    },
    handleSum (arrObj, key, len) {
      const val = arrObj.map(item => item.industryWeights)
      this.form[key] = replenishSum(val, len)
      this.handleFlat()
    },
    handleFlat () {
      const particle = this.particle.industryExcelHeader || []
      const cateFlats = this.cateFlat.map(item => item.industryExcelHeader)
      const aggs = this.agg.map(item => item.industryExcelHeader)
      const indicators = this.indicator.map(item => item.industryExcelHeader)
      const selectHeader = [...cateFlats, ...aggs, ...indicators, ...particle].flat() // 降维
      this.excelHeader = INDUSTRY_EXCEL_TABLE_PROP.filter(item => {
        return selectHeader.indexOf(item.label) !== -1
      })
      this.$emit('handleExcelHeader', this.form, this.excelHeader)
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-checkbox
  margin-right 10px
  min-width: 80px

.flex-wapper
  display flex
  width 100%
</style>
