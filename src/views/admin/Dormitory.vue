<template>
    <el-page-header @back="$router.back()">
        <template #content>
            <span class="text-large font-600 mr-3"> 分配{{ buildingName }}栋宿舍</span>
        </template>
    </el-page-header>
    <div id='se' @mousedown.stop="handleBox">
        <ul id="ul">
            <li v-for="(item, index) in list" :key="index" @click.stop="handleClick(index)" :class="item.isS ? 'isS' : ''"
                class="li" :style="{ paddingRight: (!item.professional ? '10px' : '0px') }"><span>{{ item.roomName }}</span><span
                    class="professional" v-show="item.professional ? true : false">{{ item.professional }}</span>
            </li>
        </ul>
        <div v-show="isShowSeBox" id="selection"></div>
    </div>

    <footer>
        <span>已选 {{ selected }} 间</span>
        <span>性别 {{ sex }}</span>
        <div class="btn">
            <el-select v-model="professional" class="m-2" placeholder="Select">
                <el-option v-for="item in options" :key="item.professionalId" :label="item.professionalContent"
                    :value="item.professionalContent" />
            </el-select>
            <el-button type="primary" @click="submitUpdateRoom">提交</el-button>
        </div>
    </footer>
</template>
  


<script>
export default {
    data() {
        return {
            list: [
                {
                    name: '列表',
                    id: 1,
                    isS: false,
                },
                {
                    name: '列表',
                    id: 2,
                    isS: false,
                },
                {
                    name: '列表',
                    id: 3,
                    isS: false,
                },
                {
                    name: '列表',
                    id: 4,
                    isS: false,
                },
                {
                    name: '列表',
                    id: 5,
                    isS: false,
                },
                {
                    name: '列表',
                    id: 6,
                    isS: false,
                }, {
                    name: '列表',
                    id: 7,
                    isS: false,
                }, {
                    name: '列表',
                    id: 8,
                    isS: false,
                }, {
                    name: '列表',
                    id: 9,
                    isS: false,
                }, {
                    name: '列表',
                    id: 10,
                    isS: false,
                },
                {
                    name: '列表',
                    id: 11,
                    isS: false,
                },
                {
                    name: '列表',
                    id: 12,
                    isS: false,
                },
            ],
            isshift: false, // 是否按下 shift
            isctrl: false, // 是否按下 ctrl
            isonkeydown: false, // 是否按下键盘
            selectBox: null, // 框选盒子
            isShowSeBox: false, // 框选是否显示div
            selectList: [], // 每次点击，push进去点击的index
            lipL: 0,  // 框选li的父盒子针对于窗口的left
            lipT: 0, // 框选li的父盒子针对于窗口的top
            selected: 0,
            //下拉选择框
            professional: '',
            options: [],
            //框选中的元素
            selectedRoomIdArr: [],
            // 传过来的数据
            sex: '',
            buildingName: ''
        };
    },
    created() {
        //初始化请求接口
        this.$api.get("/professional/addProfessional").then(r => {
            this.options = r.data;
        });
        let buildingId = this.$route.query.buildingId;
        this.buildingName = this.$route.query.buildingName;
        this.sex = this.$route.query.sex;
        this.$api.get("/room/queryAllRoom?buildingId=" + buildingId).then(r => {
            console.log(r.data);
            this.list = r.data.map(i => {
                // i.isS = i.professional == null ? false : true;
                return i;
            });
            //处理！
            console.log(this.list);
        });
    },
    mounted() {
        this.selectBox = document.getElementById("selection");
        this.parentBox = document.getElementById("se");
        setTimeout(this.handleScroll, 500)

    },
    methods: {
        handleBox(even) {
            if (!this.isctrl && !this.isshift && this.selectList.length != 0) {
                this.selectList = [];
                this.loop();
            }
            // 按下时的坐标
            this.downX = even.clientX;
            this.downY = even.clientY;
            this.selectBox.style.left = this.downX + "px";
            this.selectBox.style.top = this.downY + "px";
            document.body.addEventListener('mousemove', this.moveselecttion);
            document.body.addEventListener('mouseup', this.mouseupSelection);
            window.addEventListener("scroll", this.handleScroll);
            window.addEventListener('keydown', this.clickKeydown);
            window.addEventListener('keyup', this.clickKeyup);
        },
        // 页面滚动  滚动时，实时更新父盒子横纵坐标
        handleScroll() {
            //获取li父元素的纵坐标（相对于窗口）
            this.lipT = this.parentBox.getBoundingClientRect().top;
            //获取li父元素的横坐标（相对于窗口）
            this.lipL = this.parentBox.getBoundingClientRect().left;
        },
        // 键盘按下
        clickKeydown(e) {
            switch (e.keyCode) {
                case 16:
                    this.isshift = true;
                    break;
                case 17: // window 键盘
                    this.isctrl = true;
                    break;
                case 91:  // mac command  按键
                    this.isctrl = true;
                    break;
            }
        },
        // 键盘松开
        clickKeyup(e) {
            this.isshift = false;
            this.isctrl = false;
        },
        handleClick(index) {
            // shift 连选
            if (this.isshift) {
                if (this.selectList.indexOf(index) == -1) {
                    this.selectList.push(index);
                }
                if (this.selectList.length > 1) {
                    // 按 shift 连选，通过判断第一次点击index和最后一次index，中间全部选中
                    let le = this.selectList.length;
                    var min = Math.min(this.selectList[0], this.selectList[le - 1]);
                    var max = Math.max(this.selectList[0], this.selectList[le - 1]);
                    this.selectList = [];  // 防止最初始的两次点击，多处的两个index
                    for (let i = min; i <= max; i++) {
                        this.selectList.push(i);
                    }
                }
                this.loop();
            }
            // ctrl 多选 可重复单机取消
            else if (this.isctrl) {
                if (this.selectList.indexOf(index) == -1) {
                    this.selectList.push(index);
                } else {
                    // 此处判断是否存在高亮index，如果存在，再次点击后，则删除此index，达到二次点击取消选区效果
                    this.selectList.splice(this.selectList.indexOf(index), 1);
                }
                this.loop();
            }
            // 单选
            else {
                this.selectList = [];
                this.selectList.push(index);
                this.loop();
            }

        },
        // 鼠标移动事件
        moveselecttion(even) {
            this.isShowSeBox = true;
            this.selectBox.style.left = Math.min(even.clientX, this.downX) + "px";
            this.selectBox.style.top = Math.min(even.clientY, this.downY) + "px";
            this.selectBox.style.width = Math.abs(this.downX - even.clientX) + "px";
            this.selectBox.style.height = Math.abs(this.downY - even.clientY) + "px";
            this.covered();
        },
        // 鼠标松开事件
        mouseupSelection(even) {
            this.isShowSeBox = false;
            this.selectBox.style.width = 0 + "px";
            this.selectBox.style.height = 0 + "px";
            document.body.removeEventListener('mousemove', this.moveselecttion);
            document.body.removeEventListener('mouseup', this.mouseupSelection);

            // console.log('已选：' + this.selected);
        },
        // 是否被覆盖
        covered() {
            let li = document.getElementsByClassName('li');
            if (!this.isctrl && !this.isctrl) {
                this.selectList = [];
            }
            let l = parseInt(this.selectBox.style.left);
            let t = parseInt(this.selectBox.style.top);
            let w = parseInt(this.selectBox.style.width);
            let h = parseInt(this.selectBox.style.height);
            for (let i = 0; i < li.length; i++) {
                if (this.selectList.indexOf(i) == -1) {
                    //  子元素是相对父元素定位的，所以父元素有定位高度，offsetLeft 和 offsetTop不准
                    let sl = li[i].offsetWidth + li[i].offsetLeft + this.lipL;
                    let st = li[i].offsetHeight + li[i].offsetTop + this.lipT;
                    if (sl > l && st > t && li[i].offsetLeft + this.lipL < l + w && li[i].offsetTop + this.lipT < t + h) {
                        this.selectList.push(i);
                    }
                    this.loop();
                }

            }
        },
        // 循环遍历,在这里，可以拿到所选的item
        loop() {
            this.selectedRoomIdArr = [];
            this.selected = 0;
            this.list.forEach((e, index) => {
                e.isS = false;
                this.selectList.filter(item => {
                    if (item == index) {
                        e.isS = true;
                        this.selectedRoomIdArr.push(e.roomId);
                        this.selected++;
                    }
                });
            });
        },
        //点击提交
        submitUpdateRoom() {
            // 获取框选中的roomId
            const selectedRoomIdArrStr = this.selectedRoomIdArr.toString()
            console.log(selectedRoomIdArrStr);

            // 获取专业
            console.log(this.professional);

            if (this.selectedRoomIdArr.length == 0 || this.professional == '') {
                ElMessage({
                    type: 'error',
                    message: '缺少信息'
                });
                return;
            }

            this.$api.put("/room/updateProfessional", this.$qs.stringify({
                'professional': this.professional,
                'roomId': selectedRoomIdArrStr
            })).then(r => {
                console.log(r);
                location.reload();
                ElMessage({
                    type: 'success',
                    message: '修改成功 ' + r.data + ' 间宿舍'
                });
            }).catch(_ => {
                ElMessage({
                    type: 'error',
                    message: '修改失败'
                });
            });


        }

    },

    destroyed() {
        document.body.removeEventListener('mousemove', this.moveselecttion);
        document.body.removeEventListener('mouseup', this.mouseupSelection);
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener('keydown', this.clickKeydown);
        window.removeEventListener('keyup', this.clickKeyup);
    }
};
</script>
<script setup>
import { ref, getCurrentInstance } from 'vue';
import router from "@/router";
const { proxy } = getCurrentInstance();
// 获取过来的buildingId
const buildingId = router.currentRoute.value.query.buildingId;
console.log('buildingId:' + buildingId);


</script>
<style scoped src="@/assets/css/views/admin/dormitory.css"></style>
