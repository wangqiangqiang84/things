<template>
  <div class="dataFlow">
    <div class="dataFlowTop">
      <span>数据流</span>
    </div>
    <div class="dataFlowBot">
      <DataFlowOne></DataFlowOne>
      <DataFlowTwo></DataFlowTwo>
      <DataFlowThree></DataFlowThree>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import DataFlowOne from './DataFlowOne.vue'
  import DataFlowTwo from './DataFlowTwo.vue'
  import DataFlowThree from './DataFlowThree.vue'
  export default {
    components: {
      DataFlowOne,
      DataFlowTwo,
      DataFlowThree
    }
  }
</script>
<style>
  @import "../../../../assets/css/device/detail/DeviceData/DataFlow.css";
</style>

