<template>
    <div class="bg">
        <main>
            <div class="title">
                <span>欢迎使用</span>
                <h1>东软选舍平台</h1>
            </div>

            <div class="login_from">
                <div class="username">
                    <input id="Username" type="text" @blur="checkStudentInfo" v-model.number="candidateNumber"
                        placeholder="学生考生号">
                    <span v-show="showCNumber">请输入学生考生号</span>
                </div>
                <div class="password">
                    <input id="Password" type="password" @blur="checkStudentInfo" v-model="idCard" placeholder="学生身份证">
                    <span v-show="showIdCard">请输入学生身份证</span>
                </div>
                <div class="submit">
                    <div id="Submit" @click="login">登录</div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const candidateNumber = ref('');
const idCard = ref('');
const showCNumber = ref(false), showIdCard = ref(false);

//验证
function checkStudentInfo() {
    candidateNumber.value == '' ? showCNumber.value = true : showCNumber.value = false;
    idCard.value == '' ? showIdCard.value = true : showIdCard.value = false;
    return (showCNumber.value || showIdCard.value);
}

function login() {
    if (checkStudentInfo()) return;
    proxy.$api.post("/account/login", proxy.$qs.stringify({
        user: candidateNumber.value,
        password: idCard.value
    })).then(r => {
        if (r.data.status == 500 || r.data.data.level != 0) {
            proxy.$showFailToast("登录失败");
            return;
        }
        proxy.$showSuccessToast("登录成功");
        localStorage.setItem("token", r.data.data.token);
        // console.log(r.data.data.token);
        proxy.$api.get('/userInfo/myUserInfo').then(res => {
            localStorage.setItem("uid", res.data.uid);
            localStorage.setItem("name", res.data.name);
        });
        router.push("/confirmationInfo");

    });


}
</script>


<style scoped src="../assets/css/views/login.css"></style>