<template>
    <nav class="title">
        <h1>共同标签</h1>
        <p id="RommId">A301</p>
    </nav>

    <aside>
        <div class="tag_box">
            <span v-for="item in 20" :key="item">{{ tags[0].tag }}{{ item }}</span>
            <div id="Open">展开</div>
        </div>

    </aside>

    <main>
        <div class="user_info">
            <ul>
                <li :class="item.status ? 'user_info_true' : 'user_info_false'" v-for="item in roomData" :key="item.id">
                    <template v-if="item.status">
                        <!-- 上部 名字 标签 -->
                        <div class="user_info_top">
                            <span class="user_info_top_name">
                                {{ item.user.name }}
                            </span>
                            <div class="user_info_top_tag">
                                <span v-for="tag in item.user.tags">{{ tag }}</span>
                            </div>
                        </div>
                        <!-- 下部 简介 -->
                        <p class="user_info_end">
                            {{ item.user.info }}
                        </p>
                        <!-- 底部 序号层 -->
                        <div class="user_info_true_index">{{ item.id + 1 }}</div>
                    </template>

                    <template v-else>
                        no
                    </template>
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup>
import { reactive } from 'vue';
const tags = reactive([
    {
        id: 0,
        tag: "篮球"
    }]);
const roomData = reactive([
    {
        id: 0,
        user: {
            name: "啊我死",
            info: "asda",
            tags: ["篮球", "of"]
        },
        status: true
    },
    {
        id: 1,
        user: {
            name: "jesong",
            info: "asda",
            tags: ["篮球", "of"]
        },
        status: true
    },
    {
        id: 2,
        user: {},
        status: false
    },
    {
        id: 3,
        user: {},
        status: false
    },
]);
</script>

<style scoped>
@import url(../assets/css/views/hallInfo.css);
</style>