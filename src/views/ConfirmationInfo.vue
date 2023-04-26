<!-- ConfirmationInfo 确认信息页 -->
<template>
    <div id="Bg">
        <Nav :title="'确认信息'" />
        <main>
            <div class="confirmationInfo_from">
                <div>
                    <span>专业</span>
                    <input type="text" readonly="readonly" :value="userData?.professional">
                </div>
                <div>
                    <span>考生号</span>
                    <input type="text" readonly="readonly" :value="userData?.studentId">
                </div>
                <div>
                    <span>姓名</span>
                    <input type="text" readonly="readonly" :value="userData?.name">
                </div>
                <div>
                    <span>性别</span>
                    <input type="text" readonly="readonly" :value="userData?.sex">
                </div>
                <div>
                    <span>电话</span>
                    <input type="text" readonly="readonly" :value="userData?.tel">
                </div>
                <div class="id_card">
                    <span>身份证</span>
                    <input type="text" readonly="readonly" :value="userData?.idCard">
                </div>
                <div class="submit">
                    <div id="Submit" @click="determine">确认无误</div>
                    <span style="color:#c81623">注: 如信息有误，请联系教务处。</span>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import router from '@/router';
import Nav from '../components/Nav.vue'
import { getCurrentInstance, ref } from "vue"
//是否已经确认信息，若已经确认信息就跳转pickUp
const { proxy } = getCurrentInstance();
const userData = ref()

proxy.$api.get("/userInfo/myUserInfo").then(r => {
    if (r.data.isConfirmUserInfo == 1) {
        router.replace("/pickUp")
    }
    userData.value = r.data;
    console.log(r.data);
})
//确定
const determine = () => {
    proxy.$api.get("/userInfo/confirmUserInfo?userInfoId=" + userData.value.userInfoId).then(r => {
        if (r.data) {
            proxy.$showSuccessToast("确认成功")
            router.push("/pickUp");
        }
    })
}
</script>

<style scoped src="../assets/css/views/confirmationInfo.css"></style>