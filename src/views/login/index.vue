<script setup lang="ts">
import { useLayoutStoreHook } from '@/layout/store'
import { useNav } from '@/layout/hook/nav'
import { initRouter } from '@/router'

const { settings } = useNav()
const router = useRouter()
const data = reactive({
    leftTitle: '综合运维服务平台',
    validateImgUrl: '',
    loginForm: {
        username: 'admin',
        pass: 'gzsa000000.',
        validate: '',
        errorTips: '',
    },
    loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        validate: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    },
    isUserLogin: true,
    currer: 0,
})
onMounted(async () => {})

const loginFormRef = ref()
const submitLogin = async () => {
    initRouter().then(() => {
        router.replace(`${useLayoutStoreHook().tagFirst?.path}`)
    })
}
</script>
<template>
    <div
        class="container login"
        :class="{
            'login-red': settings.theme == 'red',
        }"
    >
        <div class="logobox">
            <img src="../../assets/logo/logo.png" />
            <h2 v-cloak>{{ data.leftTitle }}</h2>
        </div>
        <div class="loginBox">
            <div class="loginBox-left">
                <div>
                    <div class="logoboxtext">欢迎登录</div>
                    <el-form :model="data.loginForm" ref="loginFormRef" :rules="data.loginRules" class="demo-ruleForm">
                        <div class="loginBox-input">
                            <i :class="{ username: true, usernameactive: 1 == data.currer }"></i>
                            <el-form-item prop="username">
                                <el-input
                                    v-model="data.loginForm.username"
                                    autofocus
                                    placeholder="用户名"
                                    autocomplete="on"
                                    @focus="data.currer = 1"
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div class="loginBox-input">
                            <i :class="{ password: true, passwordactive: 2 == data.currer }"></i>
                            <el-form-item prop="pass">
                                <el-input
                                    type="password"
                                    v-model="data.loginForm.pass"
                                    placeholder="密码"
                                    autocomplete="on"
                                    @focus="data.currer = 2"
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div class="loginBox-validate clearfloat">
                            <div class="loginBox-input">
                                <i :class="{ validate: true, validateactive: 3 == data.currer }"></i>
                                <el-form-item prop="validate">
                                    <el-input
                                        v-model="data.loginForm.validate"
                                        placeholder="验证码"
                                        @focus="data.currer = 3"
                                        autocomplete="on"
                                    ></el-input>
                                </el-form-item>
                                <div class="loginBox-validate-img">
                                    <img :src="data.validateImgUrl" style="width: 100%; height: 40px" alt="验证码" />
                                </div>
                            </div>
                        </div>

                        <el-button @click="submitLogin" :loading="!data.isUserLogin">登录</el-button>

                        <p class="errorTips">{{ data.loginForm.errorTips }}</p>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.login {
    min-width: 750px;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/themes/blue/lgbgred.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    min-height: 600px;
    overflow: hidden;
    .logobox {
        display: flex;
        position: absolute;
        top: 7%;
        left: 7%;
        img {
            width: 160px;
            display: block;
            margin: 24px auto 5px;
        }
        h2 {
            height: 65px;
            width: 100%;
            line-height: 65px;
            text-align: center;
            padding-top: 10px;
            padding-left: 16px;
            font-size: 36px;
            // font-family: Microsoft YaHei;
            font-weight: bold;
            color: #332d2c;
        }
    }
    .loginBox {
        width: 95%;
        height: 100%;
        margin: 0 auto;
        position: relative;

        .loginBox-left {
            width: 540px;
            height: 600px;
            background-image: url('../../assets/login/contbgred.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            bottom: calc(16.12% - 32px);
            right: 12%;
            .logoboxtext {
                font-size: 36px;
                font-weight: bold;
                color: #332d2c;
                text-align: center;
                margin: 75px 0 70px;
            }
            .loginBox-input {
                width: 360px;
                height: 42px;
                border-bottom: 1px solid var(--el-color-primary);
                margin: 30px auto 0;
                i {
                    width: 24px;
                    height: 24px;
                    display: block;
                    float: left;
                    margin-top: 4px;
                }

                .username {
                    background-image: url(../../assets/login/reduser.png);
                }

                .password {
                    background-image: url(../../assets/login/redpasswrod.png);
                }

                .validate {
                    background-image: url(../../assets/login/redvoid.png);
                }

                .usernameactive {
                    background: url(../../assets/themes/blue/userred.png);
                }

                .passwordactive {
                    background: url(../../assets/themes/blue/voidred.png);
                }

                .validateactive {
                    background: url(../../assets/themes/blue/parssared.png);
                }
                .username,
                .password,
                .validate,
                .usernameactive,
                .passwordactive,
                .validateactive {
                    background-repeat: no-repeat;
                    background-size: 24px 24px;
                }
                .el-form-item {
                    width: 93%;
                    float: right;
                    margin-bottom: 0;
                }
                :deep(.el-input__wrapper) {
                    box-shadow: none;
                }

                :deep(.el-form-item__error) {
                    top: 140%;
                    left: 10px;
                }
            }

            .validate {
                background-image: url(../../assets/login/visvoid.png);
                background-repeat: no-repeat;
                background-size: 24px 24px;
            }

            .loginBox-validate {
                .el-form-item {
                    width: 60%;
                    float: left;
                }
            }
            .loginBox-validate-img {
                float: right;
                width: 100px;
                height: 40px;
                cursor: pointer;
            }

            .el-button {
                width: 350px;
                height: 50px;
                border-radius: 30px;
                margin: 55px auto 20px;
                display: block;
                color: white;
                background-image: url(../../assets/themes/blue/activered.png);
                background-repeat: no-repeat;
                border-color: transparent;
                font-size: 18px;
                &:hover {
                    background-image: url(../../assets/themes/blue/horfred.png);
                }
            }

            .errorTips {
                text-align: center;
                color: red;
            }
        }
    }
}

.login-red {
    background-image: url('../../assets/themes/red/lgbgred.png');

    .loginBox {
        .loginBox-left {
            .loginBox-input {
                .usernameactive {
                    background-image: url(../../assets/themes/red/userred.png);
                }

                .passwordactive {
                    background-image: url(../../assets/themes/red/voidred.png);
                }

                .validateactive {
                    background-image: url(../../assets/themes/red/parssared.png);
                }
            }

            .validate {
                background-image: url(../../assets/login/visvoid.png);
            }

            .el-button {
                background-image: url(../../assets/themes/red/activered.png);

                &:hover {
                    background-image: url(../../assets/themes/red/horfred.png);
                }
            }
        }
    }
}
</style>
