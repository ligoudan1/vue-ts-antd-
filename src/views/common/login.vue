<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <span class="title">demo</span>
        </div>
        <div class="desc">demo</div>
      </div>
      <div class="login">
        <a-form :form="form">
          <a-alert
            type="error"
            :closable="true"
            v-show="accountError"
            :message="accountError"
            showIcon
            style="margin-bottom: 24px;"
          />
          <a-form-item>
            <a-input
              size="large"
              placeholder="用户名：admin"
              v-decorator="[
                    'username',
                    { rules: [{ required: true, message: '请输入用户名!' }] }
                  ]"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              placeholder="密码：123456"
              type="password"
              v-decorator="[
                    'password',
                    { rules: [{ required: true, message: '请输入密码!' }] }
                  ]"
              @pressEnter="onSubmit"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              :loading="logging"
              style="width: 100%;margin-top: 24px"
              size="large"
              htmlType="submit"
              type="primary"
              @click="onSubmit"
            >登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Login"
})
export default class Login extends Vue {
  public logging: boolean = false;
  public accountError: string = "";
  public form: any = this.$form.createForm(this);

  onSubmit(e: any) {
    localStorage.setItem("token", "1111");
    this.$router.push("/orbit-prediction/orbit-prediction");
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5;
  background-size: 100%;
  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px) {
      padding: 112px 0 24px;
    }
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
            sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login {
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
