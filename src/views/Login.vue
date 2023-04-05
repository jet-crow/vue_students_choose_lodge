<template>
    <div class="bg">
        <main>
            <div class="title">
                <span>欢迎使用</span>
                <h1>广职选舍平台</h1>
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
import { ref } from 'vue'

const candidateNumber = ref('');
const idCard = ref('');
const showCNumber = ref(false), showIdCard = ref(false);

//验证
function checkStudentInfo() {
    candidateNumber.value == '' ? showCNumber.value = true : showCNumber.value = false;
    idCard.value == '' ? showIdCard.value = true : showIdCard.value = false;
    return !(showCNumber.value || showIdCard.value);
}

function login() {
    console.log(checkStudentInfo());
}

</script>


<style scoped src="../assets/css/views/login.css">
</style>