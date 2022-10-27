<template>
<div class="garbage">
  <span>{{ typeGarbage }}</span>
</div>
</template>

<script>
export default {
name: 'GarbageItem',
  props: {
    typeGarbage: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.garbage {
    width: 80px;
    height: 40px;
    line-height: 40px;
    border-radius: 16px;
    background-color: #eae8e8;

    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
</style>