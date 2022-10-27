<template>
<div class="stopwatch">
    <svg>
        <circle class="stopwatch__progress" ref="progressBar" :stroke="colorTime" stroke-width="4" cx="100" cy="100" :r="radius" fill="transparent" />
    </svg>


    <h1 class="stopwatch__time" :style="{color: colorTime}">{{ time }}</h1>

    <div v-if="!running" class="stopwatch__backdrop">
        <button @click="handlerStart" class="stopwatch__start"> Start </button>
    </div>
</div>
</template>

<script>
export default {
name: 'StopwatchItem',
data() {
    return {
        timeBegan: null,
        deadline: null,
        started: null,
        running: false,
        time: '01:00.000',
        diffMin: 0,
        diffSec: 5,
        colorTime: 'white',

        radius: 92,
        circumference: null,
        offset: null
    }
},
mounted() {
    this.circumference = 2 * Math.PI * this.radius
    this.$refs.progressBar.style.strokeDasharray = `${this.circumference} ${this.circumference}`
    this.setProgress(100)
},
methods: {
    setProgress(parcent) {
        this.offset = this.circumference - parcent / 100 * this.circumference
        this.$refs.progressBar.style.strokeDashoffset = this.offset 
    },
    handlerStart() {
    if(this.running) return;
    
    if (this.timeBegan === null) {
        this.timeBegan = new Date();
        this.deadline = new Date(
            this.timeBegan.getFullYear(), 
            this.timeBegan.getMonth(),
            this.timeBegan.getDate(),

            this.timeBegan.getHours(),
            this.timeBegan.getMinutes() + this.diffMin,
            this.timeBegan.getSeconds() + this.diffSec,
            this.timeBegan.getMilliseconds()
        )
    }

    this.started = setInterval(this.clockRunning, 1);	
    this.running = true;
    },
    clockRunning(){
        let currentTime = new Date()

        let timeElapsed = new Date(this.deadline - currentTime)
        let min = timeElapsed.getUTCMinutes()
        let sec = timeElapsed.getUTCSeconds()
        let ms = timeElapsed.getUTCMilliseconds()

        let parcent = (sec + '.' + ms) / 3 * 5

        this.setProgress(parcent)
        if(parcent <= 0.2) {
            this.stop()
            return
        }

        this.time = 
            this.zeroPrefix(min, 2) + ":" + 
            this.zeroPrefix(sec, 2) + "." + 
            this.zeroPrefix(ms, 3);
    },
    stop() {
        this.running = false;
        this.timeBegan = null
        clearInterval(this.started);
        this.time = '01:00.000'
        this.setProgress(100)
        this.endingAnimation()
    },
    zeroPrefix(num, digit) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    },
    endingAnimation() {	
        this.colorTime =  'red'
        setTimeout(() => this.colorTime =  'white', 1000)
    }
}
}
</script>

<style scoped>
.stopwatch {
    display: flex;
    width: 200px;
    height: 200px;
    color: #fafafa;
    border-radius: 50%;
}

.stopwatch__progress {
    transform-origin: center;
    transform: rotate(-90deg);
    transition: stroke-dashoffset 1s;
}

.stopwatch__time {
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 72px);
}

.stopwatch__backdrop {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.25);
}
.stopwatch__start {
    cursor: pointer;
    background-color: #fdfdfd;
    width: 100px;
    height: 40px;
    font-size: 21px;
    font-weight: 500;
    border-radius: 12px;
    border: none;
    transition: background-color 400ms;
}
.stopwatch__start:hover {
    background-color: #929292;
}
</style>