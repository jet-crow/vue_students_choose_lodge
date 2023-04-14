<!-- 宿楼管理 -->
<template>
    <main>
        <section :onClick="() => { showFloorAdd = true }" class="new_building_btn">
            新建 宿舍楼
        </section>


        <el-dialog v-model="showFloorAdd" title="新建宿舍楼" width="30%" :before-close="handleClose" class="floor_add dialog">
            <el-input v-model="input1" placeholder="Please input">
                <template #prepend>楼号</template>
            </el-input>
            <el-input v-model="input1" placeholder="Please input">
                <template #prepend>楼层</template>
            </el-input>
            <el-input v-model="input1" placeholder="Please input">
                <template #prepend>每层房数</template>
            </el-input>
            <el-button type="primary" class="btn_right">确认新增</el-button>
        </el-dialog>

        <el-dialog v-model="showFloorUpdate" title="修改宿舍楼" width="30%" :before-close="handleClose" class="floor_update dialog">

            <el-input v-model="input1" placeholder="Please input">
                <template #prepend>楼号</template>
            </el-input>
            <el-input v-model="input1" placeholder="Please input">
                <template #prepend>楼层</template>
            </el-input>
            <el-input v-model="input1" placeholder="Please input">
                <template #prepend>每层房数</template>
            </el-input>
            <el-button type="primary">删除</el-button>
            <el-button type="primary">修改</el-button>


        </el-dialog>


        <el-dialog v-model="showAllotRoom" title="分配宿舍" width="30%" :before-close="handleClose" class="allot_room dialog">
            <!-- 分配宿舍 -->


        </el-dialog>

        <div class="building_box">
            <ul>
                <li v-for="count in 10">
                    <div class="left">{{ count }}</div>
                    <div class="right">
                        <span :onClick="() => { showFloorUpdate = true }">楼层修改</span>
                        <span :onClick="() => { showAllotRoom = true }">分配宿舍</span>
                    </div>
                </li>
                
            </ul>
        </div>
    </main>
</template>
<script setup>
import { reactive, ref } from 'vue';
const showFloorUpdate = ref(false);
const showAllotRoom = ref(false);
const showFloorAdd = ref(false);


</script>
<style scoped></style>

<style scoped src="../../assets/css/views/admin/buildingManagement.css"></style>