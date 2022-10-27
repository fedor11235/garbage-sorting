<template>
<div 
  class="scene" 
  @mousedown="handlerMousedown"
  @mousemove="handlerMousemove"
  @mouseup="handlerMouseup"
>
  <span class="scene__score" >Your game score: {{score}}</span>
  <StopwatchItem  class="scene__stopwatch" />
  <TrachItem 
    v-for="(item, index) in trashList" 
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
  <GameModal v-if="!gameProcessed"/>
</div>
</template>

<script>
import StopwatchItem from '@/components/StopwatchItem.vue'
import { mapState, mapMutations } from 'vuex'
import GarbageItem from '@/components/GarbageItem.vue'
import TrachItem from '@/components/TrachItem.vue'
import GameModal from '@/components/GameModal.vue'

export default {
name: 'GameScene',
  components: {
    GarbageItem,
    TrachItem,
    StopwatchItem,
    GameModal
  },
  data() {
    return {
        dragObject: {},
        garbageList: [],
        trashList: [
            {type: 'plastic', ref: 'trachPlastic', color: 'red'},
            {type: 'paper', ref: 'trachPaper', color: 'green'},
            {type: 'glass', ref: 'trachGlass', color: 'yellow'}
        ],
        mooveX: 0,
        mooveY: 0,
        garbageWidth: 80,
        garbageHeight: 40,
        garbageMinAmount: 15,
        garbageMaxAmount: 25,
        garbageEndТumber: 0,
    }
  },
  computed: {
    ...mapState(['score', 'gameProcessed']),
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
            const garbageType = this.trashList.find(elem => elem.type === trash.dataset.type)
            trash.style.boxShadow = `0 0 20px ${garbageType.color}`
        } else {
            trash.style.boxShadow = ''
        }
        return  resultCompar
    },
    generationGarbage() {
        this.garbageEndТumber = this.generationRandomNumber(this.garbageMinAmount, this.garbageMaxAmount)
        for(let i=0; i<=this.garbageEndТumber; i++ ) {
            const offsetLeft = this.generationRandomNumber(80, window.innerWidth - 80)
            const offsetTop = this.generationRandomNumber(40, window.innerHeight - 40)
            this.garbageList.push({
                left: offsetLeft + 'px',
                top: offsetTop + 'px',
                type: this.trashList[this.generationRandomNumber(0, this.trashList.length-1)].type
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

        for(const trash of this.trashList) {
            if(this.checkingInTrash(this.$refs[trash.ref][0].$el)) {
                if (this.dragObject.elem.dataset.type === trash.type) {
                    this.scoreIncrease()
                } else {
                    this.scoreDecrease()
                }
                this.dragObject.elem.parentNode.removeChild(this.dragObject.elem);
            } else {
                this.$refs.trachPlastic[0].$el.style.boxShadow = ''
            }
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
    height: 100%;
    width: 100%;
}

.scene__score {
    position: absolute;
    top: 16px;
    left: calc(50% - 69px);
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

.scene__stopwatch {
  position: absolute;
  top: 48px;
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
