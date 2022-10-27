<template>
<div class="trash">
  <span>{{ typeTrach }}</span>
</div>
</template>

<script>
export default {
name: 'TrachItem',
  props: {
    typeTrach: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trash {
    width: 160px;
    height: 320px;
    background-color: #929292;
}
</style>