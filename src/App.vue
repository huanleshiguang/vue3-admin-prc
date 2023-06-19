<template>
  <div class="box">
    <h1>我是app根组件</h1>
  </div>
</template>
<script lang="ts" setup>
const str = '我爱你祖国'
</script>
<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background: black;
  h1 {
    color: white;
  }
}
</style>
