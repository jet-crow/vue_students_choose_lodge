<template>
    <nav class="title">
        <h1>共同标签</h1>
        <p id="RommId">{{ roomName }}</p>
    </nav>

    <aside>
        <div class="tag_box" :style="opne ? '' : 'height: 8.5vh;'">
            <span v-for="(item, index) in commonTag" :key="index">{{ item }}</span>
            <div id="Open" @click="opne = !opne">展开</div>
        </div>
    </aside>

    <main>
        <div class="user_info">
            <ul>
                <li :class="roomData.find(r => r.bedNumber == i) != null ? 'user_info_true' : 'user_info_false'"
                    v-for="(i, index) in 4" @click="roomData.find(r => r.bedNumber == i) == null ? joinRoom(i) : null">
                    <!-- {{ roomData.find(r => r.bedNumber == i)  }} -->
                    <template v-if="roomData.find(r => r.bedNumber == i) != null">
                        <!-- 上部 名字 标签 -->
                        <div class="user_info_top">
                            <span class="user_info_top_name">
                                {{ roomData.find(r => r.bedNumber == i).userInfo.name }}
                            </span>
                            <div class="user_info_top_tag">
                                <span v-for="tag in roomData.find(r => r.bedNumber == i).tags">{{ tag }}</span>
                            </div>
                        </div>
                        <!-- 下部 简介 -->
                        <p class="user_info_end">
                            {{ roomData.find(r => r.bedNumber == i).userInfo.introduce }}
                        </p>
                        <!-- 底部 序号层 -->
                        <div class="user_info_true_index">{{ i }}</div>
                    </template>

                    <template v-else>
                        <p class="user_info_left">{{ i }}</p>
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
const buildingId = router.currentRoute.value.query.buildingId;
const { proxy } = getCurrentInstance();
//获取共同标签
const commonTag = ref([]);
proxy.$api.get("/room/userCommonTag?roomId=" + roomId).then(r => {
    console.log(r.data);
    commonTag.value = r.data;
});
const roomData = ref([]);
//获取房间信息
proxy.$api.get("/room/roomInfo?roomId=" + roomId).then(r => {
    roomData.value = r.data || [];
    console.log(r.data);

});
const tags = reactive([{
    id: 0,
    tag: "篮球"
}]);

//弹窗
const showRoom = ref(false);
//是否展开
const opne = ref(false);

//加入房间
function joinRoom(bedNumber) {
    console.log(roomId);
    console.log(bedNumber);
    console.log(buildingId);
}
</script>

<style scoped src="../assets/css/views/hallInfo.css"></style>