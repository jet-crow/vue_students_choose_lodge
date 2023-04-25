<!-- 宿楼管理 -->
<template>
    <el-page-header @back="goBack">
        <template #content>
            <span class="text-large font-600 mr-3"> 宿楼管理 </span>
        </template>
    </el-page-header>
    <main>
        <section @click="() => { showFloor = true; isAdd = true }" class="new_building_btn">
            新建 宿舍楼
        </section>

        <el-dialog v-model="showFloor" title="修改宿舍楼" width="30%" :before-close="handleClose" class="floor_update dialog">
            <el-input v-model="inputData.buildingName" placeholder="请输入宿舍楼号" v-show="isAdd === true">
                <template #prepend>宿舍楼号</template>
            </el-input>
            <el-input v-model="inputData.buildingFloor" placeholder="请输入宿舍楼层" v-show="isAdd === true">
                <template #prepend>宿舍楼层</template>
            </el-input>
            <el-input v-model="inputData.buildingRoomSum" placeholder="请输入每层房数" v-show="isAdd === true">
                <template #prepend>每层房数</template>
            </el-input>
            <el-radio-group v-model="radio">
                <el-radio-button label="男" />
                <el-radio-button label="女" />
            </el-radio-group>
            <template #footer>
                <el-button type="primary" class="btn_right" v-show="isAdd" @click="newBuilding">确认新增</el-button>
                <el-button type="primary" v-show="isAdd === false">删除</el-button>
                <el-button type="primary" v-show="isAdd === false">修改</el-button>
            </template>
        </el-dialog>



        <div class="building_box">
            <ul>
                <li v-for="count in 10">
                    <div class="sex">男</div>
                    <div class="left">{{ count }}</div>
                    <div class="right">
                        <span @click="jump">分配宿舍</span>
                        <span @click="() => { showFloor = true; isAdd = false; }">楼层修改</span>
                    </div>
                </li>

            </ul>
        </div>
    </main>
</template>
<script setup>
import { showSuccessToast, showFailToast } from 'vant';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const showFloor = ref(false);
const isAdd = ref(false);
const router = useRouter();
const radio = ref("");


const inputData = ref({
    buildingName: '',
    buildingFloor: '',
    buildingRoomSum: '',
});

const newBuilding = () => {
    let data = inputData.value;
    //过滤数据
    if (data.buildingFloor.indexOf('.') != -1 ||
        data.buildingRoomSum.indexOf('.') != -1 ||
        data.buildingRoomSum > 99 ||
        data.buildingRoomSum < 0 ||
        data.buildingFloor < 0 ||
        data.buildingRoomSum == '' ||
        data.buildingFloor == ''||
        data.buildingName == ''){
        return;
    }
    // 男女也得判断！

    console.log('过验证啦');
};



const jump = () => {
    router.push({
        path: '/admin/dormitory',
        query: {
            id: '1'
        }
    });
}

</script>
<style scoped></style>

<style scoped src="../../assets/css/views/admin/buildingManagement.css"></style>