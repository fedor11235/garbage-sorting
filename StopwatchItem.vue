<template>
<div class="stopwatch">
    <div id="out">
        <h1 id="content">00:00:000</h1>
        <button id="start" @click="handlerStartTime"> Пуск </button>
        <button id="division" @click="handlerDivisionTime"> Разделить </button>
        <button id="reset" @click="handlerResetTime"> Сброс </button>
    </div>
</div>
</template>

<script>
export default {
name: 'StopwatchItem',
data() {
    return {
        content: null,
        out: null,
        start: null,
        totalTime: 0,
        timer: null,
    }
},
mounted() {
    this.out = document.getElementById("out");
    this.content = document.getElementById("content");
    this.start = document.getElementById("content");
},
methods: {
    handlerResetTime() {
        var divTime = document.getElementsByTagName("h2");
        for (var i = 0; i < divTime.length; i++) {
            this.out.removeChild(divTime[0]);
            i--;
        }
        clearInterval(this.timer);
        this.timer = null;
        this.totalTime = 0;
        this.content.innerHTML = this.showTime();
        this.start.innerHTML = "Начало";
    },
    handlerDivisionTime() {
        var h2 = document.createElement("h2");
        h2.innerHTML = this.showTime();
        this.out.appendChild(h2);
    },
    handlerStartTime(e) {
        if (e.target.innerHTML == "начало") {
            e.target.innerHTML = "тайм-аут";
            this.timer = setInterval(function () {
                this.totalTime += 41;
                this.content.innerHTML = this.showTime();
            }, 41)

        } else if (e.target.innerHTML == "Пауза") {
            e.target.innerHTML = "Начало";
            console.log("Распечатка" + this.timer);
            clearInterval(this.timer);
            this.timer = null;
            return
        }
    },
    showTime() {
        var min;
        var second;
        var msecond;
        second = Math.floor((this.totalTime / 1000) % 60);
        min = Math.floor(this.totalTime / 1000 / 60 % 60);
        msecond = this.totalTime % 1000;

        second = second % 60 < 10 ? "0" + second : second;
        min = min % 60 < 10 ? +"0" + min : min;
        msecond = msecond < 100 ? "0" + msecond : msecond;
        return min + ":" + second + ":" + msecond;
    }
}
}
</script>

<style scoped>
.stopwatch {
    width: 160px;
    height: 320px;
    background-color: #929292;
}
#out {
    margin: 0 auto;
    width: 500px;
    border: 1px solid blueviolet;
    text-align: center;
    padding-bottom: 20px
}
</style>