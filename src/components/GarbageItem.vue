<template>
<div class="garbage">
  <span>{{ garbaGetype }}</span>
</div>
</template>

<script>
export default {
name: 'GarbageItem',
  props: {
    garbaGetype: String
  }
}
</script>

<style scoped>
.garbage {
    width: 80px;
    height: 40px;
    line-height: 40px;
    border-radius: 16px;
    background-color: #eae8e8;
    color: #1a1a1a;

    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
</style>