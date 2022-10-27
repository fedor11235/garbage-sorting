<template>
<div 
  class="scene" 
  @mousedown="handlerMousedown"
  @mousemove="handlerMousemove"
  @mouseup="handlerMouseup"
>
  <div class="scene__score" >{{score}}</div>
  <!-- <StopwatchItem  class="scene__stopwatch" /> -->
  <TrachItem 
    v-for="(item, index) in garbageTypes" 
    :key="index" 
    :class="`scene__trach-${item.type}`" 
    :ref="item.ref"
    :data-type="item.type"
    :typeTrach="item.type"
  />

  <GarbageItem 
    v-for="(item, index) in garbageList" 
    :key="index"
    class="scene__garbage" 
    :garbaGetype="item.type"
    :data-type="item.type"
    :data-index="index"
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
        garbageTypes: [
            {type: 'plastic', ref: 'trachPlastic', color: 'red'},
            {type: 'paper', ref: 'trachPaper', color: 'green'},
            {type: 'glass', ref: 'trachGlass', color: 'yellow'}
        ],
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
  },
  mounted() {
    this.generationGarbage()
  },
  methods: {
    ...mapMutations({
      scoreIncrease: 'SCORE_INCREASE',
      scoreDecrease: 'SCORE_DECREASE'
    }),
    checkingInTrash(trash) {
        const resultCompar = trash.offsetTop <= this.mooveY + this.garbageHeight &&
                trash.offsetTop + trash.clientHeight >= this.mooveY &&
                trash.offsetLeft <= this.mooveX + this.garbageWidth &&
                trash.offsetLeft + trash.clientWidth >= this.mooveX
        if(resultCompar) {
            const garbageType = this.garbageTypes.find(elem => elem.type === trash.dataset.type)
            trash.style.boxShadow = `0 0 20px ${garbageType.color}`
        } else {
            trash.style.boxShadow = ''
        }
        return  resultCompar
    },
    generationGarbage() {
        const  garbageAmount = this.generationRandomNumber(this.min, this.max)
        for(let i=0; i<=garbageAmount; i++ ) {
            const offsetLeft = this.generationRandomNumber(80, window.innerWidth - 80)
            const offsetTop = this.generationRandomNumber(40, window.innerHeight - 40)
            this.garbageList.push({
                left: offsetLeft + 'px',
                top: offsetTop + 'px',
                type: this.garbageTypes[this.generationRandomNumber(0, this.garbageTypes.length-1)].type
            })
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

        this.garbageList[this.dragObject.elem.dataset.index].left = this.mooveX + 'px';
        this.garbageList[this.dragObject.elem.dataset.index].top = this.mooveY + 'px';

        this.checkingInTrash(this.$refs.trachPlastic[0].$el)
        this.checkingInTrash(this.$refs.trachPaper[0].$el)
        this.checkingInTrash(this.$refs.trachGlass[0].$el)
    },
    handlerMouseup() {
        if (!this.dragObject.elem) return
        this.dragObject.elem.style.cursor = 'grab';

        if(this.checkingInTrash(this.$refs.trachPlastic[0].$el)) {
            if(this.dragObject.elem.dataset.type === 'plastic') {
            this.dragObject.elem.parentNode.removeChild(this.dragObject.elem);
            this.scoreIncrease()
          }
          this.$refs.trachPlastic[0].$el.style.boxShadow = ''
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

.scene__trach-plastic {
  position: absolute;
  bottom: 0px;
  left: calc(20% - 80px);
}

.scene__trach-paper {
  position: absolute;
  bottom: 0px;
  left: calc(50% - 80px);
}

.scene__trach-glass {
  position: absolute;
  bottom: 0px;
  left: calc(80% - 80px);
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
