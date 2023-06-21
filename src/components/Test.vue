<template>
  <div class="box">
    <h1>我是test组件</h1>
    <svg-icon name="expand" width="100px" height="100px"></svg-icon>
    <pagination />
  </div>
</template>

<script lang="ts" setup>
// 将svg封装一下再使用更方便，但是每个组件都需要引入（不方便），考虑将其定义为全局组件
// import SvgIcon from '@/components/SvgIcon/index.vue'
</script>

<style scoped lang="scss">
.box {
  h1 {
    color: red;
  }
}

</style>
