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
                    v-for="(i, index) in 4"
                    @click="roomData.find(r => r.bedNumber == i) == null ? joinRoomDialog(i) : null">
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
                            <p>申请</p>
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
            <span>房间:{{ roomName }}</span>
            <span>床位:{{ joinData.bedNumber }}</span>
        </p>
        <p class="popup_msg">
            是否<strong>确认选择</strong>，同意后<strong>无法更改</strong>，如有疑问请联系辅导员老师。
        </p>
        <div class="popup_btn">
            <van-button plain hairline type="danger" size="small" @click="showRoom = false">不同意</van-button>
            <van-button color="#1C4C8C" size="small" plain @click="joinRoomSubmit">同意</van-button>
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
//弹窗
const showRoom = ref(false);
//是否展开
const opne = ref(false);
// 提交的房间
const joinData = ref({
    buildingId: '',
    roomId: '',
    bedNumber: ''
});
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


//加入房间弹窗
const joinRoomDialog = (bedNumber) => {
    showRoom.value = true;
    joinData.value.buildingId = buildingId;
    joinData.value.roomId = roomId;
    joinData.value.bedNumber = bedNumber;
    // console.log(joinData.value);
};

// 加入房间
const joinRoomSubmit = () => {
    // console.log(joinData.value);
    proxy.$api.post("/userSelectedRoom/insertUserRoom", proxy.$qs.stringify({
        buildingId: joinData.value.buildingId,
        roomId: joinData.value.roomId,
        bedNumber: joinData.value.bedNumber
    })).then(r => {
        if (r.data) {
            ElMessage({
                message: '加入成功',
                type: 'success',
            });
            location.reload();
        } else {
            ElMessage({
                message: '您已有宿舍了哦',
                type: 'error',
            });
            showRoom.value = false;

        }

    }).catch(e => {
        ElMessage({
            message: '加入失败',
            type: 'error',
        });
        showRoom.value = false;

    });
};
</script>

<style scoped src="../assets/css/views/hallInfo.css"></style>