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
            <li>推荐加入</li>
            <li>加入空房</li>
            <li>我的房间</li>
            <!-- 点击后会变成顺序推荐 -->
            <li @click="sortList">
                {{ sortType }}
                <van-icon class="replay" name="replay" />
            </li>
        </ul>
    </aside>

    <main>
        <ul>
            <li v-for="(item, index) in roomData">
                <div class="room_no">{{ item.room.roomName }}</div>
                <div class="room_info">
                    <div class="lable_tag">
                        <ul>
                            <template v-if="item.commonTag.length != 0">
                                <li v-for="indexa in (item.commonTag.length < 3 ? item.commonTag.length : 3)">{{
                                    item.commonTag[indexa-1] }}</li>
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

const roomChecked = (item, i) => {
    for (let k = 0; k < 4; k++) {
        if (item.userSelectedRoom[k]?.bedNumber == i) {
            return "true";
        }
    }
};


const roomData = ref([]);
proxy.$api.get('/room/queryMyAllRoom').then(res => {
    console.log(res.data);
    roomData.value = res.data;
    console.log(roomData.value);
});

// 显示和隐藏搜索框
const checked_search = ref(false);
// 顺序显示 和 推荐显示
const sortChecked = ref(false);
const sortType = ref("推荐排序");
function sortList() {
    if (sortChecked.value) {
        sortType.value = "推荐排序";
    } else {
        sortType.value = "顺序排序";
    }
    sortChecked.value = !sortChecked.value;
}


</script>


<style scoped src="../assets/css/views/hall.css"></style>