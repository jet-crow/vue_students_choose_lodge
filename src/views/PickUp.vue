<template>
    <Nav :title="'Pick up'" />
    <main>
        <p class="title_msg">选择符合自己的标签</p>
        <div class="label_box">
            <div class="label_items" v-for="item in labelData" :key="item.tagId">
                <div class="title"> {{ item.title }}</div>
                <div class="label_tag">
                    <span v-for="(tag, index) in item.tagContexts" :key="tag.tagId" @click="choose(tag)"
                        :class="{ 'tag_choose': tag.iSs }">
                        {{ tag.tagContext }}
                    </span>
                </div>
            </div>
        </div>
        <p class="title_msg">个签（留言、介绍）</p>
        <div class="personal_msg">
            <textarea v-model="personalMsg" @input="checkMsgNumbe"></textarea>
            <span>{{ msgCount }}/30</span>
        </div>
        <div class="submit">
            <div id="Submit" @click="submitTag">确认无误</div>
        </div>
    </main>
</template>
<script setup>
import router from '@/router';
import Nav from '../components/Nav.vue'
import { ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance();
const labelData = ref([])
//字数限制
const personalMsg = ref("")
const msgCount = ref(0)

//监听字数限制
function checkMsgNumbe() {
    personalMsg.value = personalMsg.value.substring(0, 30);
    msgCount.value = (personalMsg.value).length
}
//如果沒有修改機會直接跳轉hall頁面
proxy.$api.get("/userInfo/checkUserTag").then(r => {
    if (r.data) {
        router.replace("/hall");
    }
})
//请求
proxy.$api.get("/tag/tagAll").then(r => {
    // console.log(r.data);
    labelData.value = r.data.reduce((acc, cur) => {
        const index = acc.findIndex(item => item.title === cur.tagTitle);
        if (index >= 0) {
            acc[index].tagContexts.push({
                tagContext: cur.tagContext,
                tagId: cur.tagId,
                iSs: false
            });
        } else {
            acc.push({
                title: cur.tagTitle,
                tagContexts: [{
                    tagContext: cur.tagContext,
                    tagId: cur.tagId,
                    iSs: false
                }]
            });
        }
        return acc;
    }, []);
    console.log(labelData.value);
})
//选择
const tagChooseData = [];
const choose = (tag) => {
    tag.iSs = !tag.iSs;
    if (tag.iSs == true) {
        tagChooseData.push(tag.tagId)
    } else {
        tagChooseData.splice(tagChooseData.indexOf(tag.tagId), 1)
    }
    // console.log(tag);
    // console.log(tagChooseData);
}
//提交
const submitTag = () => {
    if(tagChooseData.length == 0){
        ElMessage({
            message: '请选择标签',
            type: 'error',
        });
        return
    }
    if (msgCount.value != 0) {
        //修改个签
        proxy.$api.put("/userInfo/updateIntroduce", proxy.$qs.stringify({
            introduce: personalMsg.value
        }))
    }else{
        ElMessage({
            message: '个性签名不能为空',
            type: 'error',
        });
        return
    }
    
    proxy.$api.get("/userSelectedTag/isUpdateSelectedTags").then(r => {
        if (r.data) {//修改,    //如果选择过就调用修改接口
            proxy.$api.post("/userSelectedTag/updateTag", proxy.$qs.stringify({
                tagIds: tagChooseData.toString()
            })).then(r => {
                proxy.$showSuccessToast("修改成功")
                router.push("/hall")
            })
            return
        }
        //新增
        proxy.$api.post("/userSelectedTag/addTag", proxy.$qs.stringify({
            tagIds: tagChooseData.toString()
        })).then(r => {
            proxy.$showSuccessToast("添加成功")
            router.push("/hall")
        })
    })

}
</script>

<style scoped src="../assets/css/views/pickUp.css"></style>