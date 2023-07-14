<!--
 * @Descripttion: 
 * @version: 
 * @Author: Zhou Hao
 * @Date: 2023-07-09 13:47:43
 * @LastEditors: ZhouHao
 * @LastEditTime: 2023-07-14 23:17:23
-->

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-card class="login_form">
          <h1>Vue-Admin</h1>
          <el-form :model="loginForm" :rules="rules" ref="loginForms">
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="loginForm.username"
                clearable
                placeholder="Username"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                :prefix-icon="Lock"
                show-password
                v-model="loginForm.password"
                size="large"
                placeholder="Password"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Ref, coreactivemputed, reactive, ref } from 'vue'
import { User, Lock, Warning } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const rules = {
  username: [
    {
      trigger: 'change',
      // validator: validatorUsername,
    },
  ],
  password: [
    {
      trigger: 'change',
      // validator: validatorPassword,
    },
  ],
  verifyCode: [
    {
      trigger: 'blur',
      // validator: validatorVerifyCode,
    },
  ],
}
// 获取路由器
let $router = useRouter()
const loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
  verifyCode: '1234',
})
const loading = ref<Boolean>(false)
let useStore = useUserStore()

const login = async () => {
  try {
    // 保证登录成功
    loading.value = true
    await useStore.userLogin(loginForm)
    //登录成功，通过编程式导航展示首页
    $router.push('/')
    //登录成功的提示信息
    ElNotification({
      type: 'success',
      message: '登录成功',
    })
    loading.value = false
  } catch (error) {
    //登录失败加载效果消失
    loading.value = false
    // 登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh; // 视口高度
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  position: fixed;

  .login_form {
    position: relative;
    width: 55%;
    top: 25vh;
    left: 10vw;
    padding: 10px;
    background: transparent;

    h1 {
      background: linear-gradient(to right, blue, rgb(35, 60, 70));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
      text-align: center;
      font-weight: 700;
      margin-bottom: 40px;
      margin-top: -10px;
    }

    .login_btn {
      width: 100%;
    }
  }
}

.el-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
