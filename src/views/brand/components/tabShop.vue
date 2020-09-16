<template>
   <el-tab-pane label="店铺数据" name="shop">
    <div v-show="hasBrandFormParam">
      <Title title="总销售趋势"/>
      <div class="flex-between m-b-10">
        <Echarts-Buttons
          :activeVal="viewItemVal"
          style="width: 100%"
          @handleEchartsClick="handleEchartsClick"/>

        <Month-Options
          :monthOption="monthOption"
          :selectdMonth="selectdMonth"
          @handleSelectdMonth="handleSelectdMonth"/>
      </div>
      <div ref="chartForShop">
        <Chart-For-Shop :data="shopTableChart" style="width: 100%; height: 500px"/>
      </div>
      <Title title="按品牌展开"/>
      <div class="flex-between m-b-10">
        <Brand-Table-Brands
          :brands="brandList"
          :activeBrand="activeBrand"
          @changeActiveBrand="changeActiveBrand"/>
          <Month-Options
          :monthOption="monthOption"
          :selectdMonth="tableMonth"
          @handleSelectdMonth="handleTableMonth"/>
      </div>
        <Table-For-Shop
        ref="tableForShop"
        :isLoading="isLoadingOfShopTable"
        :sortItemVal="sortItemVal"
        :tableData="shopTableData"
        @changeSortItemVal="changeSortItemVal"/>
      </div>

      <div v-show="!hasBrandFormParam">
        <Title title="总销售趋势"/>
        <Svg-Icon icon-class="empty" class="empty-svg"/>
        <Title title="按品牌展开"/>
        <Svg-Icon icon-class="empty" class="empty-svg"/>
      </div>
  </el-tab-pane>
</template>
