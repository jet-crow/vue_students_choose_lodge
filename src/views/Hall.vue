<!-- 选舍大厅 -->
<template>
    <nav>
        <h1>选舍大厅</h1>
        <van-icon class="search" name="search" @click="checked_search = true" />
        <div class="search_box" v-show="checked_search">
            <input id="Search" type="number">
            <van-icon class="close" name="cross" @click="checked_search = false" />
        </div>
    </nav>
    <!-- 排序按钮 -->
    <aside>
        <ul>
            <li @click="addRecommendRoom">推荐加入</li>
            <li @click="addEmptyRoom">加入空房</li>
            <li @click="myRoom">我的房间</li>
            <!-- 点击后会变成顺序推荐 -->
            <li @click="sortList">
                {{ sortType }}
                <van-icon class="replay" name="replay" />
            </li>
        </ul>
    </aside>

    <main>
        <ul>
            <li v-for="(item, index) in roomData" @click="jumpRoom(item.room.roomId, item.room.roomName)">
                <div class="room_no">{{ item.room.roomName }}</div>
                <div class="room_info">
                    <div class="lable_tag">
                        <ul>
                            <template v-if="item.commonTag.length != 0">
                                <li v-for="indexa in (item.commonTag.length < 3 ? item.commonTag.length : 3)">{{
                                    item.commonTag[indexa - 1] }}</li>
                            </template>
                        </ul>
                    </div>
                    <div class="room_item">
                        <ul>
                            <li v-for="i in 4">
                                <div class="room_item_box" :data_checked="roomChecked(item, i)"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>



            <!-- 这俩不能丢 -->
            <li></li>
            <li></li>
        </ul>
    </main>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import router from "@/router";
const { proxy } = getCurrentInstance();
// 显示和隐藏搜索框
const checked_search = ref(false);
// 顺序显示 和 推荐显示
const sortChecked = ref(false);
const sortType = ref("推荐排序");

const roomData = ref([]);
const userTagData = ref([]);
const getRoomData = (isSimilarity) => {
    proxy.$api.get('/room/queryMyAllRoom').then(res => {
        console.log(res.data);
        roomData.value = res.data;
        if (isSimilarity) {
            roomData.value = sortRoomsBySimilarity(userTagData.value, roomData.value);
        }
    });
};
// 默认数据
getRoomData(true);

proxy.$api.get('/userSelectedTag/queryUserTag').then(res => {
    console.log(res.data);
    userTagData.value = res.data;
    // console.log(userTagData.value);
});

const sortRoomsBySimilarity = (tags, rooms) => {
    // 对于每个房间，计算它与给定标签之间的相似度并存储在数组中
    const similarityScores = rooms.map((room) => {
        const commonTags = room.commonTag;
        const intersection = commonTags.filter((tag) => tags.includes(tag));
        const similarity = intersection.length / tags.length;
        return similarity;
    });

    // 创建一个对象数组，每个对象包含房间和相应的相似度
    const roomsWithScores = rooms.map((room, index) => ({
        room: room,
        similarityScore: similarityScores[index],
    }));

    // 按相似度得分从高到低对房间进行排序
    roomsWithScores.sort((a, b) => b.similarityScore - a.similarityScore);

    // 从排序后的数组中提取排序的房间
    const sortedRooms = roomsWithScores.map((roomWithScore) => roomWithScore.room);

    return sortedRooms;
};

const roomChecked = (item, i) => {
    for (let k = 0; k < 4; k++) {
        if (item.userSelectedRoom[k]?.bedNumber == i) {
            return "true";
        }
    }
};


const sortList = () => {
    if (sortChecked.value) {
        sortType.value = "推荐排序";
        getRoomData(true);
    } else {
        sortType.value = "顺序排序";
        getRoomData(false);
    }
    sortChecked.value = !sortChecked.value;
};

const addEmptyRoom = () => {
    for (const item of roomData.value) {
        if (item.userSelectedRoom.length == 0) {
            router.push({
                path: '/hallInfo',
                query: {
                    roomId: item.room.roomId,
                    roomName: item.room.roomName,
                }
            });
            return;
        }
    }
};

const addRecommendRoom = () => {
    // 首先改为推荐排序
    sortType.value = "推荐排序";
    proxy.$api.get('/room/queryMyAllRoom').then(res => {
        console.log(res.data);
        roomData.value = res.data;
        roomData.value = sortRoomsBySimilarity(userTagData.value, roomData.value);

        // 顺序查找只要没满人（人数不等于4）就可以加入
        for (const item of roomData.value) {
            if (item.userSelectedRoom.length != 4) {
                router.push({
                    path: '/hallInfo',
                    query: {
                        roomId: item.room.roomId,
                        roomName: item.room.roomName,
                    }
                });
                return;
            }

        }
    });
};

const jumpRoom = (roomIdValue, roomNameValue) => {
    router.push({
        path: '/hallInfo',
        query: {
            roomId: roomIdValue,
            roomName: roomNameValue,
        }
    });
};

const myRoom = () => {
    proxy.$api.get('/userSelectedRoom/myRoom').then(res => {
        if (res.data == '') {
            ElMessage({
                type: 'error',
                message: '您还没有选择宿舍'
            });
            return;
        }
        router.push({
            path: '/hallInfo',
            query: {
                roomId: res.data.roomId,
                roomName: res.data.roomName,
            }
        });
    });


}

</script>


<style scoped src="../assets/css/views/hall.css"></style>