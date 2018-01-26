<template>
  <div class="widget-body">
    <personal-settings></personal-settings>
  </div>
</template>
<script type='text/ecmascript-6'>
  import PersonalSettings from './PersonalSettings.vue'
  export default {
    name: 'settings',
    components: {
      PersonalSettings
    }
  }
</script>
