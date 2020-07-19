<template>
    <div>
        <h1 ref="aa">ref案例</h1>
        <button @click="getInfo">点击我有惊喜</button>
        <div>
            <audio
                ref="audio"
                src="http://m10.music.126.net/20200713171940/2946fd0e8499b3ee0eed9a6fa23d4bfa/yyaac/obj/wonDkMOGw6XDiTHCmMOi/2600780306/8e93/bc84/233a/84939e1464374d08955975b86649fe7b.m4a"
                autoplay
            ></audio>
        </div>
        <div>
            <img
                @click="play"
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3721795396,687977588&fm=26&gp=0.jpg"
                alt
            />
            <img
                @click="pause"
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=92168698,1802667359&fm=26&gp=0.jpg"
                alt
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        console.log(this.$refs.aa)
        console.log(this.$refs.audio)
    },
    methods: {
        getInfo() {
            console.log(this.$refs.aa.innerHTML, 'dom结构')
        },
        //播放音乐
        play() {
            this.$refs.audio.play()
        },
        //暂停音乐
        pause() {
            this.$refs.audio.pause()
        }
    }
}
</script>

<style  lang="" scoped>
img {
    width: 2rem;
}
</style>
