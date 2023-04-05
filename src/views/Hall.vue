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
            <li>
                <div class="room_no">A301</div>
                <div class="room_info">
                    <div class="lable_tag">
                        <ul>
                            <li>篮球</li>
                            <li>唱</li>
                            <li>rap</li>
                        </ul>
                    </div>
                    <div class="room_item">
                        <ul>
                            <li>
                                <div class="room_item_box" data_checked="true"></div>
                            </li>
                            <li>
                                <div class="room_item_box"></div>
                            </li>
                            <li>
                                <div class="room_item_box"></div>
                            </li>
                            <li>
                                <div class="room_item_box"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>

            <li>
                <div class="room_no">A301</div>
                <div class="room_info">
                    <div class="lable_tag">
                        <ul>
                            <li>篮球</li>
                            <li>唱</li>
                            <li>rap</li>
                        </ul>
                    </div>
                    <div class="room_item">
                        <ul>
                            <li>
                                <div class="room_item_box" data_checked="true"></div>
                            </li>
                            <li>
                                <div class="room_item_box" data_checked="true"></div>
                            </li>
                            <li>
                                <div class="room_item_box"></div>
                            </li>
                            <li>
                                <div class="room_item_box"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>

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
            <li></li>
            <li></li>
            <li></li>

            <!-- 这俩不能丢 -->
            <li></li>
            <li></li>
        </ul>
    </main>
</template>

<script setup>
import { ref } from 'vue';
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