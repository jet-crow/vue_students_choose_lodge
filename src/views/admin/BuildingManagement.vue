<!-- 宿楼管理 -->
<template>
    <el-page-header @back="$router.back()">
        <template #content>
            <span class="text-large font-600 mr-3"> 宿楼管理 </span>
        </template>
    </el-page-header>
    <main>
        <section @click="() => { showFloor = true; isAdd = true }" class="new_building_btn">
            新建 宿舍楼
        </section>

        <el-dialog v-model="showFloor" :title="isAdd ? '新增宿舍楼':'修改宿舍楼'" width="30%" class="floor_update dialog">
            <el-input v-model="inputData.buildingName" placeholder="请输入宿舍楼号" v-show="isAdd">
                <template #prepend>宿舍楼号</template>
            </el-input>
            <el-input v-model="inputData.buildingFloor" placeholder="请输入宿舍楼层" v-show="isAdd">
                <template #prepend>宿舍楼层</template>
            </el-input>
            <el-input v-model="inputData.buildingRoomSum" placeholder="请输入每层房数" v-show="isAdd">
                <template #prepend>每层房数</template>
            </el-input>
            <el-radio-group v-model="radio">
                <el-radio-button label="男" />
                <el-radio-button label="女" />
            </el-radio-group>
            <template #footer>
                <el-button type="primary" v-show="isAdd" @click="newBuilding">确认新增</el-button>
                <div style="display: flex; justify-content: space-between;">
                <el-button type="primary" v-show="!isAdd" @click="deleteBuilding" >删除</el-button>
                <el-button type="primary" v-show="!isAdd" @click="updateBuilding">修改</el-button>
                 </div>
            </template>
        </el-dialog>

        <div class="building_box">
            <ul>
                <li v-for="(item, index) in buildingData">
                    <div class="sex">{{ item.sex }}</div>
                    <div class="left">{{ item.buildingName }}</div>
                    <div class="right">
                        <span @click="jump(item.buildingId,item.buildingName,item.sex)">分配宿舍</span>
                        <span @click="updateDialog(item)">楼栋修删</span>
                    </div>
                </li>

            </ul>
        </div>
    </main>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue';
import router from "@/router";
const { proxy } = getCurrentInstance();

const showFloor = ref(false);
const isAdd = ref(false);
const radio = ref("男");

const selectedBuilding = ref();

const inputData = ref({
    buildingName: '',
    buildingFloor: '',
    buildingRoomSum: '',
});

const buildingData = ref([]);
// 获取网页数据
const getQueryBuildingAll = () => {
    proxy.$api.get('/building/queryBuildingAll').then(res => {
        console.log(res.data);
        buildingData.value = res.data;
        // console.log(seriesData.value);
        buildingData.value.sort(sortBy('buildingName', 0));
    });
};
getQueryBuildingAll();
// 排序方法 field：字段，direction：1从大到小，0从小到大
function sortBy(field, direction) {
    return (x, y) => {
        if (direction == 0) {
            return x[field] - y[field];
        } else {
            return y[field] - x[field];
        }
    };
}

const newBuilding = () => {
    let data = inputData.value;
    //过滤数据
    if (data.buildingFloor.indexOf('.') != -1 ||
        data.buildingRoomSum.indexOf('.') != -1 ||
        data.buildingRoomSum > 99 ||
        data.buildingRoomSum < 0 ||
        data.buildingFloor < 0 ||
        data.buildingRoomSum == '' ||
        data.buildingFloor == '' ||
        data.buildingName == '') {
        ElMessage({
            type: 'error',
            message: '添加失败，格式有误'
        });
        return;
    }
    // 男女也得获取
    let sex = radio.value;

    proxy.$api.post("/building/newBuilding", proxy.$qs.stringify({
        'buildingName': data.buildingName,
        'buildingFloor': data.buildingFloor,
        'buildingRoomSum': data.buildingRoomSum,
        'sex': sex
    })).then(r => {
        getQueryBuildingAll();
        ElMessage({
            type: 'success',
            message: '添加成功: ' + data.buildingName + ' 栋,' + '，一共 ' + r.data + ' 间宿舍'
        });
    }).catch(_ => {
        ElMessage({
            type: 'error',
            message: '添加失败'
        });
    });
    showFloor.value = false;
};

const deleteBuilding = () => {
    proxy.$api.post("/building/deleteBuilding", proxy.$qs.stringify({
        'buildingId': selectedBuilding.value.buildingId
    })).then(r => {
        getQueryBuildingAll();
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
    }).catch(_ => {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    });
    showFloor.value = false;
};

const updateBuilding = () => {
    proxy.$api.put("/building/updateBuildingSex", proxy.$qs.stringify({
        'buildingId': selectedBuilding.value.buildingId,
        'sex':radio.value
    })).then(r => {
        getQueryBuildingAll();
        ElMessage({
            type: 'success',
            message: '修改成功'
        });
    }).catch(_ => {
        ElMessage({
            type: 'error',
            message: '修改失败'
        });
    });
    showFloor.value = false;
};


const updateDialog = (item) => {
    showFloor.value = true; 
    isAdd.value = false; 
    radio.value = item.sex; 
    selectedBuilding.value = item;
};



const jump = (buildingIdValue,buildingNameValue,SexValue) => {

    router.push({
        path: '/admin/dormitory',
        query: {
            buildingId: buildingIdValue,
            buildingName:buildingNameValue,
            sex:SexValue,

        }
    });
};
</script>
<style scoped></style>

<style scoped src="../../assets/css/views/admin/buildingManagement.css"></style>