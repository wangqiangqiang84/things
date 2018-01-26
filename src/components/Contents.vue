<template>
    <div id="content" class="jarviswidget well well-lg"
         data-widget-colorbutton="false"
         data-widget-editbutton="false"
         data-widget-custombutton="false"
         data-widget-sortable="false"
         role="widget">
      <transition>
        <router-view></router-view>
      </transition>
    </div>


    <!-- END #MAIN CONTENT -->
</template>

<script>
  export default {
    name: 'content',
    props: ['paths']
  }
</script>
