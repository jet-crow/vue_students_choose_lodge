<template>
    <nav class="title">
            <p id="RommId">A301</p>
            <h1>共同标签：</h1>
    </nav>
    <aside>
        <div class="tag_box">
            <span v-for="item in 10" :key="item">{{ tags[0].tag }}{{ item }}</span>
        </div>
    </aside>

    <main>
        <div class="user_info">

        </div>
    </main>
</template>

<script setup>
import { reactive } from 'vue'
const tags = reactive([
    {
        id: 0,
        tag: "篮球"
    }, {
        id: 1,
        tag: "篮球"
    }, {
        id: 2,
        tag: "篮球"
    }, {
        id: 3,
        tag: "篮球"
    }, {
        id: 4,
        tag: "篮球"
    }
])
</script>

<style scoped>
@import url(../assets/css/views/hallInfo.css);
</style>