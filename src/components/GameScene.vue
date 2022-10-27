<template>
<div class="scene" @mousedown="handlerMousedown">
  <StopwatchItem  class="scene__stopwatch" />
  <GarbageItem class="scene__garbage" typeGarbage="plastic"/>
  <!-- <TrachItem class="trach-item" typeTrach="plastic"/> -->
</div>
</template>

<script>
import StopwatchItem from '@/components/StopwatchItem.vue'
import GarbageItem from '@/components/GarbageItem.vue'
// import TrachItem from './components/TrachItem.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
name: 'GameScene',
  components: {
    GarbageItem,
    // TrachItem,
    StopwatchItem
  },
  methods: {
    handlerMousedown(e) {
        if (e.which != 1) {
            return
        }
        var elem = e.target.closest('.scene__garbage')
        console.log(elem)
        if (!elem) return
    }
  }
}
</script>

<style>
.scene {
    position: relative;
    height: 100vh;
    width: 100vw;
}

.scene__trach {
  position: absolute;
  bottom: 0;
  left: 50%;
}

.scene__stopwatch {
  position: absolute;
  top: 16px;
  left: calc(50% - 100px);
}

</style>
