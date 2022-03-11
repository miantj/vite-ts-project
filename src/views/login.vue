<template>
    <img :src="bg" class="wave" />
    <div class="login-container">
        <div class="img">
            <illustration />
        </div>
        <div class="login-box">
            <div class="login-form">
                <avatar class="avatar" />
                <h2
                    :initial="{
                        opacity: 0,
                        y: 100,
                    }"
                    :enter="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 100,
                        },
                    }"
                >
                    Pure Admin
                </h2>
                <div
                    class="input-group user focus"
                    :initial="{
                        opacity: 0,
                        y: 100,
                    }"
                    :enter="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 200,
                        },
                    }"
                >
                    <div class="icon">
                        <!-- <IconifyIconOffline icon="fa-user" width="14" height="14" /> -->
                    </div>
                    <div>
                        <h5>用户名</h5>
                        <input type="text" class="input" v-model="user" @focus="onUserFocus" @blur="onUserBlur" />
                    </div>
                </div>
                <div
                    class="input-group pwd focus"
                    :initial="{
                        opacity: 0,
                        y: 100,
                    }"
                    :enter="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 300,
                        },
                    }"
                >
                    <div class="icon">
                        <!-- <IconifyIconOffline icon="fa-lock" width="14" height="14" /> -->
                    </div>
                    <div>
                        <h5>密码</h5>
                        <el-input
                            v-model="pwd"
                            type="password"
                            class="input"
                            placeholder="Please input password"
                            show-password
                            @focus="onPwdFocus"
                            @blur="onPwdBlur"
                        />
                    </div>
                </div>
                <button
                    class="btn"
                    :initial="{
                        opacity: 0,
                        y: 10,
                    }"
                    :enter="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 400,
                        },
                    }"
                    @click="onLogin"
                >
                    登录
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { initRouter } from '@/router/utils'
import { storageSession } from '@/utils/storage'
// import { addClass, removeClass } from '@/utils/operate'
import bg from '@/assets/login/bg.png'
import avatar from '@/assets/login/avatar.svg'
import illustration from '@/assets/login/illustration.svg'

const router = useRouter()

let user = ref('admin')
let pwd = ref('123456')

const onLogin = (): void => {
    storageSession.setItem('info', {
        username: 'admin',
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.test',
    })
    // initRouter('admin')
    router.push('/')
}

function onUserFocus() {
    // addClass(document.querySelector('.user'), 'focus')
}

function onUserBlur() {
    // if (user.value.length === 0) removeClass(document.querySelector('.user'), 'focus')
}

function onPwdFocus() {
    // addClass(document.querySelector('.pwd'), 'focus')
}

function onPwdBlur() {
    // if (pwd.value.length === 0) removeClass(document.querySelector('.pwd'), 'focus')
}
</script>

<style scoped>
.wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
}

.login-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 18rem;
    padding: 0 2rem;
}

.img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.img img {
    width: 500px;
}

.login-box {
    display: flex;
    align-items: center;
    text-align: center;
}

.login-form {
    width: 360px;
}

.avatar {
    width: 350px;
    height: 80px;
}

.login-form h2 {
    text-transform: uppercase;
    margin: 15px 0;
    color: #999;
    font: bold 200% Consolas, Monaco, monospace;
}

.input-group {
    position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
}

.input-group:nth-child(1) {
    margin-bottom: 4px;
}

.input-group::before,
.input-group::after {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #c5d3f7;
    transition: 0.5s;
}

.input-group::after {
    right: 50%;
}

.input-group::before {
    left: 50%;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon svg {
    color: #d9d9d9;
    transition: 0.5s;
}

.input-group > div {
    position: relative;
    height: 45px;
}

.input-group > div > h5 {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #d9d9d9;
    font-size: 18px;
    transition: 0.3s;
    margin: 0;
    padding: 0;
}

.input-group.focus .icon svg {
    color: #5392f0;
}

.input-group.focus div h5 {
    top: -5px;
    font-size: 15px;
}

.input-group.focus::after,
.input-group.focus::before {
    width: 50%;
}

.input {
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
    font-family: 'Roboto', sans-serif;
}

a {
    display: block;
    text-align: right;
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    transition: 0.3s;
}

a:hover {
    color: #5392f0;
}

.btn {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    margin: 1rem 0;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, #567dbe, #5392f0, #567dbe);
    cursor: pointer;
    color: #fff;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    background-size: 200%;
    transition: 0.5s;
}

.btn:hover {
    background-position: right;
}

.copyright {
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 2px;
    color: #5392f0;
    text-align: center;
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
}

@media screen and (max-width: 1080px) {
    .login-container {
        grid-gap: 9rem;
    }
}

@media screen and (max-width: 1024px) {
    .login-form {
        width: 290px;
    }

    .login-form h2 {
        font-size: 2.4rem;
        margin: 8px 0;
    }

    .img img {
        width: 360px;
    }

    .avatar {
        width: 280px;
        height: 80px;
    }
}

@media screen and (max-width: 768px) {
    .wave {
        display: none;
    }

    .img {
        display: none;
    }

    .login-container {
        grid-template-columns: 1fr;
    }

    .login-box {
        justify-content: center;
    }
}
</style>
