<template>
    <Nav :title="'Pick up'" />
    <main>
        <p class="title_msg">选择符合自己的标签</p>
        <div class="label_box">
            <div class="label_items" v-for="item in labelData" :key="item.id">
                <div class="title"> {{ item.title }}</div>
                <div class="label_tag">
                    <span v-for="(tag, index) in item.tag" :key="index">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>
        <p class="title_msg">个签（留言、介绍）</p>
        <div class="personal_msg">
            <textarea v-model="personalMsg" @input="checkMsgNumbe"></textarea>
            <span>{{ msgCount }}/30</span>
        </div>
        <div class="submit">
            <div id="Submit">确认无误</div>
        </div>
    </main>
</template>
<script setup>
import Nav from '../components/Nav.vue'
import { reactive, ref } from 'vue'
import { p } from '@antfu/utils';

const labelData = reactive([
    {
        id: 0,
        title: "爱好",
        tag: ["音乐", "篮球", "音乐", "篮球", "篮球", "音乐", "篮球", "篮球", "音乐", "篮球"]
    },
    {
        id: 1,
        title: "入睡时间",
        tag: ["音乐", "篮球", "音乐", "篮球"]
    },
    {
        id: 2,
        title: "生活词",
        tag: ["音乐", "篮球", "音乐", "篮球"]
    },
    {
        id: 3,
        title: "kes",
        tag: ["音乐", "篮球", "音乐", "篮球"]
    },
])
//字数限制
const personalMsg = ref("")
const msgCount = ref(0)

//监听字数限制
function checkMsgNumbe() {
    personalMsg.value = personalMsg.value.substring(0, 30);
    msgCount.value = (personalMsg.value).length
}
</script>

<style scoped src="../assets/css/views/pickUp.css">
</style>