<template>
<div 
  class="scene" 
  @mousedown="handlerMousedown"
  @mousemove="handlerMousemove"
  @mouseup="handlerMouseup"
>
  <div class="scene__score" >{{score}}</div>
  <!-- <StopwatchItem  class="scene__stopwatch" /> -->
  <TrachItem class="scene__trach" ref="trachPlastic" typeTrach="plastic"/>
  <GarbageItem 
    v-for="(item, index) in garbageList" 
    :key="index" 
    class="scene__garbage" 
    typeGarbage="plastic"
    :style="{left:item.left, top:item.top}"
  />
</div>
</template>

<script>
// import StopwatchItem from '@/components/StopwatchItem.vue'
import { mapState, mapMutations } from 'vuex'
import GarbageItem from '@/components/GarbageItem.vue'
import TrachItem from '@/components/TrachItem.vue'

export default {
name: 'GameScene',
  components: {
    GarbageItem,
    TrachItem,
    // StopwatchItem
  },
  data() {
    return {
        dragObject: {},
        garbageList: [],
        trachPlasticCoords: null,
        trashActive: false,
        mooveX: 0,
        mooveY: 0,
        garbageWidth: 80,
        garbageHeight: 40,
        min: 5,
        max: 20
    }
  },
  computed: {
    ...mapState(['score']),
    checkingInTrash() {
        return  this.$refs.trachPlastic.$el.offsetTop <= this.mooveY + this.garbageHeight &&
                this.$refs.trachPlastic.$el.offsetTop + this.$refs.trachPlastic.$el.clientHeight >= this.mooveY &&
                this.$refs.trachPlastic.$el.offsetLeft <= this.mooveX + this.garbageWidth &&
                this.$refs.trachPlastic.$el.offsetLeft + this.$refs.trachPlastic.$el.clientWidth >= this.mooveX
    }
  },
  mounted() {
    this.generationGarbage()
  },
  methods: {
    ...mapMutations({
      scoreIncrease: 'SCORE_INCREASE',
      scoreDecrease: 'SCORE_DECREASE'
    }),
    generationGarbage() {
        const  garbageAmount = this.generationRandomNumber(this.min, this.max)
        for(let i=0; i<=garbageAmount; i++ ) {
            const offsetLeft = this.generationRandomNumber(0, window.innerWidth)
            const offsetTop = this.generationRandomNumber(0, window.innerHeight)
            this.garbageList.push({left: offsetLeft + 'px', top: offsetTop + 'px'})
        }
    },
    generationRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    handlerMousedown(e) {
        if (e.which != 1) return
        
        this.dragObject.elem = e.target.closest('.scene__garbage')
        if (!this.dragObject.elem) return

        const elemCoords = this.dragObject.elem.getBoundingClientRect();

        this.dragObject.offsetLeft = e.clientX - elemCoords.left;
        this.dragObject.offsetTop = e.clientY - elemCoords.top;
        this.dragObject.elem.style.cursor = 'grabbing';
    },
    handlerMousemove(e) {
        if (!this.dragObject.elem) return
        this.mooveX = e.clientX - this.dragObject.offsetLeft
        this.mooveY = e.clientY - this.dragObject.offsetTop
        this.dragObject.elem.style.left = this.mooveX + 'px';
        this.dragObject.elem.style.top = this.mooveY + 'px';

        if(this.checkingInTrash) {
            this.$refs.trachPlastic.$el.style.boxShadow = '0 0 20px red'
            this.trashActive = true
        } else {
            this.$refs.trachPlastic.$el.style.boxShadow = ''
            this.trashActive = false
        }
    },
    handlerMouseup() {
        if (!this.dragObject.elem) return
        this.dragObject.elem.style.cursor = 'grab';
        if(this.checkingInTrash) {
            this.scoreIncrease()
        }
        this.dragObject = {}
        this.mooveX = 0
        this.mooveY = 0
    }
  }
}
</script>

<style>
.scene {
    position: relative;
    padding: 16px;
    height: 100vh;
    width: 100vw;
}

.scene__score {
    color: white;
}

.scene__trach {
  position: absolute;
  bottom: 0;
  left: calc(50% - 80px);
}

.scene__trach:hover {
    box-shadow:0 0 20px red;
    -moz-box-shadow:0 0 20px red; 
    -webkit-box-shadow:0 0 20px red;
}

.scene__stopwatch {
  position: absolute;
  top: 16px;
  left: calc(50% - 100px);
}

.scene__garbage {
    position: absolute;
    cursor: grab;
}

/* .scene__garbage:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
} */

</style>
