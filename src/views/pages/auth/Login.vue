<template>
  <div class="login">
    <div class="login-form-header">
      {{ $t('auth.login.login') }}
    </div>
    <div class="login-form-body">
      <Form ref="loginForm" :model="loginForm" :rules="loginValidate">
        <FormItem prop="username" :error="serviceError.username">
          <Input prefix="ios-person-outline" size="large" type="text"
                 v-model="loginForm.username" :placeholder="info.username"/>
        </FormItem>
        <FormItem prop="password" :error="serviceError.password">
          <Input prefix="ios-lock-outline" size="large" type="password"
                 v-model="loginForm.password" :placeholder="info.password"/>
        </FormItem>
        <FormItem>
          <Checkbox v-model="loginForm.remember">{{ $t('auth.login.rememberMe') }}</Checkbox>
          <router-link :to="{ name: 'passwordEmail' }">
            {{ $t('auth.login.forgotPassword') }}
          </router-link>
        </FormItem>
        <FormItem>
          <Button long type="primary" @click="handleSubmit('loginForm')" :loading="loginForm.busy">
            <span v-if="!loginForm.busy">{{ $t('auth.login.signIn')}}</span>
            <span v-else>{{ $t('auth.login.submitting') }}</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Form from '@/libs/form'

export default {
  name: 'Login',

  metaInfo () {
    return { title: this.$t('auth.login.loginTitle') }
  },
  data () {
    return {
      loginForm: new Form({
        username: '',
        password: '',
        remember: false
      })
    }
  },
  computed: {
    info () {
      return {
        username: this.$t('auth.login.username'),
        password: this.$t('auth.login.password')
      }
    },
    serviceError () {
      return {
        username: this.loginForm.errors.get('username'),
        password: this.loginForm.errors.get('password')
      }
    },
    loginValidate () {
      return {
        username: [
          { required: true, message: this.$t('auth.login.usernameCannotEmpty'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('auth.passwordCannotEmpty'), trigger: 'blur' },
          {
            type: 'string',
            min: 8,
            message: this.$t('auth.passwordLengthShort'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },
    async login () {
      await this.loginForm.submit(async (data) => {
        return this.$store.dispatch('auth/login', data)
      })
      if (this.loginForm.successful) {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>

<style scoped>

</style>
