<!-- 选舍大厅 -->
<template>
    <nav>
        <h1>选舍大厅</h1>
        <van-icon class="search" name="search" @click="checked = true" />
        <div class="search_box" v-show="checked">
            <input id="Search" type="number">
            <van-icon class="close" name="cross" @click="checked = false" />
        </div>
    </nav>
    <!-- 排序按钮 -->
    <aside>
        <ul>
            <li>推荐加入</li>
            <li>加入空房</li>
            <li>我的房间</li>
            <li>当前推荐<van-icon class="replay" name="replay"/></li>
        </ul>
    </aside>

    <main>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </main>
</template>

<script setup>
import { ref } from 'vue';
// 显示和隐藏搜索框
const checked = ref(false);
</script>


<style scoped>
@import url(../assets/css/views/hall.css);
</style>