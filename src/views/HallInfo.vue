<template>
    <nav class="title">
        <h1>共同标签</h1>
        <p id="RommId">{{ roomName }}</p>
    </nav>

    <aside>
        <div class="tag_box" :style="opne ? '' : 'height: 8.5vh;'">
            <span v-for="(item,index) in commonTag" :key="index">{{ item }}</span>
            <div id="Open" @click="opne = !opne">展开</div>
        </div>
    </aside>

    <main>
        <div class="user_info">
            <ul>
                <li :class="item.userInfo ? 'user_info_true' : 'user_info_false'" @click="joinRoom(item)"
                    v-for="item in 4" :key="item.id">
                    <template v-if="item.userInfo">
                        <!-- 上部 名字 标签 -->
                        <div class="user_info_top">
                            <span class="user_info_top_name">
                                {{ item.user.userInfo.name }}
                            </span>
                            <div class="user_info_top_tag">
                                <span v-for="tag in item.tags">{{ tag }}</span>
                            </div>
                        </div>
                        <!-- 下部 简介 -->
                        <p class="user_info_end">
                            {{ item.userInfo.introduce }}
                        </p>
                        <!-- 底部 序号层 -->
                        <div class="user_info_true_index">{{ item.id + 1 }}</div>
                    </template>

                    <template v-else>
                        <p class="user_info_left">{{ item.id + 1 }}</p>
                        <div class="user_info_right">
                            <p>加入</p>
                            <p>Pick UP</p>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </main>
    <!-- 弹窗 -->
    <van-popup v-model:show="showRoom" round class="room_popup">
        <h2>协议</h2>
        <p class="room_msg">
            <span>房间:A301</span>
            <span>床位:1</span>
        </p>
        <p class="popup_msg">
            是否<strong>确认选择</strong>，同意后<strong>无法更改</strong>，如有疑问请联系辅导员老师。
        </p>
        <div class="popup_btn">
            <van-button plain hairline type="danger" size="small" @click="showRoom = false">不同意</van-button>
            <van-button color="#1C4C8C" size="small" plain>同意</van-button>
        </div>
    </van-popup>
</template>

<script setup>
import router from '@/router';
import { reactive, ref, getCurrentInstance } from 'vue';
const roomId = router.currentRoute.value.query.roomId;
const roomName = router.currentRoute.value.query.roomName;
const { proxy } = getCurrentInstance();
//获取共同标签
const commonTag = ref([]);
proxy.$api.get("/room/userCommonTag?roomId=" + roomId).then(r => {
    console.log(r.data);
    commonTag.value = r.data;
})
//获取房间信息
proxy.$api.get("/room/roomInfo?roomId="+roomId).then(r=>{
  roomData.value=r.data;
    console.log(r.data);
})
const tags = reactive([{
    id: 0,
    tag: "篮球"
}]);
const roomData = ref([
    {
        id: 0,
        user: {
            name: "费玉清",
            info: "你滚我喜欢送你滚我喜欢送你滚我喜欢送你滚",
            tags: ["篮球", "爱睡觉", "不让舍友睡觉", "睡觉的时候喜欢大吵大闹", "篮球", "篮球", "篮球", "篮球", "篮球", "篮球"]
        },
        status: true
    },
    {
        id: 1,
        user: {
            name: "薛之谦",
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
//弹窗
const showRoom = ref(false);
//是否展开
const opne = ref(false)

//加入房间
function joinRoom(item) {
    if (item.status == true) return;
    showRoom.value = true;
    console.log(item);
}
</script>

<style scoped src="../assets/css/views/hallInfo.css"></style>